-- 1. Asegurar que existe el estado 'Disponible'
INSERT INTO public.estados (descripcion)
VALUES ('Disponible')
ON CONFLICT (descripcion) DO NOTHING;

-- 2. Variables para facilitar la actualización (asumiendo IDs)
DO $$
DECLARE
    disponible_id INT := (SELECT id_estado FROM public.estados WHERE descripcion = 'Disponible' LIMIT 1);
BEGIN
    -- Actualizar propiedades que eran 'disponible para venta'
    UPDATE public.properties
    SET tipo = 'venta', id_estado = disponible_id
    WHERE id_estado IN (SELECT id_estado FROM public.estados WHERE descripcion = 'disponible para venta');

    -- Actualizar propiedades que eran 'disponible para renta'
    UPDATE public.properties
    SET tipo = 'renta', id_estado = disponible_id
    WHERE id_estado IN (SELECT id_estado FROM public.estados WHERE descripcion = 'disponible para renta');
END $$;
