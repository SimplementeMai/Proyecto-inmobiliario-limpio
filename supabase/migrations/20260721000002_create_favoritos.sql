CREATE TABLE IF NOT EXISTS public.favoritos (
    id_user UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    id_propiedad UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_propiedad)
);

ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favoritos"
    ON public.favoritos FOR SELECT
    USING (auth.uid() = id_user);

CREATE POLICY "Users can insert their own favoritos"
    ON public.favoritos FOR INSERT
    WITH CHECK (auth.uid() = id_user);

CREATE POLICY "Users can delete their own favoritos"
    ON public.favoritos FOR DELETE
    USING (auth.uid() = id_user);
