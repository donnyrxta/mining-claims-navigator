export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      claim_attachments: {
        Row: {
          claim_id: string
          created_at: string | null
          file_name: string
          file_type: string
          file_url: string
          id: string
          user_id: string
        }
        Insert: {
          claim_id: string
          created_at?: string | null
          file_name: string
          file_type: string
          file_url: string
          id?: string
          user_id: string
        }
        Update: {
          claim_id?: string
          created_at?: string | null
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      claim_minerals: {
        Row: {
          claim_id: string
          created_at: string
          grade: string | null
          id: string
          mineral: Database["public"]["Enums"]["mineral_type"]
          notes: string | null
        }
        Insert: {
          claim_id: string
          created_at?: string
          grade?: string | null
          id?: string
          mineral: Database["public"]["Enums"]["mineral_type"]
          notes?: string | null
        }
        Update: {
          claim_id?: string
          created_at?: string
          grade?: string | null
          id?: string
          mineral?: Database["public"]["Enums"]["mineral_type"]
          notes?: string | null
        }
        Relationships: []
      }
      claims: {
        Row: {
          accessibility: string | null
          asking_price: string | null
          contact_preference: Database["public"]["Enums"]["contact_preference"]
          created_at: string
          description: string | null
          environmental_info: string | null
          estimated_value: string
          id: string
          investment_highlights: string | null
          is_favorite: boolean | null
          legal_details: string | null
          notes: string | null
          opportunity_type: Database["public"]["Enums"]["opportunity_type"]
          partnership_details: string | null
          potential: Database["public"]["Enums"]["potential_level"]
          region: string
          resource_estimate: string | null
          seller_name: string
          seller_phone: string
          status: Database["public"]["Enums"]["claim_status"]
          type: Database["public"]["Enums"]["claim_type"]
          user_id: string
        }
        Insert: {
          accessibility?: string | null
          asking_price?: string | null
          contact_preference?: Database["public"]["Enums"]["contact_preference"]
          created_at?: string
          description?: string | null
          environmental_info?: string | null
          estimated_value: string
          id: string
          investment_highlights?: string | null
          is_favorite?: boolean | null
          legal_details?: string | null
          notes?: string | null
          opportunity_type?: Database["public"]["Enums"]["opportunity_type"]
          partnership_details?: string | null
          potential: Database["public"]["Enums"]["potential_level"]
          region: string
          resource_estimate?: string | null
          seller_name: string
          seller_phone: string
          status?: Database["public"]["Enums"]["claim_status"]
          type: Database["public"]["Enums"]["claim_type"]
          user_id: string
        }
        Update: {
          accessibility?: string | null
          asking_price?: string | null
          contact_preference?: Database["public"]["Enums"]["contact_preference"]
          created_at?: string
          description?: string | null
          environmental_info?: string | null
          estimated_value?: string
          id?: string
          investment_highlights?: string | null
          is_favorite?: boolean | null
          legal_details?: string | null
          notes?: string | null
          opportunity_type?: Database["public"]["Enums"]["opportunity_type"]
          partnership_details?: string | null
          potential?: Database["public"]["Enums"]["potential_level"]
          region?: string
          resource_estimate?: string | null
          seller_name?: string
          seller_phone?: string
          status?: Database["public"]["Enums"]["claim_status"]
          type?: Database["public"]["Enums"]["claim_type"]
          user_id?: string
        }
        Relationships: []
      }
      secondary_minerals: {
        Row: {
          claim_id: string
          created_at: string
          grade: string | null
          id: string
          mineral: Database["public"]["Enums"]["mineral_type"]
          notes: string | null
        }
        Insert: {
          claim_id: string
          created_at?: string
          grade?: string | null
          id?: string
          mineral: Database["public"]["Enums"]["mineral_type"]
          notes?: string | null
        }
        Update: {
          claim_id?: string
          created_at?: string
          grade?: string | null
          id?: string
          mineral?: Database["public"]["Enums"]["mineral_type"]
          notes?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      claim_status: "available" | "under_negotiation" | "sold"
      claim_type: "gold" | "chrome"
      contact_preference: "phone" | "email" | "in_person"
      mineral_type:
        | "gold"
        | "chrome"
        | "platinum"
        | "diamond"
        | "copper"
        | "nickel"
        | "lithium"
        | "coal"
        | "iron_ore"
        | "tantalite"
        | "emerald"
        | "other"
      opportunity_type: "for_sale" | "seeking_joint_venture" | "not_available"
      potential_level: "high" | "medium" | "low"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
