import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { ArrowRight, CaretDown, List, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface NavChild {
  to: string
  label: string
}

interface NavItem {
  to: string
  label: string
  children?: NavChild[]
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/hutan', label: 'Hutan' },
  { to: '/satwa', label: 'Satwa' },
  {
    to: '/sampah',
    label: 'Sampah',
    children: [
      { to: '/sampah/reduce', label: 'Reduce' },
      { to: '/sampah/reuse', label: 'Reuse' },
      { to: '/sampah/recycle', label: 'Recycle' },
    ],
  },
  { to: '/contact', label: 'Contact' },
]

function navUnderlineClass(isActive: boolean) {
  return cn(
    'relative after:absolute after:inset-x-0 after:-bottom-1 after:h-[1.5px] after:origin-left after:bg-neutral-950 after:transition-transform after:duration-300 after:ease-out',
    isActive
      ? 'after:scale-x-100'
      : 'after:scale-x-0 group-hover:after:scale-x-100',
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sampahOpen, setSampahOpen] = useState(false)
  const [mobileSampahOpen, setMobileSampahOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mobileOpen && !sampahOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setSampahOpen(false)
      }
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (
        sampahOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSampahOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [mobileOpen, sampahOpen])

  const closeAllMenus = () => {
    setMobileOpen(false)
    setSampahOpen(false)
    setMobileSampahOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white">
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:rounded-md focus:bg-neutral-950 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Langsung ke konten utama
      </a>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-12">
        <Link
          to="/"
          onClick={closeAllMenus}
          className="inline-flex min-h-11 items-center rounded-md px-1 py-1 text-xl font-bold tracking-tight text-neutral-950 transition-opacity hover:opacity-80 active:opacity-70"
        >
          Under
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <nav aria-label="Navigasi utama" className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                const isGroupActive = pathname.startsWith(item.to)
                return (
                  <div
                    key={item.to}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setSampahOpen(true)}
                    onMouseLeave={() => setSampahOpen(false)}
                    onFocusCapture={() => setSampahOpen(true)}
                    onBlurCapture={(e) => {
                      if (
                        !e.currentTarget.contains(
                          e.relatedTarget as Node | null,
                        )
                      ) {
                        setSampahOpen(false)
                      }
                    }}
                  >
                    <div className="inline-flex min-h-11 items-center gap-0.5 px-2">
                      <NavLink
                        to={item.to}
                        onClick={() => setSampahOpen(false)}
                        className={cn(
                          'group inline-flex min-h-11 items-center text-sm transition-colors',
                          isGroupActive
                            ? 'font-bold text-neutral-950'
                            : 'font-normal text-neutral-600 hover:text-neutral-950',
                        )}
                      >
                        <span className={navUnderlineClass(isGroupActive)}>
                          {item.label}
                        </span>
                      </NavLink>
                      <button
                        type="button"
                        onClick={() => setSampahOpen((prev) => !prev)}
                        aria-expanded={sampahOpen}
                        aria-haspopup="menu"
                        aria-label={`Buka submenu ${item.label}`}
                        className={cn(
                          'inline-flex min-h-11 items-center px-1 transition-colors',
                          isGroupActive
                            ? 'text-neutral-950'
                            : 'text-neutral-600 hover:text-neutral-950',
                        )}
                      >
                        <CaretDown
                          size={15}
                          weight="light"
                          aria-hidden="true"
                          className={cn(
                            'mt-0.5 transition-transform duration-200',
                            sampahOpen && 'rotate-180',
                          )}
                        />
                      </button>
                    </div>

                    <div
                      role="menu"
                      aria-label={`Submenu ${item.label}`}
                      className={cn(
                        'absolute top-full left-0 z-50 origin-top pt-2 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none',
                        sampahOpen
                          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                          : 'pointer-events-none translate-y-1 scale-[0.97] opacity-0',
                      )}
                    >
                      <ul className="flex min-w-[180px] flex-col gap-0.5 rounded-2xl bg-white p-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.1)] ring-1 ring-black/5 [&:focus-within>:not(:focus-within)]:text-neutral-400 [&:hover>:not(:hover)]:text-neutral-400">
                        {item.children.map((child, index) => {
                          const itemDelay = Math.min(index * 70, 560)
                          return (
                            <li
                              key={child.to}
                              role="none"
                              className="text-neutral-800 transition-[opacity,transform,color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
                              style={{
                                opacity: sampahOpen ? 1 : 0,
                                transform: sampahOpen
                                  ? 'translate3d(0, 0, 0) scale(1)'
                                  : 'translate3d(0, 8px, 0) scale(0.97)',
                                transitionDelay: sampahOpen
                                  ? `${itemDelay}ms, ${itemDelay}ms, 0ms`
                                  : '0ms',
                              }}
                            >
                              <NavLink
                                to={child.to}
                                role="menuitem"
                                tabIndex={sampahOpen ? 0 : -1}
                                onClick={() => setSampahOpen(false)}
                                className={({ isActive }) =>
                                  cn(
                                    'flex w-full items-center rounded-xl px-4 py-2.5 text-sm transition-colors duration-200 ease-out',
                                    isActive
                                      ? 'bg-neutral-100 font-medium text-neutral-950'
                                      : 'font-normal text-current hover:bg-neutral-100/90 hover:text-neutral-950 focus-visible:bg-neutral-100/90 focus-visible:text-neutral-950',
                                  )
                                }
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'group inline-flex min-h-11 items-center gap-1.5 px-2 text-sm transition-colors',
                      isActive
                        ? 'font-bold text-neutral-950'
                        : 'font-normal text-neutral-600 hover:text-neutral-950',
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className={navUnderlineClass(isActive)}>
                      {item.label}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>

          <Link
            to="/quiz"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-neutral-950 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 active:scale-[0.99]"
          >
            <span>Quiz</span>
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-rotate-45"
            />
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
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                const isGroupActive = pathname.startsWith(item.to)
                return (
                  <li key={item.to}>
                    <button
                      type="button"
                      onClick={() => setMobileSampahOpen((prev) => !prev)}
                      aria-expanded={mobileSampahOpen}
                      className={cn(
                        'group flex min-h-11 w-full items-center justify-between rounded-lg px-4 py-2.5 text-base transition-colors',
                        isGroupActive
                          ? 'bg-neutral-100 font-bold text-neutral-950'
                          : 'font-normal text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950',
                      )}
                    >
                      <span className={navUnderlineClass(isGroupActive)}>
                        {item.label}
                      </span>
                      <CaretDown
                        size={15}
                        weight="light"
                        aria-hidden="true"
                        className={cn(
                          'transition-transform duration-200',
                          mobileSampahOpen && 'rotate-180',
                        )}
                      />
                    </button>

                    <div
                      aria-hidden={!mobileSampahOpen}
                      className={cn(
                        'grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none',
                        mobileSampahOpen
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]',
                      )}
                    >
                      <div className="overflow-hidden">
                        <ul className="mt-1 ml-4 flex flex-col gap-1 border-l border-neutral-200 pl-3 [&:focus-within>:not(:focus-within)]:text-neutral-400 [&:hover>:not(:hover)]:text-neutral-400">
                          {item.children.map((child, index) => {
                            const itemDelay = Math.min(index * 70, 560)
                            return (
                              <li
                                key={child.to}
                                className="text-neutral-800 transition-[opacity,transform,color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
                                style={{
                                  opacity: mobileSampahOpen ? 1 : 0,
                                  transform: mobileSampahOpen
                                    ? 'translate3d(0, 0, 0) scale(1)'
                                    : 'translate3d(0, 8px, 0) scale(0.97)',
                                  transitionDelay: mobileSampahOpen
                                    ? `${itemDelay}ms, ${itemDelay}ms, 0ms`
                                    : '0ms',
                                }}
                              >
                                <NavLink
                                  to={child.to}
                                  tabIndex={mobileSampahOpen ? 0 : -1}
                                  onClick={closeAllMenus}
                                  className={({ isActive }) =>
                                    cn(
                                      'flex min-h-11 items-center rounded-xl px-4 py-2 text-sm transition-colors duration-200 ease-out',
                                      isActive
                                        ? 'bg-neutral-100 font-medium text-neutral-950'
                                        : 'font-normal text-current hover:bg-neutral-100/90 hover:text-neutral-950 focus-visible:bg-neutral-100/90 focus-visible:text-neutral-950',
                                    )
                                  }
                                >
                                  {child.label}
                                </NavLink>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={closeAllMenus}
                    className={({ isActive }) =>
                      cn(
                        'group flex min-h-11 items-center gap-1.5 rounded-lg px-4 py-2.5 text-base transition-colors',
                        isActive
                          ? 'bg-neutral-100 font-bold text-neutral-950'
                          : 'font-normal text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <span className={navUnderlineClass(isActive)}>
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                </li>
              )
            })}
            <li className="pt-2">
              <Link
                to="/quiz"
                onClick={closeAllMenus}
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <span>Quiz</span>
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-rotate-45"
                />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
