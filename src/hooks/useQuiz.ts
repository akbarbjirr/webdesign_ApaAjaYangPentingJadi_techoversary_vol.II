import { useCallback, useEffect, useState } from 'react'
import { QUIZ_QUESTIONS, type QuizQuestion } from '@/data/forestData'
import {
  fetchQuizQuestions,
  fetchQuizSubmissions,
  submitQuizScore,
} from '@/services/quizService'
import type { QuizSubmissionRow } from '@/types/supabase'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function useQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS)
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

  const applyQuestionsSuccess = useCallback(
    (loadedQuestions: QuizQuestion[]) => {
      setQuestions(loadedQuestions)
      setQuestionsError(null)
      setCurrentIndex((prev) => (prev < loadedQuestions.length ? prev : 0))
    },
    [],
  )

  const applyQuestionsError = useCallback((error: unknown) => {
    setQuestionsError(getErrorMessage(error, 'Gagal memuat soal kuis.'))
    setQuestions(QUIZ_QUESTIONS)
  }, [])

  const applySubmissionsError = useCallback((error: unknown) => {
    setSubmissionsError(
      getErrorMessage(error, 'Gagal memuat catatan skor peserta.'),
    )
  }, [])

  const reloadQuestions = useCallback(async () => {
    setQuestionsLoading(true)
    setQuestionsError(null)
    try {
      const result = await fetchQuizQuestions()
      applyQuestionsSuccess(result)
    } catch (error) {
      applyQuestionsError(error)
    } finally {
      setQuestionsLoading(false)
    }
  }, [applyQuestionsError, applyQuestionsSuccess])

  const reloadSubmissions = useCallback(async () => {
    setSubmissionsLoading(true)
    setSubmissionsError(null)
    try {
      const rows = await fetchQuizSubmissions(6)
      setSubmissions(rows)
    } catch (error) {
      applySubmissionsError(error)
    } finally {
      setSubmissionsLoading(false)
    }
  }, [applySubmissionsError])

  useEffect(() => {
    let cancelled = false

    fetchQuizQuestions()
      .then((result) => {
        if (!cancelled) applyQuestionsSuccess(result)
      })
      .catch((error: unknown) => {
        if (!cancelled) applyQuestionsError(error)
      })
      .finally(() => {
        if (!cancelled) setQuestionsLoading(false)
      })

    fetchQuizSubmissions(6)
      .then((rows) => {
        if (!cancelled) {
          setSubmissions(rows)
          setSubmissionsError(null)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) applySubmissionsError(error)
      })
      .finally(() => {
        if (!cancelled) setSubmissionsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [applyQuestionsError, applyQuestionsSuccess, applySubmissionsError])

  const answeredCount = Object.keys(selectedAnswers).length
  const correctCount = questions.reduce((acc, item) => {
    return selectedAnswers[item.id] === item.correctIndex ? acc + 1 : acc
  }, 0)

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
      if (answeredCount < questions.length) {
        setSubmitState('error')
        setSubmitError(
          `Jawab seluruh ${questions.length} skenario terlebih dahulu sebelum menyimpan skor.`,
        )
        return false
      }

      setSubmitState('submitting')
      setSubmitError(null)
      try {
        const saved = await submitQuizScore({
          participant_name: trimmedName,
          institution: institution?.trim() || null,
          score: correctCount,
          total_questions: questions.length,
          answers: selectedAnswers,
        })
        setLastSubmission(saved)
        setSubmitState('success')
        setSubmissions((prev) => [saved, ...prev].slice(0, 6))
        return true
      } catch (error) {
        setSubmitState('error')
        setSubmitError(getErrorMessage(error, 'Gagal menyimpan skor.'))
        return false
      }
    },
    [answeredCount, correctCount, questions.length, selectedAnswers],
  )

  return {
    questions,
    questionsLoading,
    questionsError,
    reloadQuestions,
    currentIndex,
    setCurrentIndex,
    currentQuestion: questions[currentIndex],
    selectedAnswers,
    selectAnswer,
    answeredCount,
    correctCount,
    resetQuiz,
    submissions,
    submissionsLoading,
    submissionsError,
    reloadSubmissions,
    submitState,
    submitError,
    lastSubmission,
    submitScore,
  }
}
