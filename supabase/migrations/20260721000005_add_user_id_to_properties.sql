-- Agregar user_id a properties para ownership
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='properties' AND column_name='user_id') THEN
        ALTER TABLE public.properties ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
END $$;
