-- 1. Modificar Clientes para enlazar con auth.users
ALTER TABLE public.Clientes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 2. Crear función de trigger
-- Esta función se ejecutará automáticamente tras el registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.Clientes (nombre, email, user_id)
  VALUES (
    COALESCE(new.raw_user_meta_data->>'full_name', 'Usuario Nuevo'), 
    new.email,
    new.id
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Crear el trigger en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
