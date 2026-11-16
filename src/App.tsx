import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { EdukasiPage } from '@/pages/EdukasiPage'
import { SatwaPage } from '@/pages/SatwaPage'
import { ContactPage } from '@/pages/ContactPage'
import { QuizPage } from '@/pages/QuizPage'

gsap.registerPlugin(ScrollTrigger, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })

function App() {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      anchors: true,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
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
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target)
        } else {
          target.scrollIntoView()
        }
      }
    } else if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    const rafId = requestAnimationFrame(() => {
      lenisRef.current?.resize()
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(rafId)
  }, [pathname, hash])

  const isQuizRoute = pathname === '/quiz'

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-950">
      {!isQuizRoute && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tentang" element={<AboutPage />} />
          <Route path="/hutan" element={<EdukasiPage />} />
          <Route path="/edukasi" element={<EdukasiPage />} />
          <Route path="/satwa" element={<SatwaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      {!isQuizRoute && <Footer />}
    </div>
  )
}

export default App
