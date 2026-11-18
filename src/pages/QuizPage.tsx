import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ArrowRight, WarningCircle } from '@phosphor-icons/react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useQuiz } from '@/hooks/useQuiz'
import { cn } from '@/lib/utils'
import { isQuizDifficulty, type QuizDifficulty } from '@/types/quiz'

interface DifficultyCardItem {
  id: QuizDifficulty
  title: string
  description: string
  cardClassName: string
}

const DIFFICULTY_LEVELS: DifficultyCardItem[] = [
  {
    id: 'mudah',
    title: 'Mudah',
    description: 'Pertanyaan dasar untuk mulai belajar.',
    cardClassName: 'bg-[#cbead7]',
  },
  {
    id: 'sedang',
    title: 'Sedang',
    description: 'Latihan lanjutan untuk mengasah pemahaman.',
    cardClassName: 'bg-[#fce29f]',
  },
  {
    id: 'sulit',
    title: 'Sulit',
    description: 'Pertanyaan menantang untuk menguji kemampuan.',
    cardClassName: 'bg-[#fcb5ac]',
  },
]

const DIFFICULTY_LABEL: Record<QuizDifficulty, string> = {
  mudah: 'Mudah',
  sedang: 'Sedang',
  sulit: 'Sulit',
}

const PAGE_SIZE = 10
const SUMMARY_PAGE_SIZE = 6

function getPaginationTokens(
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1)
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages]
  }
  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }
  return [
    1,
    'ellipsis',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis',
    totalPages,
  ]
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fde69e] text-xs font-bold text-[#8a6100] tabular-nums">
        1
      </span>
    )
  }
  if (rank === 2) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e5e8ef] text-xs font-bold text-neutral-700 tabular-nums">
        2
      </span>
    )
  }
  if (rank === 3) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f7d9c4] text-xs font-bold text-[#8c4619] tabular-nums">
        3
      </span>
    )
  }
  return (
    <span className="inline-flex w-8 justify-center text-xs font-medium text-neutral-500 tabular-nums">
      {rank}
    </span>
  )
}

type QuizStep = 'lobby' | 'form' | 'playing' | 'summary'

export function QuizPage() {
  const {
    difficulty: activeDifficulty,
    setDifficulty,
    questions: quizQuestions,
    questionCounts,
    questionsLoading,
    questionsError,
    reloadQuestions,
    currentIndex: currentQuizIndex,
    setCurrentIndex: setCurrentQuizIndex,
    currentQuestion,
    selectedAnswers,
    selectAnswer: handleSelectQuizOption,
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
  } = useQuiz()

  const [step, setStep] = useState<QuizStep>('lobby')
  const [leaderboardPage, setLeaderboardPage] = useState(1)
  const [summaryPage, setSummaryPage] = useState(1)
  const [participantName, setParticipantName] = useState('')
  const [institution, setInstitution] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [playWarning, setPlayWarning] = useState<string | null>(null)

  const totalQuestions = quizQuestions.length
  const progressPercent =
    step === 'summary'
      ? 100
      : totalQuestions > 0
        ? Math.round(((currentQuizIndex + 1) / totalQuestions) * 100)
        : 0

  const currentSelectedOption = currentQuestion
    ? selectedAnswers[currentQuestion.id]
    : undefined

  const isLastQuestion = currentQuizIndex >= totalQuestions - 1

  const handleStartDifficulty = (level: QuizDifficulty) => {
    setDifficulty(level)
    setSummaryPage(1)
    setFormError(null)
    setPlayWarning(null)
    setStep('form')
  }

  const handleBackToSelection = () => {
    resetQuiz()
    setSummaryPage(1)
    setFormError(null)
    setPlayWarning(null)
    setLeaderboardPage(1)
    setStep('lobby')
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!participantName.trim()) {
      setFormError('Nama kamu wajib diisi sebelum memulai kuis.')
      return
    }
    setFormError(null)
    setPlayWarning(null)
    resetQuiz()
    setStep('playing')
  }

  const handleOptionClick = (questionId: string, optionIndex: number) => {
    handleSelectQuizOption(questionId, optionIndex)
    if (playWarning) setPlayWarning(null)
  }

  const handleNextClick = () => {
    if (isLastQuestion) {
      if (totalQuestions > 0 && answeredCount < totalQuestions) {
        const remaining = totalQuestions - answeredCount
        setPlayWarning(
          `Masih ada ${remaining} pertanyaan yang belum dijawab. Gunakan tombol Kembali untuk melengkapi agar skor bisa masuk papan peringkat.`,
        )
        return
      }

      setPlayWarning(null)
      setSummaryPage(1)
      setStep('summary')
      if (totalQuestions > 0 && participantName.trim()) {
        void submitScore(participantName, institution)
      }
      return
    }

    setPlayWarning(null)
    setCurrentQuizIndex(currentQuizIndex + 1)
  }

  const handleResetAll = () => {
    resetQuiz()
    setSummaryPage(1)
    setPlayWarning(null)
    setStep('playing')
  }

  const handleRetrySubmit = () => {
    void submitScore(participantName, institution)
  }

  if (step === 'lobby') {
    const totalEntries = submissions.length
    const totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE))
    const safePage = Math.min(leaderboardPage, totalPages)
    const startOffset = (safePage - 1) * PAGE_SIZE
    const visibleEntries = submissions.slice(
      startOffset,
      startOffset + PAGE_SIZE,
    )
    const startDisplay = totalEntries > 0 ? startOffset + 1 : 0
    const endDisplay = Math.min(startOffset + PAGE_SIZE, totalEntries)
    const paginationTokens = getPaginationTokens(safePage, totalPages)

    return (
      <main
        id="konten-utama"
        className="min-h-screen bg-white px-4 py-8 text-neutral-950 sm:px-8 sm:py-10 lg:px-14"
      >
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-neutral-950 transition-opacity hover:opacity-75"
          >
            Under
          </Link>

          <Link
            to="/"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800 active:scale-[0.99] sm:text-sm"
          >
            <span>Kembali</span>
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
            />
          </Link>
        </header>

        <section
          aria-labelledby="quiz-difficulty-heading"
          className="mx-auto mt-12 w-full max-w-4xl sm:mt-16"
        >
          <ScrollReveal
            as="h1"
            id="quiz-difficulty-heading"
            className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl"
          >
            Seberapa siap kamu?
          </ScrollReveal>

          {questionsError && (
            <div
              role="alert"
              className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900 sm:text-sm"
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <WarningCircle
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                  className="shrink-0"
                />
                {questionsError}
              </span>
              <button
                type="button"
                onClick={() => void reloadQuestions()}
                className="inline-flex min-h-9 items-center rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white"
              >
                Coba lagi
              </button>
            </div>
          )}

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {DIFFICULTY_LEVELS.map((level) => {
              const count = questionCounts[level.id]
              const badgeLabel =
                questionsLoading && count === 0
                  ? 'Memuat soal...'
                  : `${count} pertanyaan`
              const isDisabled = !questionsLoading && count === 0

              return (
                <article
                  key={level.id}
                  className={cn(
                    'flex flex-col justify-between rounded-2xl p-5 sm:p-6',
                    level.cardClassName,
                  )}
                >
                  <div>
                    <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-800 tabular-nums">
                      {badgeLabel}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-950">
                      {level.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-800">
                      {level.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleStartDifficulty(level.id)}
                    className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 transition-all hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 active:scale-[0.99] disabled:opacity-50 sm:text-sm"
                  >
                    Mulai kuis
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        <section
          aria-labelledby="quiz-leaderboard-heading"
          className="mx-auto mt-14 w-full max-w-4xl pb-10 sm:mt-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <ScrollReveal
                as="h2"
                id="quiz-leaderboard-heading"
                className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl"
              >
                Papan peringkat
              </ScrollReveal>
              <p className="mt-1.5 text-xs text-neutral-500 sm:text-sm">
                Lihat perolehan poin seluruh peserta kuis.
              </p>
            </div>

            {submissionsLoading && (
              <span
                role="status"
                aria-live="polite"
                className="text-xs text-neutral-500"
              >
                Menyinkronkan data...
              </span>
            )}
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-[3.75rem_1fr_auto] items-center gap-3 rounded-t-xl bg-[#f4f6f9] px-4 py-3 text-xs font-medium text-neutral-500 sm:grid-cols-[5rem_1fr_8rem] sm:gap-4 sm:px-5">
              <span>Peringkat</span>
              <span>Pengguna</span>
              <span className="text-right">Total poin</span>
            </div>

            {submissionsError && totalEntries === 0 ? (
              <div
                role="alert"
                className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-xs text-amber-900 sm:text-sm"
              >
                <span>{submissionsError}</span>
                <button
                  type="button"
                  onClick={() => void reloadSubmissions()}
                  className="inline-flex min-h-9 items-center rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white"
                >
                  Coba lagi
                </button>
              </div>
            ) : submissionsLoading && totalEntries === 0 ? (
              <p
                role="status"
                aria-live="polite"
                className="py-10 text-center text-sm text-neutral-500"
              >
                Memuat papan peringkat...
              </p>
            ) : totalEntries === 0 ? (
              <p className="border-b border-neutral-100 py-10 text-center text-sm text-neutral-500">
                Belum ada peserta di papan peringkat. Selesaikan kuis untuk
                menjadi yang pertama!
              </p>
            ) : (
              <>
                <div className="mt-2 space-y-1">
                  {visibleEntries.map((entry, idx) => {
                    const rank = startOffset + idx + 1
                    const isFirst = rank === 1
                    const difficultyKey: QuizDifficulty = isQuizDifficulty(
                      entry.difficulty,
                    )
                      ? entry.difficulty
                      : 'mudah'
                    const orgLabel = entry.institution?.trim() || 'Peserta Umum'

                    return (
                      <div
                        key={entry.id}
                        className={cn(
                          'grid grid-cols-[3.75rem_1fr_auto] items-center gap-3 px-4 py-3.5 sm:grid-cols-[5rem_1fr_8rem] sm:gap-4 sm:px-5',
                          isFirst
                            ? 'rounded-xl bg-[#eef4ff]'
                            : 'border-b border-neutral-100',
                        )}
                      >
                        <div className="flex items-center">
                          <RankBadge rank={rank} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-neutral-950">
                            {entry.participant_name}
                          </p>
                          <p className="truncate text-xs text-neutral-500">
                            {`${orgLabel} · ${DIFFICULTY_LABEL[difficultyKey]} (${entry.score}/${entry.total_questions} benar)`}
                          </p>
                        </div>

                        <span
                          className={cn(
                            'text-right text-sm tabular-nums',
                            isFirst
                              ? 'font-bold text-[#1d63dc]'
                              : 'font-semibold text-neutral-900',
                          )}
                        >
                          {`${entry.total_points.toLocaleString('id-ID')} poin`}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-neutral-500">
                    {`Menampilkan ${startDisplay}-${endDisplay} dari ${totalEntries} pengguna`}
                  </p>

                  {totalPages > 1 && (
                    <nav
                      aria-label="Navigasi halaman papan peringkat"
                      className="flex flex-wrap items-center gap-1.5"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setLeaderboardPage(Math.max(1, safePage - 1))
                        }
                        disabled={safePage <= 1}
                        className="inline-flex min-h-9 items-center rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Sebelumnya
                      </button>

                      {paginationTokens.map((token, idx) =>
                        token === 'ellipsis' ? (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-2 text-xs text-neutral-400"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={token}
                            type="button"
                            onClick={() => setLeaderboardPage(token)}
                            aria-current={
                              token === safePage ? 'page' : undefined
                            }
                            className={cn(
                              'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-xs font-semibold tabular-nums transition-colors',
                              token === safePage
                                ? 'bg-[#1d63dc] text-white'
                                : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50',
                            )}
                          >
                            {token}
                          </button>
                        ),
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setLeaderboardPage(Math.min(totalPages, safePage + 1))
                        }
                        disabled={safePage >= totalPages}
                        className="inline-flex min-h-9 items-center rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Berikutnya
                      </button>
                    </nav>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    )
  }

  if (step === 'form') {
    return (
      <main
        id="konten-utama"
        className="min-h-screen bg-white px-6 py-8 text-neutral-950 sm:px-12 sm:py-10 lg:px-20"
      >
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={handleBackToSelection}
            className="text-xl font-bold tracking-tight text-neutral-950 transition-opacity hover:opacity-75"
          >
            Under
          </button>
        </header>

        <section
          aria-labelledby="quiz-form-heading"
          className="mx-auto mt-14 w-full max-w-6xl sm:mt-16"
        >
          <ScrollReveal
            as="h1"
            id="quiz-form-heading"
            className="max-w-xl text-2xl leading-[1.22] font-bold tracking-tight text-neutral-950 sm:text-4xl"
          >
            Sebelum kuis isi form dulu yaa untuk bisa masuk leaderboard
          </ScrollReveal>

          <form
            onSubmit={handleFormSubmit}
            noValidate
            className="mt-10 max-w-3xl sm:mt-12"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
              <div>
                <label
                  htmlFor="quiz-participant-name"
                  className="mb-2.5 block text-xs font-medium text-neutral-800 sm:text-sm"
                >
                  Nama Kamu
                </label>
                <input
                  id="quiz-participant-name"
                  type="text"
                  maxLength={80}
                  value={participantName}
                  onChange={(e) => {
                    setParticipantName(e.target.value)
                    if (formError) setFormError(null)
                  }}
                  placeholder="Masukkan nama kamu"
                  required
                  className="h-12 w-full rounded-xl bg-[#f3f3f3] px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="quiz-participant-institution"
                  className="mb-2.5 block text-xs font-medium text-neutral-800 sm:text-sm"
                >
                  Asal Sekolah Kamu / Universitas
                </label>
                <input
                  id="quiz-participant-institution"
                  type="text"
                  maxLength={80}
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Nama sekolah atau universitas"
                  className="h-12 w-full rounded-xl bg-[#f3f3f3] px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                />
              </div>
            </div>

            {formError && (
              <div
                role="alert"
                className="mt-5 max-w-md rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-900 sm:text-sm"
              >
                {formError}
              </div>
            )}

            <button
              type="submit"
              className="mt-8 inline-flex min-h-11 min-w-36 items-center justify-center rounded-full bg-[#171717] px-8 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 active:scale-[0.99] sm:text-sm"
            >
              Kirim
            </button>
          </form>
        </section>
      </main>
    )
  }

  if (step === 'playing') {
    const hasPhoto = Boolean(currentQuestion?.image)

    return (
      <main
        id="konten-utama"
        className="flex min-h-screen flex-col justify-between bg-white px-6 py-8 text-neutral-950 sm:px-12 sm:py-10 lg:px-20"
      >
        <h1 className="sr-only">
          {`Kuis Pelestarian Hutan Indonesia (${DIFFICULTY_LABEL[activeDifficulty]})`}
        </h1>

        <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <button
            type="button"
            onClick={handleBackToSelection}
            className="text-xl font-bold tracking-tight text-neutral-950 transition-opacity hover:opacity-75"
          >
            Under
          </button>
        </header>

        <section className="mx-auto my-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-8 sm:py-10">
          <div className="mx-auto w-full max-w-md">
            <div
              role="progressbar"
              aria-label="Progres kuis"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              className="mx-auto h-3 w-full max-w-md overflow-hidden rounded-full bg-[#c9cfc8]"
            >
              <div
                className="h-full rounded-full bg-[#28c840] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {questionsLoading && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 text-center font-mono text-xs text-neutral-500"
            >
              Memuat soal dari database...
            </p>
          )}

          {questionsError && (
            <div
              role="alert"
              className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-900"
            >
              <span className="inline-flex items-center gap-1.5 font-medium">
                <WarningCircle
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="shrink-0"
                />
                {questionsError}
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
            <div className="mx-auto w-full max-w-2xl">
              {hasPhoto && currentQuestion.image ? (
                <>
                  <div className="mx-auto mt-6 w-full max-w-[340px] overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                      src={currentQuestion.image}
                      alt={currentQuestion.imageAlt ?? currentQuestion.scenario}
                      width={680}
                      height={425}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </div>

                  <p className="mt-5 font-mono text-xs font-semibold text-neutral-500">
                    {`${currentQuestion.materi} · ${currentQuestion.points} poin`}
                  </p>
                  <h2 className="mt-2 text-left text-xl leading-snug font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {currentQuestion.question}
                  </h2>
                </>
              ) : (
                <div className="mx-auto mt-14 max-w-xl text-center sm:mt-20">
                  <p className="mb-3 font-mono text-xs font-semibold text-neutral-500">
                    {`${currentQuestion.materi} · ${currentQuestion.points} poin`}
                  </p>
                  <h2 className="text-xl leading-snug font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {currentQuestion.question}
                  </h2>
                </div>
              )}

              <div
                className={cn(
                  'mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4',
                  currentQuestion.options.length === 4 &&
                    'sm:grid-flow-col sm:grid-rows-2',
                )}
              >
                {currentQuestion.options.map((option, idx) => {
                  const isChosen = currentSelectedOption === idx
                  const letter = String.fromCharCode(65 + idx)

                  return (
                    <button
                      key={`${currentQuestion.id}-${idx}`}
                      type="button"
                      onClick={() => handleOptionClick(currentQuestion.id, idx)}
                      aria-pressed={isChosen}
                      className={cn(
                        'flex min-h-12 w-full items-center gap-2 rounded-full border px-6 py-3 text-left text-xs leading-snug font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 sm:text-sm',
                        isChosen
                          ? 'border-[#4cb963] bg-[#4cb963] text-white shadow-[0_4px_12px_rgba(76,185,99,0.28)]'
                          : 'border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50',
                      )}
                    >
                      <span>{`${letter}. ${option}`}</span>
                    </button>
                  )
                })}
              </div>

              {playWarning && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-center text-xs font-medium text-amber-900 sm:text-sm"
                >
                  {playWarning}
                </div>
              )}

              <div className="mt-12 flex items-center justify-between pt-4 sm:mt-16">
                <button
                  type="button"
                  onClick={() => {
                    setPlayWarning(null)
                    if (currentQuizIndex > 0) {
                      setCurrentQuizIndex(currentQuizIndex - 1)
                      return
                    }
                    handleBackToSelection()
                  }}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 py-2.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 sm:text-sm"
                >
                  Kembali
                </button>

                <button
                  type="button"
                  onClick={handleNextClick}
                  disabled={totalQuestions === 0}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#171717] px-7 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-40 sm:text-sm"
                >
                  {isLastQuestion ? 'Selesai' : 'Lanjut'}
                </button>
              </div>
            </div>
          ) : (
            <p
              role="status"
              className="mt-12 text-center text-sm text-neutral-600"
            >
              {questionsLoading
                ? 'Menyiapkan soal kuis...'
                : 'Belum ada soal kuis yang tersedia.'}
            </p>
          )}
        </section>

        <div aria-hidden="true" />
      </main>
    )
  }

  const totalSummaryCount = reviewItems.length
  const totalSummaryPages = Math.max(
    1,
    Math.ceil(totalSummaryCount / SUMMARY_PAGE_SIZE),
  )
  const safeSummaryPage = Math.min(summaryPage, totalSummaryPages)
  const startSummaryOffset = (safeSummaryPage - 1) * SUMMARY_PAGE_SIZE
  const visibleSummaryItems = reviewItems.slice(
    startSummaryOffset,
    startSummaryOffset + SUMMARY_PAGE_SIZE,
  )
  const startSummaryDisplay = totalSummaryCount > 0 ? startSummaryOffset + 1 : 0
  const endSummaryDisplay = Math.min(
    startSummaryOffset + SUMMARY_PAGE_SIZE,
    totalSummaryCount,
  )
  const summaryPaginationTokens = getPaginationTokens(
    safeSummaryPage,
    totalSummaryPages,
  )

  return (
    <main
      id="konten-utama"
      className="min-h-screen bg-white px-6 py-8 text-neutral-950 sm:px-12 sm:py-10 lg:px-20"
    >
      <h1 className="sr-only">
        {`Ringkasan Kuis Pelestarian Hutan Indonesia (${DIFFICULTY_LABEL[activeDifficulty]})`}
      </h1>

      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBackToSelection}
          className="text-xl font-bold tracking-tight text-neutral-950 transition-opacity hover:opacity-75"
        >
          Under
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleBackToSelection}
            className="inline-flex min-h-10 items-center rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-800 transition-colors hover:bg-neutral-50 sm:text-sm"
          >
            Papan Peringkat
          </button>

          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex min-h-10 items-center rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 sm:text-sm"
          >
            Ulangi Kuis
          </button>
        </div>
      </header>

      <section
        aria-label="Ringkasan jawaban kuis"
        className="mx-auto mt-10 w-full max-w-4xl pb-10 sm:mt-14"
      >
        {submitState === 'submitting' ? (
          <div className="rounded-2xl bg-[#f4f6f9] px-6 py-12 text-center">
            <p role="status" className="text-sm font-medium text-neutral-700">
              Menilai jawaban dan menyimpan skor ke papan peringkat...
            </p>
          </div>
        ) : submitState === 'error' && submitError ? (
          <div
            role="alert"
            className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs font-semibold text-amber-900 sm:text-sm"
          >
            <span>{submitError}</span>
            <button
              type="button"
              onClick={handleRetrySubmit}
              className="inline-flex min-h-9 items-center rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-semibold text-white"
            >
              Coba Simpan Lagi
            </button>
          </div>
        ) : (
          <>
            {lastSubmission && (
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f4f6f9] px-5 py-4">
                <p className="text-sm font-semibold text-neutral-950 sm:text-base">
                  {`${lastSubmission.score}/${lastSubmission.total_questions} benar · ${lastSubmission.total_points.toLocaleString('id-ID')} poin (${DIFFICULTY_LABEL[activeDifficulty]})`}
                </p>
                <span className="text-xs font-semibold text-[#15803d]">
                  Skor tersimpan ke papan peringkat
                </span>
              </div>
            )}

            <div className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 rounded-xl bg-[#f4f6f9] px-5 py-3 text-xs font-medium text-neutral-500 sm:grid-cols-[5rem_1fr_6rem]">
              <span>Nomor</span>
              <span>Pertanyaan</span>
              <span className="text-right">Check</span>
            </div>

            <div className="mt-2 divide-y divide-neutral-100">
              {visibleSummaryItems.map((item, idx) => {
                const questionNumber = startSummaryOffset + idx + 1
                const chosenLetter =
                  item.chosenIndex >= 0
                    ? String.fromCharCode(65 + item.chosenIndex)
                    : null

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 px-5 py-5 sm:grid-cols-[5rem_1fr_6rem]"
                  >
                    <span className="pl-2 text-sm font-bold text-[#8a6100] tabular-nums">
                      {questionNumber}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 sm:text-base">
                        {item.question}
                      </p>
                      {item.optionFeedback && chosenLetter && (
                        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                          {`Jawabanmu (${chosenLetter}): ${item.optionFeedback}`}
                        </p>
                      )}
                      <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                        {item.explanation}
                      </p>
                    </div>

                    {item.isCorrect ? (
                      <span className="text-right text-xs font-bold text-[#4cb963] sm:text-sm">
                        Benar
                      </span>
                    ) : (
                      <span className="text-right text-xs font-bold text-[#ef4444] sm:text-sm">
                        Salah
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-neutral-500">
                {`Menampilkan ${startSummaryDisplay}-${endSummaryDisplay} dari ${totalSummaryCount} Pertanyaan`}
              </p>

              {totalSummaryPages > 1 && (
                <nav
                  aria-label="Navigasi halaman ringkasan kuis"
                  className="flex flex-wrap items-center gap-1.5"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSummaryPage(Math.max(1, safeSummaryPage - 1))
                    }
                    disabled={safeSummaryPage <= 1}
                    className="inline-flex min-h-9 items-center rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Sebelumnya
                  </button>

                  {summaryPaginationTokens.map((token, idx) =>
                    token === 'ellipsis' ? (
                      <span
                        key={`summary-ellipsis-${idx}`}
                        className="px-2 text-xs text-neutral-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={token}
                        type="button"
                        onClick={() => setSummaryPage(token)}
                        aria-current={
                          token === safeSummaryPage ? 'page' : undefined
                        }
                        className={cn(
                          'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-xs font-semibold tabular-nums transition-colors',
                          token === safeSummaryPage
                            ? 'bg-[#1d63dc] text-white'
                            : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50',
                        )}
                      >
                        {token}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setSummaryPage(
                        Math.min(totalSummaryPages, safeSummaryPage + 1),
                      )
                    }
                    disabled={safeSummaryPage >= totalSummaryPages}
                    className="inline-flex min-h-9 items-center rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Berikutnya
                  </button>
                </nav>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
