import { Link } from 'react-router'

interface FooterColumn {
  heading: string
  links: Array<{ to: string; label: string }>
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Halaman Utama',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Edukasi',
    links: [
      { to: '/sampah', label: 'Sampah' },
      { to: '/satwa', label: 'Satwa' },
      { to: '/hutan', label: 'Hutan' },
    ],
  },
  {
    heading: 'Challenge',
    links: [{ to: '/quiz', label: 'Kuis' }],
  },
]

export function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-white pt-16 text-neutral-950 sm:pt-24">
      <div className="mx-auto max-w-350 px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <p className="text-lg font-bold tracking-tight text-neutral-950 sm:text-xl lg:text-2xl">
            Hutan adalah Rumah, Mari Kita Jaga.
          </p>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-14 lg:gap-20">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h2 className="text-base font-bold text-neutral-950 sm:text-lg">
                  {column.heading}
                </h2>
                <ul className="mt-2.5 flex flex-col gap-1">
                  {column.links.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="inline-flex items-center py-0.5 text-xs font-medium text-neutral-700 transition-colors hover:text-neutral-950 sm:text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mt-20 flex w-full justify-center overflow-hidden leading-none select-none sm:mt-28 lg:mt-36"
      >
        <span className="translate-y-[18%] text-[25.5vw] leading-[0.78] font-bold tracking-[-0.04em] text-neutral-200/80">
          Under
        </span>
      </div>
    </footer>
  )
}
