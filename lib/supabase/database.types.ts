export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          slug: string
          price: number
          description: string | null
          address: string | null
          lat: number | null
          lng: number | null
          beds: number | null
          baths: number | null
          sqft: number | null
          amenities: Json
          image_urls: string[] | null
          created_at: string
          id_agente: number | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          price: number
          description?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          amenities?: Json
          image_urls?: string[] | null
          created_at?: string
          id_agente?: number | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          price?: number
          description?: string | null
          address?: string | null
          lat?: number | null
          lng?: number | null
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          amenities?: Json
          image_urls?: string[] | null
          created_at?: string
          id_agente?: number | null
        }
      }
      Agentes: {
        Row: { id_agente: number; nombre: string; telefono: string | null }
        Insert: { id_agente?: number; nombre: string; telefono?: string | null }
        Update: { id_agente?: number; nombre?: string; telefono?: string | null }
      }
      Clientes: {
        Row: { id_cliente: number; nombre: string; email: string; user_id: string | null }
        Insert: { id_cliente?: number; nombre: string; email: string; user_id?: string | null }
        Update: { id_cliente?: number; nombre?: string; email?: string; user_id?: string | null }
      }
      Estados: {
        Row: { id_estado: number; descripcion: string }
        Insert: { id_estado?: number; descripcion: string }
        Update: { id_estado?: number; descripcion?: string }
      }
      Transacciones: {
        Row: { id_transaccion: number; id_propiedad: string | null; id_cliente: number | null; id_estado: number | null; fecha: string }
        Insert: { id_transaccion?: number; id_propiedad?: string | null; id_cliente?: number | null; id_estado?: number | null; fecha?: string }
        Update: { id_transaccion?: number; id_propiedad?: string | null; id_cliente?: number | null; id_estado?: number | null; fecha?: string }
      }
    }
  }
}
