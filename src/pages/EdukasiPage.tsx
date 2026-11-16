import { Link } from 'react-router'
import { AnimatedContent } from '@/components/AnimatedContent'
import { ScrollReveal } from '@/components/ScrollReveal'
import { CANOPY_STRATA, FIELD_PROTOCOLS } from '@/data/forestData'

export function EdukasiPage() {
  return (
    <main id="konten-utama" className="min-h-screen py-12 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 border-b border-[var(--border-strong)] pb-6">
          <ScrollReveal
            as="h1"
            className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl"
          >
            Arsip Panduan &amp; Dokumentasi Lapisan Hutan
          </ScrollReveal>
          <AnimatedContent distance={8} duration={0.65} threshold={0.1}>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Ringkasan materi edukasi dan referensi lapisan tajuk hutan yang
              siap dikembangkan mengikuti desain final tim.
            </p>
          </AnimatedContent>
        </div>

        <section className="space-y-4">
          <ScrollReveal
            as="h2"
            className="font-display text-2xl font-bold text-[var(--text-primary)]"
          >
            Ringkasan Empat Strata Hutan Hujan Tropis
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {CANOPY_STRATA.map((stratum) => (
              <article
                key={stratum.id}
                className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-5"
              >
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  {stratum.code} ({stratum.elevationLabel})
                </span>
                <ScrollReveal
                  as="h3"
                  className="mt-1 font-display text-lg font-bold text-[var(--text-primary)]"
                >
                  {stratum.name}
                </ScrollReveal>
                <AnimatedContent distance={8} duration={0.65} threshold={0.1}>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
                    {stratum.ecologicalRole}
                  </p>
                  <p className="mt-2 border-t border-[var(--border-subtle)] pt-2 text-xs text-[var(--text-secondary)]">
                    <strong>Aksi pelestarian:</strong> {stratum.citizenAction}
                  </p>
                </AnimatedContent>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <ScrollReveal
            as="h2"
            className="font-display text-2xl font-bold text-[var(--text-primary)]"
          >
            {`Indeks Protokol Pelestarian (${FIELD_PROTOCOLS.length} Panduan)`}
          </ScrollReveal>
          <div className="divide-y divide-[var(--border-strong)] rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
            {FIELD_PROTOCOLS.map((item) => (
              <div key={item.id} className="p-5">
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                  {item.code} / {item.category}
                </span>
                <ScrollReveal
                  as="h3"
                  className="mt-1 font-display text-lg font-bold text-[var(--text-primary)]"
                >
                  {item.title}
                </ScrollReveal>
                <AnimatedContent distance={8} duration={0.65} threshold={0.1}>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {item.summary}
                  </p>
                </AnimatedContent>
              </div>
            ))}
          </div>
        </section>

        <div>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center rounded-md bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)]"
          >
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </main>
  )
}
