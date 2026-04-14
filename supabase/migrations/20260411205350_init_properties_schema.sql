-- Crear tabla de propiedades
create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  price decimal not null,
  description text,
  address text,
  lat decimal,
  lng decimal,
  beds int,
  baths int,
  sqft int,
  amenities jsonb default '[]',
  image_urls text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS
alter table properties enable row level security;

-- Política de lectura pública
create policy "Public properties are viewable by everyone" on properties for select using (true);
