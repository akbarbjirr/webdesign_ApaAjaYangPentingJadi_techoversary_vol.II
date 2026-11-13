import { Link } from 'react-router'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-md space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded border border-[var(--border-strong)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-xs font-semibold">
                [LOGO]
              </span>
              <span className="font-display text-lg font-bold">Rimbawara</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Portal edukasi cara menjaga hutan untuk kompetisi Web Design
              TECHNOVERSARY VOL. II (HIMA-TI FKOM UNIKU). Draf halaman utama ini
              menyiapkan arsitektur interaktif sambil menunggu desain visual
              final tim.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              Beranda
            </Link>
            <Link
              to="/tentang"
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              Tentang &amp; Tim
            </Link>
            <Link
              to="/edukasi"
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              Panduan &amp; Galeri
            </Link>
            <Link
              to="/kontak"
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              Komitmen &amp; Kontak
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-secondary)]">
          <p>
            Sub-tema: Edukasi &amp; Portal Lingkungan. Dibangun dengan React,
            TypeScript, Tailwind CSS v4, GSAP, dan Lenis.
          </p>
        </div>
      </div>
    </footer>
  )
}
