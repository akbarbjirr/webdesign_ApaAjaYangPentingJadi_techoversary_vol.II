import {
  isQuizDifficulty,
  type QuizDifficulty,
  type QuizQuestion,
  type QuizReviewItem,
} from '@/types/quiz'
import type { Json, QuizSubmissionRow } from '@/types/supabase'
import { isSupabaseConfigured, supabase } from '@/utils/supabase'

export interface SubmitAndGradeResult {
  submission: QuizSubmissionRow
  review: QuizReviewItem[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseSubmissionRow(raw: unknown): QuizSubmissionRow {
  if (!isRecord(raw) || typeof raw.id !== 'string') {
    throw new Error('Format hasil skor server tidak valid.')
  }

  return {
    id: raw.id,
    participant_name: String(raw.participant_name ?? ''),
    institution: typeof raw.institution === 'string' ? raw.institution : null,
    difficulty: String(raw.difficulty ?? 'mudah'),
    score: Number(raw.score ?? 0),
    total_points: Number(raw.total_points ?? 0),
    total_questions: Number(raw.total_questions ?? 0),
    answers: (raw.answers as Json) ?? {},
    created_at: String(raw.created_at ?? ''),
  }
}

function parseReviewItems(raw: unknown): QuizReviewItem[] {
  if (!Array.isArray(raw)) return []

  return raw.filter(isRecord).map((item) => ({
    id: String(item.id ?? ''),
    question: String(item.question ?? ''),
    chosenIndex: Number(item.chosen_index ?? -1),
    correctIndex: Number(item.correct_index ?? 0),
    isCorrect: Boolean(item.is_correct),
    points: Number(item.points ?? 10),
    earnedPoints: Number(item.earned_points ?? 0),
    optionFeedback: String(item.option_feedback ?? ''),
    explanation: String(item.explanation ?? ''),
  }))
}

export async function fetchQuizQuestions(
  difficulty?: QuizDifficulty,
): Promise<QuizQuestion[]> {
  if (!isSupabaseConfigured) {
    throw new Error('Konfigurasi Supabase belum tersedia di file .env.')
  }

  const { data, error } = await supabase.rpc('get_quiz_questions', {
    p_difficulty: difficulty,
  })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    difficulty: isQuizDifficulty(row.difficulty) ? row.difficulty : 'mudah',
    materi: row.materi || 'Hutan',
    scenario: row.scenario,
    question: row.question,
    options: Array.isArray(row.options)
      ? row.options.filter((item): item is string => typeof item === 'string')
      : [],
    points: row.points > 0 ? row.points : 10,
    image: row.image_url ?? undefined,
    imageAlt: row.image_url ? row.scenario : undefined,
  }))
}

export async function fetchQuizSubmissions(
  limit = 500,
): Promise<QuizSubmissionRow[]> {
  if (!isSupabaseConfigured) {
    throw new Error('Konfigurasi Supabase belum tersedia di file .env.')
  }

  const { data, error } = await supabase
    .from('quiz_submissions')
    .select('*')
    .order('total_points', { ascending: false })
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(limit)

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function submitAndGradeQuiz(input: {
  participantName: string
  institution?: string
  difficulty: QuizDifficulty
  answers: Record<string, number>
}): Promise<SubmitAndGradeResult> {
  if (!isSupabaseConfigured) {
    throw new Error('Konfigurasi Supabase belum tersedia di file .env.')
  }

  const { data, error } = await supabase.rpc('submit_and_grade_quiz', {
    p_participant_name: input.participantName,
    p_institution: input.institution ?? '',
    p_difficulty: input.difficulty,
    p_answers: input.answers,
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!isRecord(data)) {
    throw new Error('Respons penilaian kuis dari server tidak valid.')
  }

  return {
    submission: parseSubmissionRow(data.submission),
    review: parseReviewItems(data.review),
  }
}
