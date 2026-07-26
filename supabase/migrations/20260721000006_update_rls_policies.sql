-- Restricción de RLS para clientes y transacciones
-- Admin bypass habilitado mediante JWT role = 'admin'

-- 1. Clientes: Solo el usuario dueño puede leer/editar su propio registro
DROP POLICY IF EXISTS "Users can read their own clientes" ON public.clientes;
CREATE POLICY "Users can read their own clientes" ON public.clientes
    FOR SELECT USING (auth.uid() = user_id OR (auth.jwt() ->> 'role' = 'admin'));

-- 2. Transacciones: Solo el cliente dueño o el dueño de la propiedad
DROP POLICY IF EXISTS "Users can read their own transacciones" ON public.transacciones;
CREATE POLICY "Users can read their own transacciones" ON public.transacciones
    FOR SELECT USING (
        id_cliente IN (SELECT id_cliente FROM public.clientes WHERE user_id = auth.uid())
        OR id_propiedad IN (SELECT id FROM public.properties WHERE user_id = auth.uid())
        OR (auth.jwt() ->> 'role' = 'admin')
    );
