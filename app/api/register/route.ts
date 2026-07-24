import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password, fullName } = body

  if (!email || !password || !fullName) {
    return NextResponse.json({ error: 'Faltan campos obligatorios', received: body }, { status: 400 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Variables de entorno faltantes', hasUrl: !!url, hasKey: !!key }, { status: 500 })
  }

  const supabase = createClient(url, key)

  // Intentar crear el usuario
  const createResult = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  })

  let user = createResult.data?.user
  const createError = createResult.error

  // Si el usuario ya existe, confirmarlo y actualizar contraseña
  if (createError) {
    const msg = createError.message

    if (msg.includes('already') || msg.includes('exists')) {
      const { data: list } = await supabase.auth.admin.listUsers()
      const existing = list?.users?.find((u: { email?: string }) => u.email === email)

      if (existing) {
        const { data: updated, error: updateErr } = await supabase.auth.admin.updateUserById(
          existing.id,
          {
            email_confirm: true,
            password: password,
            user_metadata: { full_name: fullName },
          }
        )
        if (updateErr) {
          return NextResponse.json({ error: 'Update failed: ' + updateErr.message }, { status: 400 })
        }
        user = updated.user
      } else {
        return NextResponse.json({ error: 'User exists but not found: ' + msg }, { status: 400 })
      }
    } else {
      return NextResponse.json({ error: 'Create failed: ' + msg }, { status: 400 })
    }
  }

  // Asegurar registro en clientes
  if (user?.id) {
    const { data: existing } = await supabase
      .from('clientes')
      .select('id_cliente')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!existing) {
      const { error: insertErr } = await supabase.from('clientes').insert({
        nombre: fullName,
        email: email,
        user_id: user.id,
        password: '',
      })
      if (insertErr) {
        console.error('Error inserting cliente:', insertErr.message)
      }
    }
  }

  return NextResponse.json({ user })
}
