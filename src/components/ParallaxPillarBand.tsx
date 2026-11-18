import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SplitText } from '@/components/SplitText'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface ParallaxBandItem {
  id: string
  title: string
  description: string
  image: string
  alt: string
}

interface ParallaxPillarBandProps {
  item: ParallaxBandItem
  titleClassName?: string
  descriptionClassName?: string
}

export function ParallaxPillarBand({
  item,
  titleClassName = 'text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-[5.5rem]',
  descriptionClassName = 'max-w-lg text-sm leading-relaxed text-white/95 sm:text-base',
}: ParallaxPillarBandProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const titleParallaxRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const trigger = sectionRef.current
      const media = mediaRef.current
      const titleParallax = titleParallaxRef.current
      if (!trigger || !media || !titleParallax) return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) {
        gsap.set([media, titleParallax], { yPercent: 0, y: 0 })
        return
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          media,
          { yPercent: -25, force3D: true },
          { yPercent: 25, ease: 'none', force3D: true },
          0,
        )
        .fromTo(
          titleParallax,
          { y: -60, force3D: true },
          { y: 60, ease: 'none', force3D: true },
          0,
        )
    },
    { scope: sectionRef },
  )

  return (
    <article
      ref={sectionRef}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-neutral-950"
    >
      <div
        ref={mediaRef}
        className="pointer-events-none absolute inset-x-0 top-[-6%] h-[112%] w-full will-change-transform"
      >
        <img
          src={item.image}
          alt={item.alt}
          width={1600}
          height={1067}
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-[1.05] object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/25"
      />

      <div
        ref={titleParallaxRef}
        className="relative z-10 px-4 text-center will-change-transform sm:px-6 lg:px-8"
      >
        <SplitText
          as="h2"
          text={item.title}
          splitBy="chars"
          yOffset={40}
          duration={0.8}
          stagger={0.055}
          threshold={0.18}
          className={titleClassName}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8">
        <div className="w-full px-5 sm:px-8 lg:px-10">
          <SplitText
            as="p"
            text={item.description}
            splitBy="words"
            yOffset={20}
            duration={0.65}
            stagger={0.025}
            delay={0.12}
            threshold={0.05}
            className={descriptionClassName}
          />
        </div>
      </div>
    </article>
  )
}
