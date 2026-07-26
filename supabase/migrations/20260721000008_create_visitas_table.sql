-- Crear tabla de visitas
CREATE TABLE public.visitas (
    id_visita SERIAL PRIMARY KEY,
    id_propiedad UUID REFERENCES public.properties(id),
    id_cliente INT REFERENCES public.clientes(id_cliente),
    fecha_hora TIMESTAMP NOT NULL,
    estado TEXT DEFAULT 'solicitada', -- 'solicitada', 'confirmada', 'realizada', 'cancelada'
    notas_agente TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RLS para la tabla visitas
ALTER TABLE public.visitas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own visitas"
    ON public.visitas FOR SELECT
    USING (
        id_cliente IN (SELECT id_cliente FROM public.clientes WHERE user_id = auth.uid())
        OR (auth.jwt() ->> 'role' = 'admin')
    );

CREATE POLICY "Authenticated users can insert visitas"
    ON public.visitas FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update visitas"
    ON public.visitas FOR UPDATE
    USING (auth.jwt() ->> 'role' = 'admin');
