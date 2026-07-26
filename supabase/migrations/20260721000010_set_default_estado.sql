-- Configurar 'Disponible' como estado predeterminado para nuevas propiedades
DO $$
DECLARE
    disponible_id INT := (SELECT id_estado FROM public.estados WHERE descripcion = 'Disponible' LIMIT 1);
BEGIN
    IF disponible_id IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.properties ALTER COLUMN id_estado SET DEFAULT ' || disponible_id;
    ELSE
        RAISE EXCEPTION 'No se encontró el estado "Disponible". Asegúrate de que existe.';
    END IF;
END $$;
