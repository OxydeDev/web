import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type CommissionSubmission = {
  id: string
  discord_user: string
  email: string
  commission_type: string
  animation_type?: string
  description: string
  deadline?: string
  custom_size?: string
  reference_file_name?: string
  status: string
  created_at: string
}

export type ContactSubmission = {
  id: string
  discord_user: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}