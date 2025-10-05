import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 1️⃣ Obtener sesión al inicio
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      if (mounted) setUser(currentUser);

      if (currentUser) {
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();

          if (error) throw error;
          if (mounted) setProfile(profileData);
          // console.log('👤 Perfil cargado correctamente (init):', profileData);
        } catch (err) {
          // console.error('❌ Error cargando perfil en init:', err);
          if (mounted) setProfile(null);
        }
      }

      if (mounted) {
        setLoading(false);
        setInitialized(true);
      }
    };

    init();

    // 2️⃣ Escuchar cambios posteriores solo si ya inicializamos
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!initialized) return; // Evita loop en el refresh

        // console.log('🌀 Evento de auth detectado:', event, session);

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          setLoading(true);
          try {
            const { data: profileData, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentUser.id)
              .single();

            if (error) throw error;
            // console.log('👤 Perfil cargado correctamente (onAuthStateChange):', profileData);
            setProfile(profileData);
          } catch (err) {
            // console.error('❌ Error cargando perfil:', err);
            setProfile(null);
          } finally {
            setLoading(false);
          }
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [initialized]);

  // Métodos públicos
  const signIn = async (email, password) => supabase.auth.signInWithPassword({ email, password });
  const signUp = async (email, password) =>
    supabase.auth.signUp({ email, password, options: { emailRedirectTo: 'https://joel-fundability-yl1t.vercel.app/login' } });
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
  };
  const updateProfile = async (updates) => {
    if (!user) throw new Error('No user authenticated');
    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) throw error;
    const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    setProfile(profileData);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
