import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

export interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  className?: string
  style?: CSSProperties
}

export function AnimatedContent({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
  style,
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || isRevealed) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isRevealed, threshold])

  const offset = reverse ? -distance : distance
  const initialTransform =
    direction === 'horizontal'
      ? `translate3d(${offset}px, 0, 0) scale(${scale})`
      : `translate3d(0, ${offset}px, 0) scale(${scale})`

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isRevealed ? 1 : animateOpacity ? initialOpacity : 1,
        transform: isRevealed
          ? 'translate3d(0, 0, 0) scale(1)'
          : initialTransform,
        transition: `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
