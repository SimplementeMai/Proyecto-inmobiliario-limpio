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
        Relationships: [
          {
            foreignKeyName: "properties_id_agente_fkey"
            columns: ["id_agente"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id_agente"]
          }
        ]
      }
      agentes: {
        Row: { id_agente: number; nombre: string; telefono: string | null }
        Insert: { id_agente?: number; nombre: string; telefono?: string | null }
        Update: { id_agente?: number; nombre?: string; telefono?: string | null }
        Relationships: []
      }
      clientes: {
        Row: { id_cliente: number; nombre: string; email: string; user_id: string | null }
        Insert: { id_cliente?: number; nombre: string; email: string; user_id?: string | null }
        Update: { id_cliente?: number; nombre?: string; email?: string; user_id?: string | null }
        Relationships: []
      }
      estados: {
        Row: { id_estado: number; descripcion: string }
        Insert: { id_estado?: number; descripcion: string }
        Update: { id_estado?: number; descripcion?: string }
        Relationships: []
      }
      transacciones: {
        Row: { id_transaccion: number; id_propiedad: string | null; id_cliente: number | null; id_estado: number | null; fecha: string }
        Insert: { id_transaccion?: number; id_propiedad?: string | null; id_cliente?: number | null; id_estado?: number | null; fecha?: string }
        Update: { id_transaccion?: number; id_propiedad?: string | null; id_cliente?: number | null; id_estado?: number | null; fecha?: string }
        Relationships: [
          {
            foreignKeyName: "Transacciones_id_propiedad_fkey"
            columns: ["id_propiedad"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Transacciones_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id_cliente"]
          },
          {
            foreignKeyName: "Transacciones_id_estado_fkey"
            columns: ["id_estado"]
            isOneToOne: false
            referencedRelation: "estados"
            referencedColumns: ["id_estado"]
          }
        ]
      }
      favoritos: {
        Row: { id_user: string; id_propiedad: string; created_at: string }
        Insert: { id_user: string; id_propiedad: string; created_at?: string }
        Update: { id_user?: string; id_propiedad?: string; created_at?: string }
        Relationships: [
          {
            foreignKeyName: "Favoritos_id_propiedad_fkey"
            columns: ["id_propiedad"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
  }
}
