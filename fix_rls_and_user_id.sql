-- 1. Agregar user_id a properties si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='properties' AND column_name='user_id') THEN
        ALTER TABLE public.properties ADD COLUMN user_id uuid REFERENCES auth.users(id);
    END IF;
END $$;

-- 2. Agregar user_id a clientes si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='clientes' AND column_name='user_id') THEN
        ALTER TABLE public.Clientes ADD COLUMN user_id uuid REFERENCES auth.users(id);
    END IF;
END $$;

-- 3. RLS Policies para Clientes - INSERT para usuarios autenticados
DROP POLICY IF EXISTS "Clientes pueden insertar su propio registro" ON public.Clientes;
CREATE POLICY "Clientes pueden insertar su propio registro" ON public.Clientes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Clientes pueden actualizar su propio registro" ON public.Clientes;
CREATE POLICY "Clientes pueden actualizar su propio registro" ON public.Clientes
  FOR UPDATE USING (auth.uid() = user_id);

-- 4. RLS Policies para Properties - INSERT/UPDATE para propietarios
DROP POLICY IF EXISTS "Propietarios pueden insertar propiedades" ON public.properties;
CREATE POLICY "Propietarios pueden insertar propiedades" ON public.properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Propietarios pueden actualizar sus propiedades" ON public.properties;
CREATE POLICY "Propietarios pueden actualizar sus propiedades" ON public.properties
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Propietarios pueden eliminar sus propiedades" ON public.properties;
CREATE POLICY "Propietarios pueden eliminar sus propiedades" ON public.properties
  FOR DELETE USING (auth.uid() = user_id);

-- 5. RLS Policies para Transacciones - INSERT para usuarios autenticados
DROP POLICY IF EXISTS "Usuarios autenticados pueden insertar transacciones" ON public.Transacciones;
CREATE POLICY "Usuarios autenticados pueden insertar transacciones" ON public.Transacciones
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Usuarios pueden ver transacciones de sus propiedades" ON public.Transacciones;
CREATE POLICY "Usuarios pueden ver transacciones de sus propiedades" ON public.Transacciones
  FOR SELECT USING (
    id_cliente IN (SELECT id_cliente FROM public.Clientes WHERE user_id = auth.uid())
    OR id_propiedad IN (SELECT id FROM public.properties WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Propietarios pueden actualizar transacciones de sus propiedades" ON public.Transacciones;
CREATE POLICY "Propietarios pueden actualizar transacciones de sus propiedades" ON public.Transacciones
  FOR UPDATE USING (
    id_propiedad IN (SELECT id FROM public.properties WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Propietarios pueden eliminar transacciones de sus propiedades" ON public.Transacciones;
CREATE POLICY "Propietarios pueden eliminar transacciones de sus propiedades" ON public.Transacciones
  FOR DELETE USING (
    id_propiedad IN (SELECT id FROM public.properties WHERE user_id = auth.uid())
  );

-- 6. ELIMINAR trigger si existe (causa "Database error creating new user")
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
