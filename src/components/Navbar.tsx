import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { ArrowRight, List, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/hutan', label: 'Hutan' },
  { to: '/satwa', label: 'Satwa' },
  { to: '/contact', label: 'Contact' },
] as const

export function Navbar() {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:rounded-md focus:bg-neutral-950 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Langsung ke konten utama
      </a>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-12">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="inline-flex min-h-11 items-center rounded-md px-1 py-1 text-xl font-bold tracking-tight text-neutral-950 transition-opacity hover:opacity-80 active:opacity-70"
        >
          Under
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <nav aria-label="Navigasi utama" className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'inline-flex min-h-11 items-center px-2 text-sm transition-colors',
                    isActive
                      ? 'font-bold text-neutral-950'
                      : 'font-medium text-neutral-700 hover:text-neutral-950',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/quiz"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-neutral-950 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 active:scale-[0.99]"
          >
            <span>Quiz</span>
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="menu-navigasi-mobile"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-100 active:scale-[0.98] md:hidden"
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

      {mobileOpen && (
        <nav
          id="menu-navigasi-mobile"
          aria-label="Navigasi seluler"
          className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center rounded-lg px-4 py-2.5 text-base transition-colors',
                      isActive
                        ? 'bg-neutral-100 font-bold text-neutral-950'
                        : 'font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/quiz"
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <span>Quiz</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
