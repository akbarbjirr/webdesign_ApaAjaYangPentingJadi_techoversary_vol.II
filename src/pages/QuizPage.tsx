import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  WarningCircle,
} from '@phosphor-icons/react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useQuiz } from '@/hooks/useQuiz'
import { cn } from '@/lib/utils'

export function QuizPage() {
  const {
    questions: quizQuestions,
    questionsLoading,
    questionsError,
    reloadQuestions,
    currentIndex: currentQuizIndex,
    setCurrentIndex: setCurrentQuizIndex,
    currentQuestion,
    selectedAnswers,
    selectAnswer: handleSelectQuizOption,
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
  } = useQuiz()

  const [showSummary, setShowSummary] = useState(false)
  const [participantName, setParticipantName] = useState('')
  const [institution, setInstitution] = useState('')

  const totalQuestions = quizQuestions.length
  const progressPercent = showSummary
    ? 100
    : totalQuestions > 0
      ? Math.round(((currentQuizIndex + 1) / totalQuestions) * 100)
      : 0

  const currentSelectedOption = currentQuestion
    ? selectedAnswers[currentQuestion.id]
    : undefined

  const isLastQuestion = currentQuizIndex >= totalQuestions - 1

  const handleNextClick = () => {
    if (isLastQuestion) {
      setShowSummary(true)
      return
    }
    setCurrentQuizIndex(currentQuizIndex + 1)
  }

  const handleResetAll = () => {
    resetQuiz()
    setShowSummary(false)
  }

  const handleQuizSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const ok = await submitScore(participantName, institution)
    if (ok) {
      setParticipantName('')
      setInstitution('')
    }
  }

  return (
    <main
      id="konten-utama"
      className="flex min-h-screen flex-col justify-between bg-[#f8f8f6] px-4 py-8 text-neutral-950 sm:px-8 sm:py-12 lg:px-16"
    >
      <h1 className="sr-only">Quiz Pelestarian Hutan Indonesia</h1>

      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between sm:w-32">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full px-3 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-200/60"
          >
            <ArrowLeft size={20} weight="regular" aria-hidden="true" />
            <span>Kembali</span>
          </Link>

          <span className="text-sm font-medium text-neutral-800 tabular-nums sm:hidden">
            {showSummary
              ? `${totalQuestions}/${totalQuestions}`
              : `${Math.min(currentQuizIndex + 1, totalQuestions)}/${totalQuestions}`}
          </span>
        </div>

        <div className="flex w-full max-w-2xl flex-1 items-center gap-4">
          <div
            role="progressbar"
            aria-label="Progres quiz"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercent}
            className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#c9d3c8]/80"
          >
            <div
              className="h-full rounded-full bg-[#15803d] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="hidden text-sm font-medium text-neutral-800 tabular-nums sm:inline">
            {showSummary
              ? `${totalQuestions}/${totalQuestions}`
              : `${Math.min(currentQuizIndex + 1, totalQuestions)}/${totalQuestions}`}
          </span>
        </div>

        <div className="hidden sm:block sm:w-32" aria-hidden="true" />
      </header>

      {!showSummary ? (
        <>
          <section className="mx-auto my-auto w-full max-w-3xl py-10">
            {questionsLoading && (
              <p
                role="status"
                aria-live="polite"
                className="mb-4 text-center font-mono text-xs text-neutral-600"
              >
                Memuat soal terbaru...
              </p>
            )}

            {questionsError && (
              <div
                role="alert"
                className="mx-auto mb-6 flex max-w-xl flex-wrap items-center justify-center gap-3 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-xs text-amber-800"
              >
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <WarningCircle
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="shrink-0"
                  />
                  Menampilkan soal cadangan lokal.
                </span>
                <button
                  type="button"
                  onClick={() => void reloadQuestions()}
                  className="underline hover:text-amber-950"
                >
                  Coba lagi
                </button>
              </div>
            )}

            {currentQuestion ? (
              <div>
                <p className="text-center text-xs font-medium text-neutral-600 sm:text-sm">
                  {currentQuestion.scenario}
                </p>

                <h2 className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed font-medium text-neutral-900 sm:text-lg">
                  {currentQuestion.question}
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {currentQuestion.options.map((option, idx) => {
                    const isChosen = currentSelectedOption === idx
                    const letter = String.fromCharCode(65 + idx)

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          handleSelectQuizOption(currentQuestion.id, idx)
                        }
                        aria-pressed={isChosen}
                        className={cn(
                          'flex min-h-14 w-full items-start gap-3 rounded-xl border px-5 py-4 text-left transition-all',
                          isChosen
                            ? 'border-[#15803d] bg-[#15803d] text-white shadow-sm'
                            : 'border-neutral-200/90 bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-neutral-300 hover:bg-neutral-50/70',
                        )}
                      >
                        <span className="shrink-0 text-base font-medium sm:text-lg">
                          {letter}.
                        </span>
                        <span className="text-sm leading-relaxed font-medium sm:text-base">
                          {option}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <p role="status" className="text-center text-sm text-neutral-600">
                Belum ada soal quiz yang tersedia.
              </p>
            )}
          </section>

          <footer className="mx-auto flex w-full max-w-6xl items-center justify-end pt-4">
            <button
              type="button"
              onClick={handleNextClick}
              disabled={totalQuestions === 0}
              className="inline-flex min-h-11 items-center gap-3 rounded-full bg-neutral-950 px-6 py-2.5 text-xs font-medium text-white transition-all hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-40 sm:text-sm"
            >
              <span>{isLastQuestion ? 'Selesai' : 'Berikutnya'}</span>
              <ArrowRight size={16} weight="regular" aria-hidden="true" />
            </button>
          </footer>
        </>
      ) : (
        <section className="mx-auto my-8 w-full max-w-3xl space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold text-green-700">
                  HASIL QUIZ RIMBA
                </p>
                <ScrollReveal
                  as="h2"
                  className="mt-1 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl"
                >
                  {`Skor Kamu: ${correctCount} / ${totalQuestions}`}
                </ScrollReveal>
                <p className="mt-2 text-sm text-neutral-600">
                  {answeredCount < totalQuestions
                    ? `Kamu baru menjawab ${answeredCount} dari ${totalQuestions} skenario.`
                    : 'Seluruh skenario sudah dijawab. Simpan skormu dan pelajari ringkasan jawabannya di bawah.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="inline-flex min-h-11 items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-50 sm:text-sm"
                >
                  Ulangi Quiz
                </button>
                <Link
                  to="/"
                  className="inline-flex min-h-11 items-center rounded-full border border-neutral-300 bg-white px-5 py-2 text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-50 sm:text-sm"
                >
                  Home
                </Link>
              </div>
            </div>

            {answeredCount < totalQuestions && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs font-medium text-amber-900 sm:text-sm">
                <span>
                  Lengkapi seluruh jawaban agar hasil dapat disimpan ke papan
                  skor.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const firstUnanswered = quizQuestions.findIndex(
                      (q) => selectedAnswers[q.id] === undefined,
                    )
                    setCurrentQuizIndex(
                      firstUnanswered >= 0 ? firstUnanswered : 0,
                    )
                    setShowSummary(false)
                  }}
                  className="inline-flex min-h-11 items-center rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white"
                >
                  Lanjut Jawab
                </button>
              </div>
            )}

            <div className="mt-6 space-y-4">
              {quizQuestions.map((q, idx) => {
                const chosenIdx = selectedAnswers[q.id]
                const isCorrect = chosenIdx === q.correctIndex

                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-neutral-600">
                        Skenario 0{idx + 1}
                      </span>
                      {chosenIdx === undefined ? (
                        <span className="font-mono text-xs font-semibold text-neutral-600">
                          Belum dijawab
                        </span>
                      ) : isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                          <CheckCircle
                            size={15}
                            weight="fill"
                            aria-hidden="true"
                          />
                          Tepat
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-amber-800">
                          Kurang tepat
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm font-semibold text-neutral-950">
                      {q.question}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-700 sm:text-sm">
                      <strong className="text-neutral-950">Penjelasan:</strong>{' '}
                      {q.explanation}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <form
            onSubmit={(event) => void handleQuizSubmit(event)}
            noValidate
            className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
          >
            <div className="space-y-1 border-b border-neutral-200 pb-4">
              <ScrollReveal
                as="h3"
                className="text-xl font-bold tracking-tight text-neutral-950"
              >
                Simpan Skor Quiz
              </ScrollReveal>
              <p className="text-sm text-neutral-600">
                Catat hasil quiz ke papan skor publik bersama peserta lain.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="quiz-participant-name"
                  className="mb-1.5 block text-sm font-semibold text-neutral-950"
                >
                  Nama Peserta
                </label>
                <input
                  id="quiz-participant-name"
                  type="text"
                  maxLength={80}
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Nama Anda"
                  required
                  className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-950 placeholder:text-neutral-500"
                />
              </div>

              <div>
                <label
                  htmlFor="quiz-participant-institution"
                  className="mb-1.5 block text-sm font-semibold text-neutral-950"
                >
                  Asal Sekolah / Kampus (Opsional)
                </label>
                <input
                  id="quiz-participant-institution"
                  type="text"
                  maxLength={80}
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Contoh: Universitas Kuningan"
                  className="min-h-11 w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-sm text-neutral-950 placeholder:text-neutral-500"
                />
              </div>
            </div>

            {submitState === 'error' && submitError && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-sm font-semibold text-amber-900"
              >
                {submitError}
              </div>
            )}

            {submitState === 'success' && lastSubmission && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 rounded-xl border border-green-300 bg-green-50 p-4 text-sm font-semibold text-green-900"
              >
                Skor milik {lastSubmission.participant_name} (
                {lastSubmission.score}/{lastSubmission.total_questions})
                berhasil disimpan.
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-neutral-600">
                Terjawab: {answeredCount}/{totalQuestions} skenario
              </span>

              <button
                type="submit"
                disabled={submitState === 'submitting'}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
              >
                <span>
                  {submitState === 'submitting'
                    ? 'Menyimpan...'
                    : 'Simpan Skor'}
                </span>
                <ArrowRight size={16} weight="regular" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2 border-b border-neutral-200 pb-3">
              <ScrollReveal
                as="h3"
                className="text-lg font-bold text-neutral-950"
              >
                Skor Peserta Terbaru
              </ScrollReveal>
              <button
                type="button"
                onClick={() => void reloadSubmissions()}
                disabled={submissionsLoading}
                className="inline-flex min-h-11 items-center rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-950 hover:bg-neutral-50 disabled:opacity-50"
              >
                Segarkan
              </button>
            </div>

            {submissionsLoading && (
              <p
                role="status"
                aria-live="polite"
                className="mt-4 text-xs text-neutral-600"
              >
                Memuat catatan skor...
              </p>
            )}

            {!submissionsLoading && submissionsError && (
              <div
                role="alert"
                className="mt-4 space-y-2 rounded-xl border border-amber-300 bg-amber-50 p-3.5"
              >
                <p className="text-xs font-medium text-amber-900">
                  Gagal memuat skor ({submissionsError}).
                </p>
                <button
                  type="button"
                  onClick={() => void reloadSubmissions()}
                  className="inline-flex min-h-11 items-center rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white"
                >
                  Coba Muat Ulang
                </button>
              </div>
            )}

            {!submissionsLoading &&
              !submissionsError &&
              submissions.length === 0 && (
                <p
                  role="status"
                  className="mt-4 text-xs leading-relaxed text-neutral-600"
                >
                  Belum ada skor peserta tercatat.
                </p>
              )}

            {!submissionsLoading &&
              !submissionsError &&
              submissions.length > 0 && (
                <ul className="mt-3 divide-y divide-neutral-200">
                  {submissions.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-neutral-950">
                          {entry.participant_name}
                        </p>
                        {entry.institution && (
                          <p className="truncate text-xs text-neutral-600">
                            {entry.institution}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 font-mono text-xs font-bold text-neutral-950">
                        {entry.score}/{entry.total_questions}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </section>
      )}
    </main>
  )
}
