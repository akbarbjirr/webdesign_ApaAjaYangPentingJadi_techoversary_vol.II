import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type SplitTextTag = 'h1' | 'h2' | 'h3' | 'p' | 'div'

export interface SplitTextProps {
  text: string
  as?: SplitTextTag
  splitBy?: 'chars' | 'words'
  duration?: number
  stagger?: number
  delay?: number
  yOffset?: number
  threshold?: number
  ease?: string
  className?: string
}

export function SplitText({
  text,
  as = 'p',
  splitBy = 'chars',
  duration = 0.75,
  stagger = 0.035,
  delay = 0,
  yOffset = 32,
  threshold = 0.15,
  ease = 'power3.out',
  className = '',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      const el = container?.firstElementChild
      if (!container || !(el instanceof HTMLElement)) return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1 })
        return
      }

      const split = new SplitType(el, {
        types: splitBy === 'chars' ? 'words,chars' : 'words',
        tagName: 'span',
      })

      const words = split.words ?? []
      words.forEach((word) => {
        word.style.display = 'inline-block'
        word.setAttribute('aria-hidden', 'true')
      })

      const targets =
        splitBy === 'chars' ? (split.chars ?? []) : (split.words ?? [])
      if (targets.length === 0) return

      targets.forEach((item) => {
        item.style.display = 'inline-block'
      })

      const startPct = (1 - threshold) * 100

      gsap.set(targets, {
        y: yOffset,
        opacity: 0,
      })

      const tween = gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease,
        paused: true,
      })

      const st = ScrollTrigger.create({
        trigger: container,
        start: `top ${startPct}%`,
        once: true,
        onEnter: () => tween.play(),
      })

      return () => {
        st.kill()
        tween.kill()
        split.revert()
      }
    },
    {
      scope: containerRef,
      dependencies: [
        text,
        splitBy,
        duration,
        stagger,
        delay,
        yOffset,
        threshold,
        ease,
      ],
      revertOnUpdate: true,
    },
  )

  const Tag = as

  return (
    <div ref={containerRef}>
      <Tag aria-label={text} className={className}>
        {text}
      </Tag>
    </div>
  )
}
