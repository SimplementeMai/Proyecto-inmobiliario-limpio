-- 1. Crear tablas de soporte
CREATE TABLE IF NOT EXISTS public.agentes (
    id_agente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    telefono TEXT
);

CREATE TABLE IF NOT EXISTS public.clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.estados (
    id_estado SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL
);

-- 2. Modificar 'properties'
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='properties' AND column_name='id_agente') THEN
        ALTER TABLE public.properties ADD COLUMN id_agente INT REFERENCES public.agentes(id_agente);
    END IF;
END $$;

-- 3. Crear 'transacciones'
DROP TABLE IF EXISTS public.transacciones;

CREATE TABLE public.transacciones (
    id_transaccion SERIAL PRIMARY KEY,
    id_propiedad UUID REFERENCES public.properties(id),
    id_cliente INT REFERENCES public.clientes(id_cliente),
    id_estado INT REFERENCES public.estados(id_estado),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
