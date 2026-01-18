import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

/**
 * Hook para manejar las cuentas de vendors del usuario
 * Guarda y carga de Supabase qué vendors tiene el usuario
 */
export function useUserVendors() {
    const [userVendors, setUserVendors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar vendors del usuario al montar
    useEffect(() => {
        loadUserVendors();
    }, []);

    const loadUserVendors = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }

            const { data, error: fetchError } = await supabase
                .from('user_vendor_accounts')
                .select('*')
                .eq('user_id', user.id);

            if (fetchError) throw fetchError;

            // Convertir array a objeto { vendorName: true }
            const vendorsMap = {};
            data?.forEach(item => {
                vendorsMap[item.vendor_name] = true;
            });

            setUserVendors(vendorsMap);
        } catch (err) {
            console.error('Error loading user vendors:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleVendor = useCallback(async (vendorName, bureaus) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('User not authenticated');
            }

            const isCurrentlySelected = userVendors[vendorName];

            if (isCurrentlySelected) {
                // Eliminar vendor
                const { error: deleteError } = await supabase
                    .from('user_vendor_accounts')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('vendor_name', vendorName);

                if (deleteError) throw deleteError;

                setUserVendors(prev => {
                    const updated = { ...prev };
                    delete updated[vendorName];
                    return updated;
                });
            } else {
                // Agregar vendor
                const { error: insertError } = await supabase
                    .from('user_vendor_accounts')
                    .insert({
                        user_id: user.id,
                        vendor_name: vendorName,
                        bureaus: bureaus
                    });

                if (insertError) throw insertError;

                setUserVendors(prev => ({
                    ...prev,
                    [vendorName]: true
                }));
            }
        } catch (err) {
            console.error('Error toggling vendor:', err);
            setError(err.message);
        }
    }, [userVendors]);

    // Calcular conteo de burós basado en vendors seleccionados
    const getBureauCounts = useCallback((allVendors) => {
        const counts = {
            Experian: 0,
            Equifax: 0,
            'D&B': 0,
        };

        allVendors.forEach(vendor => {
            if (userVendors[vendor.name]) {
                vendor.bureaus?.forEach(bureau => {
                    if (counts[bureau] !== undefined) {
                        counts[bureau]++;
                    }
                });
            }
        });

        return counts;
    }, [userVendors]);

    return {
        userVendors,
        loading,
        error,
        toggleVendor,
        getBureauCounts,
        reload: loadUserVendors
    };
}

export default useUserVendors;
