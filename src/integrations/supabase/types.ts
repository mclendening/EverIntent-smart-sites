export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      allowed_admin_emails: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      checkout_submissions: {
        Row: {
          addons: Json | null
          affiliate_id: string | null
          business_name: string | null
          company: string | null
          consent_timestamp: string | null
          created_at: string
          domain_name: string | null
          email: string
          first_name: string | null
          ghl_contact_id: string | null
          ghl_error: string | null
          ghl_sync_status: string | null
          ghl_synced_at: string | null
          has_domain: boolean | null
          id: string
          ip_address: string | null
          last_name: string | null
          message: string | null
          monthly_total: number | null
          name: string
          phone: string | null
          selected_tier: string | null
          service_interest: string | null
          setup_total: number | null
          source_page: string | null
          status: string | null
          tcpa_consent: boolean | null
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          addons?: Json | null
          affiliate_id?: string | null
          business_name?: string | null
          company?: string | null
          consent_timestamp?: string | null
          created_at?: string
          domain_name?: string | null
          email: string
          first_name?: string | null
          ghl_contact_id?: string | null
          ghl_error?: string | null
          ghl_sync_status?: string | null
          ghl_synced_at?: string | null
          has_domain?: boolean | null
          id?: string
          ip_address?: string | null
          last_name?: string | null
          message?: string | null
          monthly_total?: number | null
          name: string
          phone?: string | null
          selected_tier?: string | null
          service_interest?: string | null
          setup_total?: number | null
          source_page?: string | null
          status?: string | null
          tcpa_consent?: boolean | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          addons?: Json | null
          affiliate_id?: string | null
          business_name?: string | null
          company?: string | null
          consent_timestamp?: string | null
          created_at?: string
          domain_name?: string | null
          email?: string
          first_name?: string | null
          ghl_contact_id?: string | null
          ghl_error?: string | null
          ghl_sync_status?: string | null
          ghl_synced_at?: string | null
          has_domain?: boolean | null
          id?: string
          ip_address?: string | null
          last_name?: string | null
          message?: string | null
          monthly_total?: number | null
          name?: string
          phone?: string | null
          selected_tier?: string | null
          service_interest?: string | null
          setup_total?: number | null
          source_page?: string | null
          status?: string | null
          tcpa_consent?: boolean | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          affiliate_id: string | null
          company: string | null
          consent_timestamp: string | null
          created_at: string
          email: string
          form_type: string
          ghl_contact_id: string | null
          ghl_error: string | null
          ghl_sync_status: string | null
          ghl_synced_at: string | null
          id: string
          ip_address: string | null
          message: string | null
          name: string
          phone: string | null
          source_page: string | null
          tcpa_consent: boolean
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          affiliate_id?: string | null
          company?: string | null
          consent_timestamp?: string | null
          created_at?: string
          email: string
          form_type: string
          ghl_contact_id?: string | null
          ghl_error?: string | null
          ghl_sync_status?: string | null
          ghl_synced_at?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          name: string
          phone?: string | null
          source_page?: string | null
          tcpa_consent?: boolean
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          affiliate_id?: string | null
          company?: string | null
          consent_timestamp?: string | null
          created_at?: string
          email?: string
          form_type?: string
          ghl_contact_id?: string | null
          ghl_error?: string | null
          ghl_sync_status?: string | null
          ghl_synced_at?: string | null
          id?: string
          ip_address?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          source_page?: string | null
          tcpa_consent?: boolean
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          affiliate_id: string | null
          consent_timestamp: string | null
          cover_letter: string | null
          created_at: string
          email: string
          ghl_contact_id: string | null
          ghl_error: string | null
          ghl_sync_status: string | null
          ghl_synced_at: string | null
          id: string
          ip_address: string | null
          job_id: string | null
          linkedin_url: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          resume_url: string | null
          source_page: string | null
          status: string | null
          tcpa_consent: boolean
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          video_intro_url: string | null
        }
        Insert: {
          affiliate_id?: string | null
          consent_timestamp?: string | null
          cover_letter?: string | null
          created_at?: string
          email: string
          ghl_contact_id?: string | null
          ghl_error?: string | null
          ghl_sync_status?: string | null
          ghl_synced_at?: string | null
          id?: string
          ip_address?: string | null
          job_id?: string | null
          linkedin_url?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          source_page?: string | null
          status?: string | null
          tcpa_consent?: boolean
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          video_intro_url?: string | null
        }
        Update: {
          affiliate_id?: string | null
          consent_timestamp?: string | null
          cover_letter?: string | null
          created_at?: string
          email?: string
          ghl_contact_id?: string | null
          ghl_error?: string | null
          ghl_sync_status?: string | null
          ghl_synced_at?: string | null
          id?: string
          ip_address?: string | null
          job_id?: string | null
          linkedin_url?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          resume_url?: string | null
          source_page?: string | null
          status?: string | null
          tcpa_consent?: boolean
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          video_intro_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          benefits: string | null
          created_at: string
          department: string | null
          description: string | null
          display_order: number | null
          employment_type: string | null
          id: string
          is_published: boolean | null
          location: string | null
          requirements: string | null
          salary_range: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          display_order?: number | null
          employment_type?: string | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string | null
          created_at?: string
          department?: string | null
          description?: string | null
          display_order?: number | null
          employment_type?: string | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          requirements?: string | null
          salary_range?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      logo_versions: {
        Row: {
          changelog_notes: string | null
          created_at: string
          ever_config: Json
          id: string
          intent_config: Json
          is_active: boolean | null
          name: string
          streak_config: Json
          tagline_config: Json
          tagline_text: string | null
          updated_at: string
          version: number
        }
        Insert: {
          changelog_notes?: string | null
          created_at?: string
          ever_config?: Json
          id?: string
          intent_config?: Json
          is_active?: boolean | null
          name: string
          streak_config?: Json
          tagline_config?: Json
          tagline_text?: string | null
          updated_at?: string
          version?: number
        }
        Update: {
          changelog_notes?: string | null
          created_at?: string
          ever_config?: Json
          id?: string
          intent_config?: Json
          is_active?: boolean | null
          name?: string
          streak_config?: Json
          tagline_config?: Json
          tagline_text?: string | null
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      page_theme_assignments: {
        Row: {
          created_at: string
          id: string
          page_route: string
          theme_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          page_route: string
          theme_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          page_route?: string
          theme_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_theme_assignments_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "site_themes"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio: {
        Row: {
          client_name: string | null
          created_at: string
          description: string | null
          display_order: number | null
          featured_image_url: string | null
          gallery_urls: string[] | null
          id: string
          industry: string | null
          is_featured: boolean | null
          is_published: boolean | null
          results_summary: string | null
          services_provided: string[] | null
          slug: string
          testimonial_quote: string | null
          title: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          client_name?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          featured_image_url?: string | null
          gallery_urls?: string[] | null
          id?: string
          industry?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          results_summary?: string | null
          services_provided?: string[] | null
          slug: string
          testimonial_quote?: string | null
          title: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          client_name?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          featured_image_url?: string | null
          gallery_urls?: string[] | null
          id?: string
          industry?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          results_summary?: string | null
          services_provided?: string[] | null
          slug?: string
          testimonial_quote?: string | null
          title?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      published_theme_configs: {
        Row: {
          config_css: string | null
          config_json: Json
          config_typescript: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          notes: string | null
          source_theme_id: string | null
          source_theme_name: string
          version: number
        }
        Insert: {
          config_css?: string | null
          config_json: Json
          config_typescript: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          notes?: string | null
          source_theme_id?: string | null
          source_theme_name: string
          version?: number
        }
        Update: {
          config_css?: string | null
          config_json?: Json
          config_typescript?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          notes?: string | null
          source_theme_id?: string | null
          source_theme_name?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "published_theme_configs_source_theme_id_fkey"
            columns: ["source_theme_id"]
            isOneToOne: false
            referencedRelation: "site_themes"
            referencedColumns: ["id"]
          },
        ]
      }
      site_themes: {
        Row: {
          accent_config: Json
          accent_locked_to_base: boolean | null
          base_hue: number
          changelog_notes: string | null
          created_at: string
          dark_mode_overrides: Json | null
          ghl_chat_config: Json
          gradient_configs: Json
          id: string
          is_active: boolean | null
          logo_version_id: string | null
          name: string
          static_colors: Json
          updated_at: string
          version: number
        }
        Insert: {
          accent_config?: Json
          accent_locked_to_base?: boolean | null
          base_hue?: number
          changelog_notes?: string | null
          created_at?: string
          dark_mode_overrides?: Json | null
          ghl_chat_config?: Json
          gradient_configs?: Json
          id?: string
          is_active?: boolean | null
          logo_version_id?: string | null
          name: string
          static_colors?: Json
          updated_at?: string
          version?: number
        }
        Update: {
          accent_config?: Json
          accent_locked_to_base?: boolean | null
          base_hue?: number
          changelog_notes?: string | null
          created_at?: string
          dark_mode_overrides?: Json | null
          ghl_chat_config?: Json
          gradient_configs?: Json
          id?: string
          is_active?: boolean | null
          logo_version_id?: string | null
          name?: string
          static_colors?: Json
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "site_themes_logo_version_id_fkey"
            columns: ["logo_version_id"]
            isOneToOne: false
            referencedRelation: "logo_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          client_company: string | null
          client_name: string
          client_photo_url: string | null
          client_title: string | null
          created_at: string
          display_order: number | null
          id: string
          industry: string | null
          is_featured: boolean | null
          is_published: boolean | null
          quote: string
          rating: number | null
          service_type: string | null
          updated_at: string
        }
        Insert: {
          client_company?: string | null
          client_name: string
          client_photo_url?: string | null
          client_title?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          industry?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          quote: string
          rating?: number | null
          service_type?: string | null
          updated_at?: string
        }
        Update: {
          client_company?: string | null
          client_name?: string
          client_photo_url?: string | null
          client_title?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          industry?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          quote?: string
          rating?: number | null
          service_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_next_theme_config_version: { Args: never; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
