// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

// Crear contexto
const AuthContext = createContext(null);

// Hook para usar contexto fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carga/actualiza el perfil sin bloquear la UI (no modifica "loading")
  const fetchProfile = async (id) => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code === 'PGRST116') {
        const { data: created, error: insertError } = await supabase
          .from('profiles')
          .insert({ id, created_at: new Date().toISOString() })
          .select()
          .single();
        if (insertError) {
          console.error(insertError);
        } else {
          setProfile(created);
          return;
        }
      }

      if (data) setProfile(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Inicializar sesión y suscribirse a cambios
  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) console.error(sessionError);

        const currentUser = session?.user ?? null;
        if (mounted) setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log('[Auth] event:', _event);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          // Refresca perfil en segundo plano; no bloquea UI ni toca "loading"
          fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Funciones de auth
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    return { error };
  };

  const updateProfile = async (updates) => {
    try {
      const id = updates?.id ?? user?.id ?? null;
      if (!id) return { data: null, error: new Error('No authenticated user') };

      const payload = { ...updates, id, updated_at: new Date().toISOString() };
      const { data, error } = await supabase
        .from('profiles')
        .upsert(payload)
        .select()
        .single();

      if (!error) setProfile(data);
      return { data, error };
    } catch (error) {
      console.error(error);
      return { data: null, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {loading ? (
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
          Cargando...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
