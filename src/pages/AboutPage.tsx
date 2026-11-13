import { Link } from 'react-router'

export function AboutPage() {
  return (
    <main id="konten-utama" className="min-h-screen py-12 sm:py-16">
      <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 border-b border-[var(--border-strong)] pb-6">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Tentang Rimbawara &amp; Identitas Tim
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
            Halaman wajib About untuk kompetisi Web Design TECHNOVERSARY VOL. II
            dengan fokus edukasi pelestarian hutan.
          </p>
        </div>

        <section className="space-y-3 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6">
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
            Tujuan Portal Edukasi
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-primary)]">
            Rimbawara merangkum panduan praktis menjaga ekosistem hutan dari
            ancaman kebakaran lahan gambut, konsumsi serat kayu berlebih, hingga
            etika kunjungan alam agar mudah dipahami oleh pelajar dan masyarakat
            umum.
          </p>
        </section>

        <section className="space-y-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6">
          <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
            Struktur Tim Peserta [PLACEHOLDER DATA TIM]
          </h2>
          <p className="font-mono text-xs text-[var(--text-secondary)]">
            Isi slot di bawah ini sesuai nama anggota tim sebelum pengumpulan
            repositori:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((slot) => (
              <div
                key={slot}
                className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-4"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-primary)] font-mono text-xs font-bold">
                  A0{slot}
                </div>
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  [NAMA ANGGOTA {slot}]
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--text-secondary)]">
                  [PERAN DALAM TIM]
                </p>
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
