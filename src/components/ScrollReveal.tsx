import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

type ScrollRevealTag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

export interface ScrollRevealProps {
  children: string
  as?: ScrollRevealTag
  id?: string
  className?: string
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
}

export function ScrollReveal({
  children,
  as = 'h2',
  id,
  className = '',
  baseOpacity = 0.15,
  baseRotation = 2.5,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const setElementRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node
  }, [])

  useEffect(() => {
    const el = elementRef.current
    if (!el || isRevealed) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isRevealed])

  const Tag = as
  const parsedLines = children
    .split('\n')
    .reduce<
      Array<{ tokens: Array<{ value: string; wordIndex: number | null }> }>
    >((acc, line) => {
      const prevTotal = acc.reduce(
        (sum, item) =>
          sum + item.tokens.filter((t) => t.wordIndex !== null).length,
        0,
      )
      let currentIdx = prevTotal
      const tokens = line
        .split(/(\s+)/)
        .filter(Boolean)
        .map((token) =>
          /^\s+$/.test(token)
            ? { value: token, wordIndex: null }
            : { value: token, wordIndex: currentIdx++ },
        )
      acc.push({ tokens })
      return acc
    }, [])

  return (
    <Tag
      ref={setElementRef}
      id={id}
      className={className}
      style={{
        transform: isRevealed ? 'rotate(0deg)' : `rotate(${baseRotation}deg)`,
        transformOrigin: '0% 50%',
        transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {parsedLines.map((line, lineIdx) => (
        <Fragment key={`line-${lineIdx}`}>
          {lineIdx > 0 && <br />}
          {line.tokens.map((token, tokenIdx) => {
            if (token.wordIndex === null) {
              return (
                <Fragment key={`space-${lineIdx}-${tokenIdx}`}>
                  {token.value}
                </Fragment>
              )
            }
            const wordDelay = `${token.wordIndex * 0.03}s`
            return (
              <span
                key={`word-${lineIdx}-${tokenIdx}`}
                className="inline-block"
                style={{
                  opacity: isRevealed ? 1 : baseOpacity,
                  transform: isRevealed
                    ? 'translate3d(0, 0, 0)'
                    : 'translate3d(0, 12px, 0)',
                  transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${wordDelay}, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${wordDelay}`,
                }}
              >
                {token.value}
              </span>
            )
          })}
        </Fragment>
      ))}
    </Tag>
  )
}
