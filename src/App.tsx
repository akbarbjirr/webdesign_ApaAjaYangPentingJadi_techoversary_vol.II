import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import AOS from 'aos'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HomePage } from '@/pages/HomePage'

const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const EdukasiPage = lazy(() =>
  import('@/pages/EdukasiPage').then((m) => ({ default: m.EdukasiPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  const { pathname } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('rimbawara_theme')
      return saved === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('rimbawara_theme', theme)
    } catch {
      // Ignore storage quota errors in restricted browsing modes.
    }
  }, [theme])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    AOS.init({
      duration: prefersReducedMotion ? 0 : 700,
      once: true,
      disable: prefersReducedMotion,
    })

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      autoRaf: false,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    AOS.refresh()
    ScrollTrigger.refresh()
  }, [pathname])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <div className="flex-1">
        <Suspense
          fallback={
            <div
              role="status"
              aria-live="polite"
              className="mx-auto max-w-7xl px-4 py-16 font-mono text-sm text-[var(--text-secondary)] sm:px-6 lg:px-8"
            >
              Memuat halaman...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/edukasi" element={<EdukasiPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

export default App
