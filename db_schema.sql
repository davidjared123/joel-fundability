-- Tabla para Foundation
CREATE TABLE public.foundation (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name character varying,
    entity_type character varying,
    formation_date date,
    ein_number character varying,
    address_line1 character varying,
    city character varying,
    state character varying,
    zip character varying,
    website character varying,
    email character varying,
    license_type character varying,
    license_number character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Tabla para Financials
CREATE TABLE public.financials (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    time_in_business character varying,
    bank_name character varying,
    bank_statements_info text,
    average_bank_balance numeric,
    filed_last_year_tax boolean,
    can_supply_financial_statements boolean,
    has_collateral boolean,
    personal_tax_up_to_date boolean,
    has_revenue boolean,
    w2_employees integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Tabla para Business Credit
CREATE TABLE public.business_credit (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    dnb_report jsonb,
    experian_data jsonb,
    equifax_report jsonb,
    paydex_score integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Tabla para Personal Credit
CREATE TABLE public.personal_credit (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    credit_score integer,
    has_negative_records boolean,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Tabla para Application Process (Progreso)
CREATE TABLE public.application_process_progress (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    step_name character varying,
    completed boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    UNIQUE(user_id, step_name)
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.foundation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_credit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_credit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_process_progress ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Allow individual access" ON public.foundation FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow individual access" ON public.financials FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow individual access" ON public.business_credit FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow individual access" ON public.personal_credit FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow individual access" ON public.application_process_progress FOR ALL USING (auth.uid() = user_id);