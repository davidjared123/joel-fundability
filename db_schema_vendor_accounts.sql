-- Nueva tabla para guardar las cuentas de vendors del usuario
-- Ejecutar este script en Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.user_vendor_accounts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    vendor_name character varying NOT NULL,
    bureaus text[] DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(user_id, vendor_name)
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.user_vendor_accounts ENABLE ROW LEVEL SECURITY;

-- Política para que cada usuario solo pueda ver/modificar sus propios vendors
CREATE POLICY "Allow individual access" ON public.user_vendor_accounts 
    FOR ALL USING (auth.uid() = user_id);

-- Comentarios descriptivos
COMMENT ON TABLE public.user_vendor_accounts IS 'Almacena las cuentas de vendors que tiene cada usuario para calcular la distribución de burós';
COMMENT ON COLUMN public.user_vendor_accounts.vendor_name IS 'Nombre del vendor (ej: Murphy USA, Grainger)';
COMMENT ON COLUMN public.user_vendor_accounts.bureaus IS 'Array de burós a los que reporta este vendor (Experian, Equifax, D&B)';
