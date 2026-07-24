-- =============================================
-- Seed script: estados, agentes y asignación
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- 1. Estados (si no existen)
INSERT INTO public.estados (descripcion)
VALUES ('Pendiente'), ('Activo'), ('Vendido')
ON CONFLICT DO NOTHING;

-- 2. Agentes de ejemplo
INSERT INTO public.agentes (nombre, telefono)
VALUES
  ('Carlos Mendoza', '+52 55 1234 5678'),
  ('Ana García', '+52 55 2345 6789'),
  ('Roberto Sánchez', '+52 55 3456 7890')
ON CONFLICT DO NOTHING;

-- 3. Asignar agente a todas las propiedades (el primero creado)
-- Solo propiedades que aún no tienen agente
UPDATE public.properties
SET id_agente = (SELECT id_agente FROM public.agentes ORDER BY id_agente LIMIT 1)
WHERE id_agente IS NULL;
