-- 1. Permitir que cualquier usuario autenticado cree su propio registro en clientes
DROP POLICY IF EXISTS "Users can insert their own clientes" ON public.clientes;
CREATE POLICY "Users can insert their own clientes"
    ON public.clientes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 2. Permitir que los administradores lean todos los clientes y actualizar policy existente
DROP POLICY IF EXISTS "Users can read their own clientes" ON public.clientes;
CREATE POLICY "Users can read their own clientes or admins"
    ON public.clientes FOR SELECT
    USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');
