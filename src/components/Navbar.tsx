import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { List, Moon, Sun, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const NAV_ITEMS = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang & Tim' },
  { to: '/edukasi', label: 'Panduan & Galeri' },
  { to: '/kontak', label: 'Komitmen & Kontak' },
]

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-strong)] bg-[var(--bg-primary)]">
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2 focus:font-semibold focus:text-[var(--accent-contrast)]"
      >
        Langsung ke konten utama
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-md px-1 py-1 text-[var(--text-primary)] transition-opacity hover:opacity-85 active:opacity-75"
        >
          <span className="rounded border border-[var(--border-strong)] bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--text-primary)]">
            [LOGO]
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Rimbawara
          </span>
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-2 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'inline-flex min-h-11 items-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--accent-primary)] font-semibold text-[var(--accent-contrast)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)] active:bg-[var(--border-subtle)]/30',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'light'
                ? 'Aktifkan mode gelap (Rimba Malam)'
                : 'Aktifkan mode terang (Kanopi Siang)'
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-elevated)] active:scale-[0.98]"
          >
            {theme === 'light' ? (
              <>
                <Moon size={18} weight="bold" aria-hidden="true" />
                <span className="hidden sm:inline">Rimba Malam</span>
              </>
            ) : (
              <>
                <Sun size={18} weight="bold" aria-hidden="true" />
                <span className="hidden sm:inline">Kanopi Siang</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="menu-navigasi-mobile"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-elevated)] active:scale-[0.98] md:hidden"
          >
            {mobileOpen ? (
              <>
                <X size={18} weight="bold" aria-hidden="true" />
                <span>Tutup</span>
              </>
            ) : (
              <>
                <List size={18} weight="bold" aria-hidden="true" />
                <span>Menu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="menu-navigasi-mobile"
          aria-label="Navigasi seluler"
          className="border-t border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center rounded-md px-4 py-2.5 text-base font-medium transition-colors',
                      isActive
                        ? 'bg-[var(--accent-primary)] font-semibold text-[var(--accent-contrast)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
