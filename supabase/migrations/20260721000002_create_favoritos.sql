CREATE TABLE IF NOT EXISTS Favoritos (
    id_user UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    id_propiedad UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_propiedad)
);

ALTER TABLE Favoritos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites"
    ON Favoritos FOR SELECT
    USING (auth.uid() = id_user);

CREATE POLICY "Users can insert their own favorites"
    ON Favoritos FOR INSERT
    WITH CHECK (auth.uid() = id_user);

CREATE POLICY "Users can delete their own favorites"
    ON Favoritos FOR DELETE
    USING (auth.uid() = id_user);
