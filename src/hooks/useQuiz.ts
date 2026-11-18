import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchQuizQuestions,
  fetchQuizSubmissions,
  submitAndGradeQuiz,
} from '@/services/quizService'
import type { QuizDifficulty, QuizQuestion, QuizReviewItem } from '@/types/quiz'
import type { QuizSubmissionRow } from '@/types/supabase'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const LEADERBOARD_FETCH_LIMIT = 500

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

function sortLeaderboardRows(rows: QuizSubmissionRow[]): QuizSubmissionRow[] {
  return [...rows].sort((a, b) => {
    if (b.total_points !== a.total_points) {
      return b.total_points - a.total_points
    }
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return a.created_at.localeCompare(b.created_at)
  })
}

export function useQuiz() {
  const [difficulty, setDifficultyState] = useState<QuizDifficulty>('mudah')
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [questionsError, setQuestionsError] = useState<string | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({})

  const [submissions, setSubmissions] = useState<QuizSubmissionRow[]>([])
  const [submissionsLoading, setSubmissionsLoading] = useState(true)
  const [submissionsError, setSubmissionsError] = useState<string | null>(null)

  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [lastSubmission, setLastSubmission] =
    useState<QuizSubmissionRow | null>(null)
  const [reviewItems, setReviewItems] = useState<QuizReviewItem[]>([])

  const questions = useMemo(
    () => allQuestions.filter((item) => item.difficulty === difficulty),
    [allQuestions, difficulty],
  )

  const questionCounts = useMemo(
    () => ({
      mudah: allQuestions.filter((item) => item.difficulty === 'mudah').length,
      sedang: allQuestions.filter((item) => item.difficulty === 'sedang')
        .length,
      sulit: allQuestions.filter((item) => item.difficulty === 'sulit').length,
    }),
    [allQuestions],
  )

  const reloadQuestions = useCallback(async () => {
    setQuestionsLoading(true)
    setQuestionsError(null)
    try {
      const result = await fetchQuizQuestions()
      setAllQuestions(result)
      setCurrentIndex(0)
    } catch (error) {
      setQuestionsError(
        getErrorMessage(error, 'Gagal memuat soal kuis dari database.'),
      )
    } finally {
      setQuestionsLoading(false)
    }
  }, [])

  const reloadSubmissions = useCallback(async () => {
    setSubmissionsLoading(true)
    setSubmissionsError(null)
    try {
      const rows = await fetchQuizSubmissions(LEADERBOARD_FETCH_LIMIT)
      setSubmissions(rows)
    } catch (error) {
      setSubmissionsError(
        getErrorMessage(error, 'Gagal memuat data papan peringkat.'),
      )
    } finally {
      setSubmissionsLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchQuizQuestions()
      .then((result) => {
        if (!cancelled) {
          setAllQuestions(result)
          setQuestionsError(null)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setQuestionsError(
            getErrorMessage(error, 'Gagal memuat soal kuis dari database.'),
          )
        }
      })
      .finally(() => {
        if (!cancelled) setQuestionsLoading(false)
      })

    fetchQuizSubmissions(LEADERBOARD_FETCH_LIMIT)
      .then((rows) => {
        if (!cancelled) {
          setSubmissions(rows)
          setSubmissionsError(null)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setSubmissionsError(
            getErrorMessage(error, 'Gagal memuat data papan peringkat.'),
          )
        }
      })
      .finally(() => {
        if (!cancelled) setSubmissionsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const answeredCount = questions.reduce(
    (acc, item) => (selectedAnswers[item.id] !== undefined ? acc + 1 : acc),
    0,
  )

  const setDifficulty = useCallback((nextDifficulty: QuizDifficulty) => {
    setDifficultyState(nextDifficulty)
    setSelectedAnswers({})
    setCurrentIndex(0)
    setSubmitState('idle')
    setSubmitError(null)
    setLastSubmission(null)
    setReviewItems([])
  }, [])

  const selectAnswer = useCallback(
    (questionId: string, optionIndex: number) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: optionIndex,
      }))
      if (submitState === 'success' || submitState === 'error') {
        setSubmitState('idle')
        setSubmitError(null)
      }
    },
    [submitState],
  )

  const resetQuiz = useCallback(() => {
    setSelectedAnswers({})
    setCurrentIndex(0)
    setSubmitState('idle')
    setSubmitError(null)
    setLastSubmission(null)
    setReviewItems([])
  }, [])

  const submitScore = useCallback(
    async (participantName: string, institution?: string): Promise<boolean> => {
      const trimmedName = participantName.trim()
      if (!trimmedName) {
        setSubmitState('error')
        setSubmitError('Nama peserta wajib diisi sebelum menyimpan skor.')
        return false
      }
      if (trimmedName.length > 80) {
        setSubmitState('error')
        setSubmitError('Nama peserta maksimal 80 karakter.')
        return false
      }
      if (questions.length === 0) {
        setSubmitState('error')
        setSubmitError('Soal kuis tidak tersedia.')
        return false
      }
      if (answeredCount < questions.length) {
        setSubmitState('error')
        setSubmitError(
          `Jawab seluruh ${questions.length} pertanyaan terlebih dahulu sebelum menyimpan skor.`,
        )
        return false
      }

      setSubmitState('submitting')
      setSubmitError(null)
      try {
        const result = await submitAndGradeQuiz({
          participantName: trimmedName,
          institution: institution?.trim() || '',
          difficulty,
          answers: selectedAnswers,
        })
        setLastSubmission(result.submission)
        setReviewItems(result.review)
        setSubmitState('success')

        try {
          const refreshed = await fetchQuizSubmissions(LEADERBOARD_FETCH_LIMIT)
          setSubmissions(refreshed)
        } catch {
          setSubmissions((prev) =>
            sortLeaderboardRows([result.submission, ...prev]),
          )
        }

        return true
      } catch (error) {
        setSubmitState('error')
        setSubmitError(
          getErrorMessage(error, 'Gagal menilai dan menyimpan skor.'),
        )
        return false
      }
    },
    [answeredCount, difficulty, questions.length, selectedAnswers],
  )

  return {
    difficulty,
    setDifficulty,
    questions,
    questionCounts,
    questionsLoading,
    questionsError,
    reloadQuestions,
    currentIndex,
    setCurrentIndex,
    currentQuestion: questions[currentIndex],
    selectedAnswers,
    selectAnswer,
    answeredCount,
    resetQuiz,
    submissions,
    submissionsLoading,
    submissionsError,
    reloadSubmissions,
    submitState,
    submitError,
    lastSubmission,
    reviewItems,
    submitScore,
  }
}
