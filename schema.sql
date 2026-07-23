-- Tablas Base
create table if not exists Agentes (
    id_agente serial primary key,
    nombre text not null,
    telefono text
);

create table if not exists Clientes (
    id_cliente serial primary key,
    nombre text not null,
    email text unique not null,
    user_id uuid references auth.users(id) -- Corregido a UUID
);

create table if not exists Estados (
    id_estado serial primary key,
    descripcion text not null
);

-- Tabla Properties
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
  created_at timestamp with time zone default timezone('utc'::text, now()),
  id_agente int references Agentes(id_agente)
);

-- Tabla Transacciones
create table if not exists Transacciones (
    id_transaccion serial primary key,
    id_propiedad uuid references properties(id),
    id_cliente int references Clientes(id_cliente),
    id_estado int references Estados(id_estado),
    fecha timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS
alter table properties enable row level security;
alter table Agentes enable row level security;
alter table Clientes enable row level security;
alter table Estados enable row level security;
alter table Transacciones enable row level security;

-- Políticas RLS

-- Properties: públicas
drop policy if exists "Public properties are viewable by everyone" on properties;
create policy "Public properties are viewable by everyone" on properties for select using (true);

-- Clientes: acceso propio
drop policy if exists "Clientes pueden ver su propio registro" on Clientes;
create policy "Clientes pueden ver su propio registro" on Clientes
  for select using (auth.uid() = user_id);

-- Transacciones: acceso propio
drop policy if exists "Transacciones visibles para el cliente dueño" on Transacciones;
create policy "Transacciones visibles para el cliente dueño" on Transacciones
  for select using (
    id_cliente in (select id_cliente from Clientes where user_id = auth.uid())
  );

-- Agentes: públicos (por ahora)
drop policy if exists "Agentes son públicos" on Agentes;
create policy "Agentes son públicos" on Agentes for select using (true);

-- Estados: públicos
drop policy if exists "Estados son públicos" on Estados;
create policy "Estados son públicos" on Estados for select using (true);
