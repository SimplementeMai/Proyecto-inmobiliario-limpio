-- 1. Crear tablas de soporte (si no existen)
CREATE TABLE IF NOT EXISTS Agentes (
    id_agente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    telefono TEXT
);

CREATE TABLE IF NOT EXISTS Clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Estados (
    id_estado SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL
);

-- 2. Modificar 'properties' (si es necesario)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='properties' AND column_name='id_agente') THEN
        ALTER TABLE properties ADD COLUMN id_agente INT REFERENCES Agentes(id_agente);
    END IF;
END $$;

-- 3. Crear 'Transacciones' con el tipo correcto (UUID)
-- Primero eliminamos la tabla si se creó mal con el tipo integer
DROP TABLE IF EXISTS Transacciones;

CREATE TABLE Transacciones (
    id_transaccion SERIAL PRIMARY KEY,
    id_propiedad UUID REFERENCES properties(id), -- Aquí está el cambio: UUID en vez de INT
    id_cliente INT REFERENCES Clientes(id_cliente),
    id_estado INT REFERENCES Estados(id_estado),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);