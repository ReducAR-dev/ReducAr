import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://vntwtefpoqaladomyrhs.supabase.co',
    'sb_publishable_5wEdSmZ-H_i2B7CwiW40dQ_wY2FIBrU'
)

export async function subir_foto_perfil(file) {
    const { data: { user } } = await supabase.auth.getUser()
    const ruta = `${user.id}/avatar.webp`
    const { error: errSubida } = await supabase.storage
        .from('avatars')
        .upload(ruta, file, { upsert: true, contentType: file.type, cacheControl: '3600' })
    if (errSubida) throw errSubida
    const { data } = supabase.storage.from('avatars').getPublicUrl(ruta)
    const url = `${data.publicUrl}?t=${Date.now()}` // evita ver la foto vieja por cache
    const { error } = await supabase
        .from('usuario')
        .update({ foto_perfil: url, fecha_actualizacion: new Date().toISOString() })
        .eq('id', user.id)
    if (error) throw error
}

export async function subir_icono_categoria(categoria_id, file) {
    const ruta = `${categoria_id}/icono.png`
    const { error } = await supabase.storage
        .from('categorias')
        .upload(ruta, file, { upsert: true, contentType: file.type })
    if (error) throw error
    const { data } = supabase.storage.from('categorias').getPublicUrl(ruta)
    const { error: errUpdate } = await supabase.from('categoria')
        .update({ icono_url: `${data.publicUrl}?t=${Date.now()}` })
        .eq('id', categoria_id)
    if (errUpdate) throw errUpdate
}

export async function subir_etiqueta_promocion(promocion_id, file) {
    const ruta = `${promocion_id}/etiqueta.png`
    const { error } = await supabase.storage
        .from('promociones')
        .upload(ruta, file, { upsert: true, contentType: file.type })
    if (error) throw error
    const { data } = supabase.storage.from('promociones').getPublicUrl(ruta)
    const { error: errUpdate } = await supabase.from('promocion')
        .update({ etiqueta_url: `${data.publicUrl}?t=${Date.now()}` })
        .eq('id', promocion_id)
    if (errUpdate) throw errUpdate
}

export async function subir_portada_curso(curso_id, file) {
    const ruta = `${curso_id}/portada.jpg`
    const { error } = await supabase.storage
        .from('cursos')
        .upload(ruta, file, { upsert: true, contentType: file.type })
    if (error) throw error
    const { data } = supabase.storage.from('cursos').getPublicUrl(ruta)
    const { error: errUpdate } = await supabase.from('curso')
        .update({ imagen_url: `${data.publicUrl}?t=${Date.now()}` })
        .eq('id', curso_id)
    if (errUpdate) throw errUpdate
}