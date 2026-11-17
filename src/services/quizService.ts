import { QUIZ_QUESTIONS, type QuizQuestion } from '@/data/forestData'
import type {
  NewQuizSubmission,
  QuizQuestionRow,
  QuizSubmissionRow,
} from '@/types/supabase'
import { isSupabaseConfigured, supabase } from '@/utils/supabase'

function mapRowToQuestion(row: QuizQuestionRow): QuizQuestion {
  const options = Array.isArray(row.options)
    ? row.options.filter((item): item is string => typeof item === 'string')
    : []

  return {
    id: row.id,
    scenario: row.scenario,
    question: row.question,
    options,
    correctIndex: row.correct_index,
    explanation: row.explanation,
  }
}

export async function fetchQuizQuestions(): Promise<QuizQuestion[]> {
  if (!isSupabaseConfigured) {
    return QUIZ_QUESTIONS
  }

  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  if (!data || data.length === 0) {
    return QUIZ_QUESTIONS
  }

  return data.map(mapRowToQuestion)
}

export async function fetchQuizSubmissions(
  limit = 6,
): Promise<QuizSubmissionRow[]> {
  if (!isSupabaseConfigured) {
    return []
  }

  const { data, error } = await supabase
    .from('quiz_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function submitQuizScore(
  input: NewQuizSubmission,
): Promise<QuizSubmissionRow> {
  if (!isSupabaseConfigured) {
    throw new Error('Konfigurasi Supabase belum tersedia di file .env.')
  }

  const { data, error } = await supabase
    .from('quiz_submissions')
    .insert(input)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
