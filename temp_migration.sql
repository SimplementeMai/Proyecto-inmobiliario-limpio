-- 1. Crear tablas de soporte
CREATE TABLE IF NOT EXISTS public.Agentes (
    id_agente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    telefono TEXT
);

CREATE TABLE IF NOT EXISTS public.Clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.Estados (
    id_estado SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL
);

-- 2. Modificar 'properties'
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='properties' AND column_name='id_agente') THEN
        ALTER TABLE public.properties ADD COLUMN id_agente INT REFERENCES public.Agentes(id_agente);
    END IF;
END $$;

-- 3. Crear 'Transacciones'
DROP TABLE IF EXISTS public.Transacciones;

CREATE TABLE public.Transacciones (
    id_transaccion SERIAL PRIMARY KEY,
    id_propiedad UUID REFERENCES public.properties(id),
    id_cliente INT REFERENCES public.Clientes(id_cliente),
    id_estado INT REFERENCES public.Estados(id_estado),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
