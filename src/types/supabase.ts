export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.18'
  }
  public: {
    Tables: {
      quiz_questions: {
        Row: {
          correct_index: number
          created_at: string
          explanation: string
          id: string
          options: Json
          question: string
          scenario: string
          sort_order: number
        }
        Insert: {
          correct_index: number
          created_at?: string
          explanation: string
          id: string
          options: Json
          question: string
          scenario: string
          sort_order?: number
        }
        Update: {
          correct_index?: number
          created_at?: string
          explanation?: string
          id?: string
          options?: Json
          question?: string
          scenario?: string
          sort_order?: number
        }
        Relationships: []
      }
      quiz_submissions: {
        Row: {
          answers: Json
          created_at: string
          id: string
          institution: string | null
          participant_name: string
          score: number
          total_questions: number
        }
        Insert: {
          answers?: Json
          created_at?: string
          id?: string
          institution?: string | null
          participant_name: string
          score: number
          total_questions: number
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          institution?: string | null
          participant_name?: string
          score?: number
          total_questions?: number
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type QuizQuestionRow =
  Database['public']['Tables']['quiz_questions']['Row']
export type QuizSubmissionRow =
  Database['public']['Tables']['quiz_submissions']['Row']
export type NewQuizSubmission =
  Database['public']['Tables']['quiz_submissions']['Insert']
