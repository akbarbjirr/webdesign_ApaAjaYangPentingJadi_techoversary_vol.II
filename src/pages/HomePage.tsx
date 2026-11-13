import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  Binoculars,
  CheckCircle,
  Compass,
  FireSimple,
  Leaf,
  MagnifyingGlass,
  Plant,
  TreeEvergreen,
  WarningCircle,
} from '@phosphor-icons/react'
import {
  CANOPY_STRATA,
  FIELD_PROTOCOLS,
  HABIT_PLEDGES,
  QUIZ_QUESTIONS,
} from '@/data/forestData'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'Semua',
  'Pencegahan Api',
  'Konsumsi Harian',
  'Pelaporan & Restorasi',
] as const

type CategoryFilter = (typeof CATEGORIES)[number]

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const [activeStratumId, setActiveStratumId] = useState<string>(
    CANOPY_STRATA[0].id,
  )
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [protocolViewState, setProtocolViewState] = useState<
    'ready' | 'loading' | 'error'
  >('ready')

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({})
  const [checkedPledges, setCheckedPledges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rimbawara_pledges')
      return saved ? (JSON.parse(saved) as string[]) : ['pledge-1']
    } catch {
      return ['pledge-1']
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('rimbawara_pledges', JSON.stringify(checkedPledges))
    } catch {
      // Ignore storage quota errors in restricted browsing modes.
    }
  }, [checkedPledges])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReducedMotion) return

      gsap.fromTo(
        '.hero-reveal',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
        },
      )
    },
    { scope: heroRef },
  )

  const activeStratum =
    CANOPY_STRATA.find((item) => item.id === activeStratumId) ??
    CANOPY_STRATA[0]

  const filteredProtocols = FIELD_PROTOCOLS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory
    const query = searchQuery.trim().toLowerCase()
    const matchesQuery =
      query.length === 0 ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.whyItMatters.toLowerCase().includes(query)
    return matchesCategory && matchesQuery
  })

  const flagshipProtocol = filteredProtocols.find((item) => item.isFlagship)
  const supportingProtocols = filteredProtocols.filter(
    (item) => !item.isFlagship,
  )

  const currentQuestion = QUIZ_QUESTIONS[currentQuizIndex]
  const currentSelectedOption = selectedAnswers[currentQuestion.id]
  const answeredCount = Object.keys(selectedAnswers).length
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc
  }, 0)

  const handleCategoryChange = (category: CategoryFilter) => {
    setProtocolViewState('loading')
    setSelectedCategory(category)
    window.setTimeout(() => {
      setProtocolViewState('ready')
    }, 120)
  }

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }))
  }

  const handleResetQuiz = () => {
    setSelectedAnswers({})
    setCurrentQuizIndex(0)
  }

  const handleTogglePledge = (id: string) => {
    setCheckedPledges((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <main id="konten-utama" className="min-h-screen">
      <section
        ref={heroRef}
        className="border-b border-[var(--border-strong)] bg-[var(--bg-primary)] py-10 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-6 lg:col-span-7">
              <h1 className="hero-reveal font-display text-3xl leading-[1.12] font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.35rem]">
                Menjaga Hutan Dimulai dari Memahami Cara Ia Bernapas.
              </h1>

              <p className="hero-reveal max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                Hutan hujan tropis bukan sekadar kumpulan batang kayu. Dari
                puncak pohon meranti hingga lapisan gambut basah di bawah kaki,
                setiap strata mengatur cadangan air, meredam suhu bumi, dan
                melindungi ribuan spesies. Pelajari langkah praktis yang bisa
                kita lakukan dari rumah maupun saat berada di alam.
              </p>

              <div className="hero-reveal flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#protokol-lapangan"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--accent-primary)] px-5 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90 active:scale-[0.99]"
                >
                  <Compass size={18} weight="bold" aria-hidden="true" />
                  <span>Buka Panduan Pencegahan</span>
                </a>

                <a
                  href="#simulasi-kuis"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-elevated)] active:scale-[0.99]"
                >
                  <Binoculars size={18} weight="bold" aria-hidden="true" />
                  <span>Uji Keputusan di Lapangan</span>
                </a>
              </div>

              <div className="hero-reveal rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-4 sm:p-5">
                <p className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  CATATAN DRAF ARSITEKTUR [CONTOH HALAMAN UTAMA]
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-primary)]">
                  Halaman ini disiapkan sebagai purwarupa interaktif untuk
                  sub-tema Edukasi &amp; Portal Lingkungan TECHNOVERSARY VOL.
                  II. Struktur komponen sudah modular dan siap disesuaikan
                  begitu desain final dari tim desainer selesai.
                </p>
              </div>
            </div>

            <div
              id="stratifikasi"
              className="hero-reveal rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-5 sm:p-6 lg:col-span-5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Diagnostik 4 Lapisan Hutan
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Pilih lapisan untuk melihat fungsi ekologis dan cara
                    melindunginya
                  </p>
                </div>
                <TreeEvergreen
                  size={28}
                  weight="duotone"
                  aria-hidden="true"
                  className="shrink-0 text-[var(--accent-primary)]"
                />
              </div>

              <div className="my-4 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3">
                <svg
                  viewBox="0 0 480 180"
                  width="480"
                  height="180"
                  role="img"
                  aria-label="Ilustrasi penampang empat lapisan vertikal hutan tropis dari tajuk puncak hingga lantai gambut"
                  className="h-auto w-full"
                >
                  <rect
                    x="0"
                    y="0"
                    width="480"
                    height="42"
                    fill="currentColor"
                    className={cn(
                      'transition-opacity',
                      activeStratumId === 'emergent'
                        ? 'text-[var(--accent-primary)] opacity-25'
                        : 'text-[var(--border-subtle)] opacity-10',
                    )}
                  />
                  <rect
                    x="0"
                    y="44"
                    width="480"
                    height="44"
                    fill="currentColor"
                    className={cn(
                      'transition-opacity',
                      activeStratumId === 'canopy'
                        ? 'text-[var(--accent-primary)] opacity-25'
                        : 'text-[var(--border-subtle)] opacity-10',
                    )}
                  />
                  <rect
                    x="0"
                    y="90"
                    width="480"
                    height="44"
                    fill="currentColor"
                    className={cn(
                      'transition-opacity',
                      activeStratumId === 'understory'
                        ? 'text-[var(--accent-primary)] opacity-25'
                        : 'text-[var(--border-subtle)] opacity-10',
                    )}
                  />
                  <rect
                    x="0"
                    y="136"
                    width="480"
                    height="44"
                    fill="currentColor"
                    className={cn(
                      'transition-opacity',
                      activeStratumId === 'forest-floor'
                        ? 'text-[var(--accent-primary)] opacity-25'
                        : 'text-[var(--border-subtle)] opacity-10',
                    )}
                  />

                  <g
                    stroke="currentColor"
                    className="text-[var(--text-primary)]"
                  >
                    <line x1="80" y1="22" x2="80" y2="170" strokeWidth="4" />
                    <circle
                      cx="80"
                      cy="22"
                      r="16"
                      fill="currentColor"
                      className="text-[var(--accent-primary)]"
                    />
                    <line
                      x1="190"
                      y1="58"
                      x2="190"
                      y2="170"
                      strokeWidth="3.5"
                    />
                    <ellipse
                      cx="190"
                      cy="62"
                      rx="38"
                      ry="16"
                      fill="currentColor"
                      className="text-[var(--accent-primary)]"
                    />
                    <line
                      x1="305"
                      y1="62"
                      x2="305"
                      y2="170"
                      strokeWidth="3.5"
                    />
                    <ellipse
                      cx="305"
                      cy="65"
                      rx="34"
                      ry="15"
                      fill="currentColor"
                      className="text-[var(--accent-primary)]"
                    />
                    <line
                      x1="400"
                      y1="104"
                      x2="400"
                      y2="170"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="400"
                      cy="108"
                      r="13"
                      fill="currentColor"
                      className="text-[var(--accent-primary)]"
                    />
                  </g>
                </svg>
              </div>

              <div
                role="tablist"
                aria-label="Daftar lapisan hutan"
                className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              >
                {CANOPY_STRATA.map((stratum) => {
                  const isSelected = stratum.id === activeStratum.id
                  return (
                    <button
                      key={stratum.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`panel-${stratum.id}`}
                      id={`tab-${stratum.id}`}
                      onClick={() => setActiveStratumId(stratum.id)}
                      className={cn(
                        'flex min-h-11 flex-col items-start rounded-md border px-3.5 py-2.5 text-left transition-colors',
                        isSelected
                          ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--accent-contrast)]'
                          : 'border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)]',
                      )}
                    >
                      <span className="font-mono text-xs font-semibold">
                        {stratum.code} ({stratum.elevationLabel})
                      </span>
                      <span className="mt-0.5 text-sm font-bold">
                        {stratum.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div
                id={`panel-${activeStratum.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeStratum.id}`}
                className="mt-4 space-y-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-4"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                    PERAN EKOLOGIS ({activeStratum.speciesExample})
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-primary)]">
                    {activeStratum.ecologicalRole}
                  </p>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-2.5">
                  <span className="font-mono text-xs font-semibold text-[var(--accent-warm)]">
                    ANCAMAN UTAMA
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-primary)]">
                    {activeStratum.primaryThreat}
                  </p>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-2.5">
                  <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                    CARA KITA MELINDUNGINYA
                  </span>
                  <p className="mt-1 text-sm leading-relaxed font-medium text-[var(--text-primary)]">
                    {activeStratum.citizenAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="protokol-lapangan"
        className="border-b border-[var(--border-strong)] bg-[var(--bg-surface)] py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[var(--border-strong)] pb-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Protokol Praktis Menjaga Hutan dari Rumah dan Lapangan
              </h2>
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                Kerusakan hutan tidak hanya terjadi karena gergaji mesin di
                pedalaman, tetapi juga dipicu oleh kebiasaan konsumsi harian dan
                kelalaian saat berwisata alam. Saring panduan berikut sesuai
                konteks aktivitasmu.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <label
                htmlFor="cari-protokol"
                className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]"
              >
                Cari topik atau kata kunci protokol
              </label>
              <div className="relative">
                <MagnifyingGlass
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--text-secondary)]"
                />
                <input
                  id="cari-protokol"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Contoh: gambut, kertas, bibit..."
                  className="min-h-11 w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] py-2 pr-4 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div
              role="group"
              aria-label="Filter kategori protokol"
              className="flex flex-wrap gap-2"
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    aria-pressed={isActive}
                    className={cn(
                      'inline-flex min-h-11 items-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--accent-contrast)]'
                        : 'border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)]',
                    )}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                setProtocolViewState((prev) =>
                  prev === 'error' ? 'ready' : 'error',
                )
              }
              className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3.5 py-2 font-mono text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
            >
              <WarningCircle size={16} weight="bold" aria-hidden="true" />
              <span>
                {protocolViewState === 'error'
                  ? 'Pulihkan Tampilan Data'
                  : 'Simulasi State Gangguan'}
              </span>
            </button>
          </div>

          {protocolViewState === 'loading' && (
            <div
              role="status"
              aria-live="polite"
              className="mt-8 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-8 text-center"
            >
              <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">
                Memuat daftar protokol kategori {selectedCategory}...
              </p>
            </div>
          )}

          {protocolViewState === 'error' && (
            <div
              role="alert"
              className="mt-8 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6 sm:p-8"
            >
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                    Gagal Memuat Basis Data Protokol Lapangan
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Koneksi ke modul panduan terputus saat memuat ulang dokumen.
                    Muat ulang daftar protokol untuk kembali membaca panduan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProtocolViewState('ready')}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-md bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)]"
                >
                  Muat Ulang Protokol
                </button>
              </div>
            </div>
          )}

          {protocolViewState === 'ready' && filteredProtocols.length === 0 && (
            <div
              role="status"
              className="mt-8 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-8 text-center"
            >
              <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                Tidak Ada Protokol yang Cocok dengan Pencarian
              </h3>
              <p className="mx-auto mt-1 max-w-md text-sm text-[var(--text-secondary)]">
                Kata kunci &ldquo;{searchQuery}&rdquo; pada kategori{' '}
                {selectedCategory} belum ditemukan. Reset filter untuk melihat
                seluruh panduan pelestarian hutan.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('Semua')
                }}
                className="mt-4 inline-flex min-h-11 items-center rounded-md bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)]"
              >
                Reset Pencarian &amp; Kategori
              </button>
            </div>
          )}

          {protocolViewState === 'ready' && filteredProtocols.length > 0 && (
            <div className="mt-8 space-y-8">
              {flagshipProtocol && (
                <article className="rounded-xl border-2 border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--accent-warm)]">
                      <FireSimple size={16} weight="bold" aria-hidden="true" />
                      <span>
                        PRIORITAS UTAMA ({flagshipProtocol.code} /{' '}
                        {flagshipProtocol.category})
                      </span>
                    </span>
                    <span className="font-mono text-xs text-[var(--text-secondary)]">
                      Fokus Pencegahan Kebakaran Hutan &amp; Lahan
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="space-y-3 lg:col-span-5">
                      <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                        {flagshipProtocol.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                        {flagshipProtocol.summary}
                      </p>
                      <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5">
                        <p className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                          ALASAN EKOLOGIS
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-primary)]">
                          {flagshipProtocol.whyItMatters}
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-7">
                      <p className="mb-3 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                        LANGKAH TINDAKAN WAJIB
                      </p>
                      <ol className="space-y-2.5">
                        {flagshipProtocol.actionSteps.map((step, index) => (
                          <li
                            key={step}
                            className="flex items-start gap-3 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3.5 text-sm leading-relaxed text-[var(--text-primary)]"
                          >
                            <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                              0{index + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </article>
              )}

              {supportingProtocols.length > 0 && (
                <div className="divide-y divide-[var(--border-strong)] rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                  {supportingProtocols.map((protocol) => (
                    <article
                      key={protocol.id}
                      className="grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:p-7"
                    >
                      <div className="space-y-2 md:col-span-5">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                          <span>{protocol.code}</span>
                          <span>/</span>
                          <span>{protocol.category}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                          {protocol.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          {protocol.summary}
                        </p>
                      </div>

                      <div className="space-y-3 md:col-span-7">
                        <ul className="space-y-2">
                          {protocol.actionSteps.map((step) => (
                            <li
                              key={step}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-primary)]"
                            >
                              <Leaf
                                size={16}
                                weight="duotone"
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-[var(--accent-primary)]"
                              />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="border-t border-[var(--border-subtle)] pt-2.5 text-xs text-[var(--text-secondary)]">
                          <strong>Dampak langsung:</strong>{' '}
                          {protocol.whyItMatters}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section
        id="simulasi-kuis"
        className="border-b border-[var(--border-strong)] bg-[var(--bg-primary)] py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                Simulasi Keputusan Penjaga Hutan
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Uji pemahamanmu menghadapi empat situasi nyata di lapangan.
                Setiap jawaban langsung menampilkan penjelasan ilmiah agar bisa
                dipelajari bersama.
              </p>

              <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-4">
                <div className="flex items-center justify-between font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  <span>PROGRES SIMULASI</span>
                  <span>
                    {answeredCount} / {QUIZ_QUESTIONS.length} Skenario Dijawab
                  </span>
                </div>
                <p className="mt-2 font-display text-lg font-bold text-[var(--text-primary)]">
                  Skor Tepat Sementara: {correctCount} dari{' '}
                  {QUIZ_QUESTIONS.length}
                </p>
                {answeredCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="mt-3 inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
                  >
                    Ulangi Simulasi dari Awal
                  </button>
                )}
              </div>

              <div
                role="group"
                aria-label="Pilih nomor skenario kuis"
                className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2"
              >
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentQuizIndex
                  const isAnswered = selectedAnswers[q.id] !== undefined
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuizIndex(idx)}
                      className={cn(
                        'min-h-11 rounded-md border px-3 py-2 text-left font-mono text-xs font-semibold transition-colors',
                        isCurrent
                          ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--accent-contrast)]'
                          : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]',
                      )}
                    >
                      Skenario 0{idx + 1} {isAnswered ? '(Terjawab)' : ''}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 sm:p-8 lg:col-span-8">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  {currentQuestion.scenario}
                </span>
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  Soal {currentQuizIndex + 1} dari {QUIZ_QUESTIONS.length}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl leading-snug font-bold text-[var(--text-primary)] sm:text-2xl">
                {currentQuestion.question}
              </h3>

              <div className="mt-6 space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isChosen = currentSelectedOption === idx
                  const isCorrectOption = idx === currentQuestion.correctIndex
                  const showFeedback = currentSelectedOption !== undefined

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        handleSelectQuizOption(currentQuestion.id, idx)
                      }
                      aria-pressed={isChosen}
                      className={cn(
                        'flex min-h-11 w-full items-start gap-3 rounded-lg border p-4 text-left text-sm leading-relaxed transition-colors',
                        isChosen
                          ? 'border-2 border-[var(--accent-primary)] bg-[var(--bg-elevated)] font-semibold text-[var(--text-primary)]'
                          : 'border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]',
                      )}
                    >
                      <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <div className="flex-1">
                        <span>{option}</span>
                        {showFeedback && isCorrectOption && (
                          <span className="mt-1 block font-mono text-xs font-semibold text-[var(--accent-primary)]">
                            [Pilihan Tepat Secara Ekologis]
                          </span>
                        )}
                        {showFeedback && isChosen && !isCorrectOption && (
                          <span className="mt-1 block font-mono text-xs font-semibold text-[var(--accent-warm)]">
                            [Kurang Tepat: Pelajari penjelasannya di bawah]
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {currentSelectedOption !== undefined && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-4"
                >
                  <p className="font-mono text-xs font-bold text-[var(--text-secondary)]">
                    PENJELASAN ILMIAH LAPANGAN
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-primary)]">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
                <button
                  type="button"
                  disabled={currentQuizIndex === 0}
                  onClick={() =>
                    setCurrentQuizIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] disabled:opacity-45"
                >
                  Skenario Sebelumnya
                </button>

                <button
                  type="button"
                  disabled={currentQuizIndex === QUIZ_QUESTIONS.length - 1}
                  onClick={() =>
                    setCurrentQuizIndex((prev) =>
                      Math.min(QUIZ_QUESTIONS.length - 1, prev + 1),
                    )
                  }
                  className="inline-flex min-h-11 items-center rounded-md bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] disabled:opacity-45"
                >
                  Skenario Berikutnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="komitmen-harian"
        className="bg-[var(--bg-surface)] py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-secondary)]">
                <Plant size={18} weight="duotone" aria-hidden="true" />
                <span>DAFTAR KEBIASAAN PENJAGA HUTAN</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                Pilih Komitmen Harian yang Siap Kamu Jalankan
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Centang kebiasaan yang relevan dengan aktivitasmu. Pilihanmu
                tersimpan di peramban ini sebagai pengingat pribadi.
              </p>

              <div className="space-y-3 pt-2">
                {HABIT_PLEDGES.map((pledge) => {
                  const isChecked = checkedPledges.includes(pledge.id)
                  return (
                    <label
                      key={pledge.id}
                      htmlFor={pledge.id}
                      className={cn(
                        'flex min-h-11 items-start gap-3.5 rounded-lg border p-4 transition-colors',
                        isChecked
                          ? 'border-[var(--accent-primary)] bg-[var(--bg-elevated)]'
                          : 'border-[var(--border-strong)] bg-[var(--bg-primary)]',
                      )}
                    >
                      <input
                        id={pledge.id}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTogglePledge(pledge.id)}
                        className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent-primary)]"
                      />
                      <span className="space-y-1 text-sm">
                        <span className="block font-semibold text-[var(--text-primary)]">
                          {pledge.label}
                        </span>
                        <span className="block text-xs text-[var(--text-secondary)]">
                          {pledge.impactNote}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>

              <p
                role="status"
                aria-live="polite"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-primary)]"
              >
                <CheckCircle
                  size={18}
                  weight="fill"
                  aria-hidden="true"
                  className="text-[var(--accent-primary)]"
                />
                <span>
                  {checkedPledges.length} dari {HABIT_PLEDGES.length} komitmen
                  harian aktif dipilih.
                </span>
              </p>
            </div>

            <div className="space-y-4 lg:col-span-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                Navigasi Struktur Halaman Wajib Lomba
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Sesuai ketentuan Guidebook TECHNOVERSARY VOL. II, seluruh
                halaman wajib berikut sudah terhubung melalui React Router dan
                siap diisi desain final:
              </p>

              <div className="space-y-3 pt-2">
                <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                        1. Halaman Tentang &amp; Profil Tim (/tentang)
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Memuat latar belakang misi edukasi pelestarian hutan
                        serta slot identitas tim peserta.
                      </p>
                    </div>
                    <Link
                      to="/tentang"
                      className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
                    >
                      Buka Halaman Tentang
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                        2. Halaman Panduan &amp; Galeri Ekosistem (/edukasi)
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Memuat artikel mendalam dan dokumentasi visual lapisan
                        ekosistem hutan Indonesia.
                      </p>
                    </div>
                    <Link
                      to="/edukasi"
                      className="inline-flex min-h-11 shrink-0 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
                    >
                      Buka Panduan &amp; Galeri
                    </Link>
                  </div>
                </div>

                <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                        3. Halaman Komitmen &amp; Kontak (/kontak)
                      </h3>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Formulir interaktif pengiriman pesan/komitmen aksi hijau
                        serta kanal narahubung tim.
                      </p>
                    </div>
                    <Link
                      to="/kontak"
                      className="inline-flex min-h-11 shrink-0 items-center rounded-md bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] hover:opacity-90"
                    >
                      Buka Formulir Kontak
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
