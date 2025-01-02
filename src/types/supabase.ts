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
      claims: {
        Row: {
          id: string
          created_at: string
          region: string
          type: 'gold' | 'chrome'
          seller_name: string
          seller_phone: string
          potential: 'high' | 'medium' | 'low'
          estimated_value: string
          description: string | null
          status: 'available' | 'under_negotiation' | 'sold'
          resource_estimate: string | null
          legal_details: string | null
          accessibility: string | null
          environmental_info: string | null
          investment_highlights: string | null
          contact_preference: 'phone' | 'email' | 'in_person'
          notes: string | null
          opportunity_type: 'for_sale' | 'seeking_joint_venture' | 'not_available'
          partnership_details: string | null
          asking_price: string | null
          is_favorite: boolean
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          region: string
          type: 'gold' | 'chrome'
          seller_name: string
          seller_phone: string
          potential: 'high' | 'medium' | 'low'
          estimated_value: string
          description?: string | null
          status: 'available' | 'under_negotiation' | 'sold'
          resource_estimate?: string | null
          legal_details?: string | null
          accessibility?: string | null
          environmental_info?: string | null
          investment_highlights?: string | null
          contact_preference: 'phone' | 'email' | 'in_person'
          notes?: string | null
          opportunity_type: 'for_sale' | 'seeking_joint_venture' | 'not_available'
          partnership_details?: string | null
          asking_price?: string | null
          is_favorite?: boolean
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          region?: string
          type?: 'gold' | 'chrome'
          seller_name?: string
          seller_phone?: string
          potential?: 'high' | 'medium' | 'low'
          estimated_value?: string
          description?: string | null
          status?: 'available' | 'under_negotiation' | 'sold'
          resource_estimate?: string | null
          legal_details?: string | null
          accessibility?: string | null
          environmental_info?: string | null
          investment_highlights?: string | null
          contact_preference?: 'phone' | 'email' | 'in_person'
          notes?: string | null
          opportunity_type?: 'for_sale' | 'seeking_joint_venture' | 'not_available'
          partnership_details?: string | null
          asking_price?: string | null
          is_favorite?: boolean
          user_id?: string
        }
      }
      claim_attachments: {
        Row: {
          id: string
          created_at: string
          claim_id: string
          file_name: string
          file_type: string
          file_url: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          claim_id: string
          file_name: string
          file_type: string
          file_url: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          claim_id?: string
          file_name?: string
          file_type?: string
          file_url?: string
          user_id?: string
        }
      }
    }
  }
}