import { Link } from 'react-router'
import { ArrowRight, type Icon } from '@phosphor-icons/react'
import { AnimatedContent } from '@/components/AnimatedContent'
import {
  ParallaxPillarBand,
  type ParallaxBandItem,
} from '@/components/ParallaxPillarBand'
import { ScrollReveal } from '@/components/ScrollReveal'

export interface PrincipleReason {
  id: string
  title: string
  description: string
  Icon: Icon
}

export interface SimplePrincipleTip {
  number: string
  title: string
  description: string
  image: string
  alt: string
}

export interface SampahPrincipleContent {
  breadcrumbLabel: string
  heroTitle: string
  heroIntro: string
  definitionTerm: string
  definitionBody: string
  whyImage: string
  whyImageAlt: string
  whyHeading: string
  whyIntro: string
  reasons: readonly PrincipleReason[]
  parallaxLabel: string
  parallaxBands: readonly ParallaxBandItem[]
  tipsHeading: string
  tipsIntro: string
  tips: readonly SimplePrincipleTip[]
  ctaEyebrow: string
  ctaHeading: string
  nextCta: {
    label: string
    to: string
  }
}

export function SampahPrincipleLayout({
  content,
}: {
  content: SampahPrincipleContent
}) {
  return (
    <main id="konten-utama" className="min-h-screen bg-white">
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-10 sm:mb-14">
            <ol className="flex items-center gap-2 text-xs text-neutral-500 sm:text-sm">
              <li>
                <Link
                  to="/sampah"
                  className="transition-colors hover:text-neutral-950"
                >
                  sampah
                </Link>
              </li>
              <li aria-hidden="true">—</li>
              <li aria-current="page" className="text-neutral-950">
                {content.breadcrumbLabel}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
            <div className="md:col-span-6 lg:col-span-5">
              <ScrollReveal
                as="h1"
                className="text-3xl leading-[1.18] font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.25rem]"
              >
                {content.heroTitle}
              </ScrollReveal>
            </div>

            <div className="space-y-6 md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7 lg:pt-2">
              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.08}
                threshold={0.02}
              >
                <p className="text-base leading-relaxed text-neutral-700 sm:text-lg lg:text-[1.2rem]">
                  {content.heroIntro}
                </p>
              </AnimatedContent>

              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.16}
                threshold={0.02}
              >
                <p className="text-base leading-relaxed text-neutral-700 sm:text-lg lg:text-[1.2rem]">
                  <strong className="font-semibold text-neutral-950">
                    {content.definitionTerm}
                  </strong>{' '}
                  {content.definitionBody}
                </p>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="principle-reasons-heading"
        className="pb-20 sm:pb-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
            <AnimatedContent
              distance={44}
              scale={0.97}
              duration={0.8}
              threshold={0.05}
              className="md:col-span-5"
            >
              <div className="photo-hover-frame overflow-hidden rounded-[24px] bg-neutral-100 sm:rounded-[28px]">
                <img
                  src={content.whyImage}
                  alt={content.whyImageAlt}
                  width={1100}
                  height={1300}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[5/6] h-auto w-full object-cover"
                />
              </div>
            </AnimatedContent>

            <div className="md:col-span-6 md:col-start-7 md:pt-4 lg:col-span-6 lg:col-start-7">
              <ScrollReveal
                as="h2"
                id="principle-reasons-heading"
                className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl"
              >
                {content.whyHeading}
              </ScrollReveal>

              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.08}
                threshold={0.1}
              >
                <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base lg:text-lg">
                  {content.whyIntro}
                </p>
              </AnimatedContent>

              <ul className="mt-8 space-y-7 sm:mt-10">
                {content.reasons.map((reason, index) => {
                  const ReasonIcon = reason.Icon
                  return (
                    <li key={reason.id} className="flex items-start gap-4">
                      <AnimatedContent
                        distance={16}
                        duration={0.6}
                        delay={index * 0.08}
                        threshold={0.1}
                        className="pt-1"
                      >
                        <ReasonIcon
                          size={22}
                          weight="regular"
                          aria-hidden="true"
                          className="text-neutral-950"
                        />
                      </AnimatedContent>
                      <div>
                        <ScrollReveal
                          as="h3"
                          className="text-sm font-semibold text-neutral-950 sm:text-base"
                        >
                          {reason.title}
                        </ScrollReveal>
                        <AnimatedContent
                          distance={8}
                          duration={0.65}
                          delay={index * 0.08}
                          threshold={0.1}
                        >
                          <p className="mt-1 max-w-sm text-sm leading-relaxed text-neutral-600 sm:text-base">
                            {reason.description}
                          </p>
                        </AnimatedContent>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={content.parallaxLabel}>
        {content.parallaxBands.map((item) => (
          <ParallaxPillarBand
            key={item.id}
            item={item}
            titleClassName="mx-auto max-w-4xl text-4xl leading-[1.12] font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.5rem]"
          />
        ))}
      </section>

      <section
        aria-labelledby="simple-principle-heading"
        className="py-16 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <ScrollReveal
              as="h2"
              id="simple-principle-heading"
              className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl"
            >
              {content.tipsHeading}
            </ScrollReveal>
            <AnimatedContent distance={8} duration={0.65} threshold={0.12}>
              <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg">
                {content.tipsIntro}
              </p>
            </AnimatedContent>
          </div>

          <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-12">
            {content.tips.map((tip, index) => (
              <div
                key={tip.number}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 lg:gap-12"
              >
                <div className="md:col-span-5">
                  <AnimatedContent
                    distance={8}
                    duration={0.65}
                    delay={index * 0.04}
                    threshold={0.12}
                  >
                    <span className="block text-2xl font-medium text-neutral-400 tabular-nums sm:text-3xl">
                      {tip.number}
                    </span>
                  </AnimatedContent>
                  <ScrollReveal
                    as="h3"
                    className="mt-2 text-2xl font-bold tracking-tight text-neutral-950 sm:text-[1.75rem] lg:text-[2rem]"
                  >
                    {tip.title}
                  </ScrollReveal>
                  <AnimatedContent
                    distance={8}
                    duration={0.65}
                    delay={index * 0.04}
                    threshold={0.12}
                  >
                    <p className="mt-3 max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
                      {tip.description}
                    </p>
                  </AnimatedContent>
                </div>

                <AnimatedContent
                  distance={36}
                  scale={0.97}
                  duration={0.75}
                  delay={0.08}
                  threshold={0.12}
                  className="md:col-span-6 md:col-start-7"
                >
                  <div className="photo-hover-card rounded-[20px] bg-neutral-100">
                    <img
                      src={tip.image}
                      alt={tip.alt}
                      width={720}
                      height={369}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/8.2] h-auto w-full object-cover"
                    />
                  </div>
                </AnimatedContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedContent distance={8} duration={0.65} threshold={0.15}>
            <p className="text-sm font-medium text-neutral-700 sm:text-base">
              {content.ctaEyebrow}
            </p>
          </AnimatedContent>
          <ScrollReveal
            as="h2"
            className="mt-3 text-2xl leading-[1.22] font-bold tracking-tight text-neutral-950 sm:text-4xl"
          >
            {content.ctaHeading}
          </ScrollReveal>
          <AnimatedContent
            distance={32}
            duration={0.75}
            delay={0.1}
            threshold={0.15}
            className="mt-8 flex justify-center"
          >
            <Link
              to={content.nextCta.to}
              className="group inline-flex min-h-12 items-center gap-6 rounded-full bg-neutral-950 py-2 pr-2.5 pl-8 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-900 active:scale-[0.99] sm:text-base"
            >
              <span>{content.nextCta.label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform duration-300 ease-out group-hover:translate-x-1.5 sm:h-9 sm:w-9">
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-rotate-45"
                />
              </span>
            </Link>
          </AnimatedContent>
        </div>
      </section>
    </main>
  )
}
