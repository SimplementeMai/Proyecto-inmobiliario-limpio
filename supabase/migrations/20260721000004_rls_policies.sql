-- =============================================
-- RLS Policies: Todas las tablas en minúsculas
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read properties"
    ON public.properties FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can insert properties"
    ON public.properties FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update properties"
    ON public.properties FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete properties"
    ON public.properties FOR DELETE
    USING (auth.role() = 'authenticated');

-- agentes
ALTER TABLE public.agentes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read agentes"
    ON public.agentes FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can insert agentes"
    ON public.agentes FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update agentes"
    ON public.agentes FOR UPDATE
    USING (auth.role() = 'authenticated');

-- clientes
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own clientes"
    ON public.clientes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own clientes"
    ON public.clientes FOR UPDATE
    USING (auth.uid() = user_id);

-- estados
ALTER TABLE public.estados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read estados"
    ON public.estados FOR SELECT
    USING (true);

-- transacciones
ALTER TABLE public.transacciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own transacciones"
    ON public.transacciones FOR SELECT
    USING (
        id_cliente IN (
            SELECT id_cliente FROM public.clientes WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Authenticated users can insert transacciones"
    ON public.transacciones FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- favoritos
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favoritos"
    ON public.favoritos FOR SELECT
    USING (auth.uid() = id_user);

CREATE POLICY "Users can insert their own favoritos"
    ON public.favoritos FOR INSERT
    WITH CHECK (auth.uid() = id_user);

CREATE POLICY "Users can delete their own favoritos"
    ON public.favoritos FOR DELETE
    USING (auth.uid() = id_user);
