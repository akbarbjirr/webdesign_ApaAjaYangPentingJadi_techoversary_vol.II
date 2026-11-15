import { Link } from 'react-router'

const FOOTER_NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/hutan', label: 'Hutan' },
  { to: '/satwa', label: 'Satwa' },
  { to: '/contact', label: 'Contact' },
] as const

export function Footer() {
  return (
    <footer className="bg-white text-neutral-950">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-t-[28px] border border-b-0 border-neutral-300 bg-white px-6 pt-10 pb-0 sm:px-12 sm:pt-12">
          <div className="relative z-10 flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
            <p className="text-base font-bold tracking-tight text-neutral-950 sm:text-lg">
              Hutan adalah Rumah, Mari Kita Jaga.
            </p>

            <div className="flex gap-12 sm:gap-16">
              <div>
                <h2 className="text-sm font-bold text-neutral-950">
                  Navigation
                </h2>
                <ul className="mt-3 flex flex-col gap-0.5">
                  {FOOTER_NAV_LINKS.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="inline-flex min-h-11 items-center text-xs font-medium text-neutral-700 transition-colors hover:text-neutral-950 sm:min-h-8"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-bold text-neutral-950">Chalange</h2>
                <ul className="mt-3 flex flex-col gap-0.5">
                  <li>
                    <Link
                      to="/quiz"
                      className="inline-flex min-h-11 items-center text-xs font-medium text-neutral-700 transition-colors hover:text-neutral-950 sm:min-h-8"
                    >
                      Quiz
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none -mt-2 flex justify-center overflow-hidden leading-none select-none sm:-mt-6"
          >
            <span className="translate-y-[16%] text-[24vw] leading-[0.8] font-bold tracking-tighter text-neutral-200/90 sm:text-[13.5rem] lg:text-[17.5rem]">
              Under
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
