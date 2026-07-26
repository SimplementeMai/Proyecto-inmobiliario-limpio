-- Agregar columna avatar_url a la tabla clientes
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS avatar_url TEXT;
