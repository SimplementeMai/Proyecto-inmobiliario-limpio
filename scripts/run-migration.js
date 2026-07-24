const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.jvrnxubbohqtpqjlopkk:018001205000%23SM@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false, servername: 'db.jvrnxubbohqtpqjlopkk.supabase.co' }
});

async function run() {
  await client.connect();
  console.log('Connected!');

  const statements = [
    'ALTER TABLE public."Clientes" ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id)',
    'ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id)',
    'DROP POLICY IF EXISTS "Clientes pueden insertar su propio registro" ON public."Clientes"',
    'CREATE POLICY "Clientes pueden insertar su propio registro" ON public."Clientes" FOR INSERT WITH CHECK (auth.uid() = user_id)',
    'DROP POLICY IF EXISTS "Clientes pueden actualizar su propio registro" ON public."Clientes"',
    'CREATE POLICY "Clientes pueden actualizar su propio registro" ON public."Clientes" FOR UPDATE USING (auth.uid() = user_id)',
    'DROP POLICY IF EXISTS "Propietarios pueden insertar propiedades" ON public.properties',
    'CREATE POLICY "Propietarios pueden insertar propiedades" ON public.properties FOR INSERT WITH CHECK (auth.uid() = user_id)',
    'DROP POLICY IF EXISTS "Propietarios pueden actualizar sus propiedades" ON public.properties',
    'CREATE POLICY "Propietarios pueden actualizar sus propiedades" ON public.properties FOR UPDATE USING (auth.uid() = user_id)',
    'DROP POLICY IF EXISTS "Propietarios pueden eliminar sus propiedades" ON public.properties',
    'CREATE POLICY "Propietarios pueden eliminar sus propiedades" ON public.properties FOR DELETE USING (auth.uid() = user_id)',
    'DROP POLICY IF EXISTS "Usuarios autenticados pueden insertar transacciones" ON public."Transacciones"',
    'CREATE POLICY "Usuarios autenticados pueden insertar transacciones" ON public."Transacciones" FOR INSERT WITH CHECK (true)',
    'DROP POLICY IF EXISTS "Usuarios pueden ver transacciones de sus propiedades" ON public."Transacciones"',
    'CREATE POLICY "Usuarios pueden ver transacciones de sus propiedades" ON public."Transacciones" FOR SELECT USING (id_cliente IN (SELECT id_cliente FROM public."Clientes" WHERE user_id = auth.uid()) OR id_propiedad IN (SELECT id FROM public.properties WHERE user_id = auth.uid()))',
    'DROP POLICY IF EXISTS "Propietarios pueden actualizar transacciones" ON public."Transacciones"',
    'CREATE POLICY "Propietarios pueden actualizar transacciones" ON public."Transacciones" FOR UPDATE USING (id_propiedad IN (SELECT id FROM public.properties WHERE user_id = auth.uid()))',
    'DROP POLICY IF EXISTS "Propietarios pueden eliminar transacciones" ON public."Transacciones"',
    'CREATE POLICY "Propietarios pueden eliminar transacciones" ON public."Transacciones" FOR DELETE USING (id_propiedad IN (SELECT id FROM public.properties WHERE user_id = auth.uid()))',
    'DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users',
    'DROP FUNCTION IF EXISTS public.handle_new_user()',
  ];

  for (const sql of statements) {
    try {
      await client.query(sql);
      console.log('OK:', sql.substring(0, 70));
    } catch (e) {
      console.log('ERR:', sql.substring(0, 70), '->', e.message);
    }
  }

  console.log('Done!');
  await client.end();
}

run().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
