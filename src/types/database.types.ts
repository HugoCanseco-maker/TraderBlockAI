// Generated type-safe Supabase schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      predictions: {
        Row: {
          id: number
          symbol: string
          forecast: Json
          sentiment: number
          risk_mode: string
          created_at: string
          user_id: string | null
        }
        Insert: {
          symbol: string
          forecast: Json
          sentiment: number
          risk_mode: string
          user_id?: string | null
        }
        Update: {
          forecast?: Json
          sentiment?: number
          risk_mode?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
        }
        Update: {
          email?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
