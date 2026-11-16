import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  GraduationCap,
  HandHeart,
  Plant,
} from '@phosphor-icons/react'
import { AnimatedContent } from '@/components/AnimatedContent'
import { ScrollReveal } from '@/components/ScrollReveal'
import { SplitText } from '@/components/SplitText'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface CampaignShowcaseBand {
  id: string
  title: string
  description: string
  image: string
  alt: string
}

const CAMPAIGN_SHOWCASE: CampaignShowcaseBand[] = [
  {
    id: 'hutan',
    title: 'HUTAN',
    description:
      'Hutan adalah penopang kehidupan dan rumah bagi berbagai spesies. Melindunginya berarti menjaga keseimbangan ekosistem dan masa depan alam.',
    image:
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1280&q=75',
    alt: 'Lembah hutan pinus dan padang rumput hijau dengan tebing batu bermandikan cahaya matahari',
  },
  {
    id: 'satwa',
    title: 'SATWA',
    description:
      'Setiap satwa memiliki peran dalam ekosistem. Perlindungan habitat dan penghentian perburuan ilegal menjadi bagian penting dalam menjaga keberlangsungan hidup mereka.',
    image:
      'https://images.unsplash.com/photo-1559569607-866e745bcf10?auto=format&fit=crop&w=1280&q=75',
    alt: 'Potret orangutan dengan pencahayaan hangat pada rambut oranyenya di latar gelap',
  },
  {
    id: 'sampah',
    title: 'Sampah',
    description:
      'Pengelolaan sampah merupakan tanggung jawab bersama. Kebiasaan sederhana seperti mengurangi, memilah, dan menggunakan kembali barang dapat membantu mengurangi pencemaran.',
    image:
      'https://images.unsplash.com/photo-1713016877596-6a800832e15c?auto=format&fit=crop&w=1280&q=75',
    alt: 'Tumpukan sampah plastik beraneka warna yang mencemari lingkungan',
  },
]

function ParallaxPillarBand({ item }: { item: CampaignShowcaseBand }) {
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
        className="pointer-events-none absolute inset-x-0 -top-[6%] h-[112%] w-full will-change-transform"
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
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/25"
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
          className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-[5.5rem]"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SplitText
            as="p"
            text={item.description}
            splitBy="words"
            yOffset={20}
            duration={0.65}
            stagger={0.025}
            delay={0.12}
            threshold={0.05}
            className="max-w-lg text-sm leading-relaxed text-white/95 sm:text-base"
          />
        </div>
      </div>
    </article>
  )
}

interface KnowledgeScatterPhoto {
  id: string
  alt: string
  src: string
  positionClass: string
  parallaxEnd: number
  revealDelay: number
}

const KNOWLEDGE_GALLERY: KnowledgeScatterPhoto[] = [
  {
    id: 'scatter-macaque',
    alt: 'Monyet hitam Sulawesi di habitat alami',
    src: 'https://images.unsplash.com/photo-1578013460946-7b3884b7831d?auto=format&fit=crop&w=520&q=75',
    positionClass:
      'lg:left-[3%] lg:top-[12%] lg:w-[175px] xl:w-[225px] 2xl:w-[260px] z-0',
    parallaxEnd: 170,
    revealDelay: 0,
  },
  {
    id: 'scatter-orangutan',
    alt: 'Orangutan bergelantungan di dahan pohon hutan hujan',
    src: 'https://images.unsplash.com/photo-1762301394169-af73f9553e74?auto=format&fit=crop&w=520&q=75',
    positionClass:
      'lg:left-[5%] lg:top-[27%] lg:w-[180px] xl:w-[235px] 2xl:w-[270px] z-10',
    parallaxEnd: 280,
    revealDelay: 0.08,
  },
  {
    id: 'scatter-canopy',
    alt: 'Hamparan tajuk hutan hujan tropis dari udara',
    src: 'https://images.unsplash.com/photo-1547033255-aa27399c1810?auto=format&fit=crop&w=520&q=75',
    positionClass:
      'lg:right-[7%] lg:top-[11%] lg:w-[175px] xl:w-[225px] 2xl:w-[260px] z-0',
    parallaxEnd: 180,
    revealDelay: 0.04,
  },
  {
    id: 'scatter-valley',
    alt: 'Pegunungan hijau berkabut diterangi cahaya matahari pagi',
    src: 'https://images.unsplash.com/photo-1475139195209-c6343f17842f?auto=format&fit=crop&w=520&q=75',
    positionClass:
      'lg:right-[2%] lg:top-[26%] lg:w-[180px] xl:w-[235px] 2xl:w-[270px] z-10',
    parallaxEnd: 295,
    revealDelay: 0.12,
  },
  {
    id: 'scatter-tiger',
    alt: 'Potret jarak dekat harimau sumatera di alam liar',
    src: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=520&q=75',
    positionClass:
      'lg:left-[17%] lg:bottom-[4%] lg:w-[180px] xl:w-[230px] 2xl:w-[265px] z-10',
    parallaxEnd: 250,
    revealDelay: 0,
  },
  {
    id: 'scatter-rhino',
    alt: 'Badak berdiri di padang rumput terbuka',
    src: 'https://images.unsplash.com/photo-1696894134345-abdb955875b2?auto=format&fit=crop&w=520&q=75',
    positionClass:
      'lg:right-[17%] lg:bottom-[5%] lg:w-[180px] xl:w-[230px] 2xl:w-[265px] z-10',
    parallaxEnd: 230,
    revealDelay: 0.08,
  },
]

function KnowledgeChangeSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const slots = gsap.utils.toArray<HTMLElement>('.knowledge-slot', section)
      const masks = gsap.utils.toArray<HTMLElement>(
        '.knowledge-height-mask',
        section,
      )
      const images = gsap.utils.toArray<HTMLElement>(
        '.knowledge-reveal-img',
        section,
      )
      const cards = gsap.utils.toArray<HTMLElement>(
        '.knowledge-parallax-card',
        section,
      )

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(masks, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(images, { scale: 1 })
        gsap.set(cards, { y: 0 })
        return
      }

      slots.forEach((slot) => {
        const mask = slot.querySelector<HTMLElement>('.knowledge-height-mask')
        const img = slot.querySelector<HTMLElement>('.knowledge-reveal-img')
        if (!mask || !img) return

        const delay = Number(slot.dataset.revealDelay ?? 0)

        gsap.fromTo(
          mask,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slot,
              start: 'top 85%',
              once: true,
            },
          },
        )

        gsap.fromTo(
          img,
          { scale: 1.18, force3D: true },
          {
            scale: 1,
            duration: 1.1,
            delay,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: slot,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      cards.forEach((card) => {
        const slot = card.closest<HTMLElement>('.knowledge-slot')
        const endY = Number(slot?.dataset.parallaxEnd ?? 220)

        parallaxTl.fromTo(
          card,
          { y: 40, force3D: true },
          { y: -endY, ease: 'none', force3D: true },
          0,
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="knowledge-change-heading"
      className="relative overflow-hidden bg-white"
    >
      <div className="relative mx-auto max-w-[1380px] px-4 py-20 sm:px-6 sm:py-24 lg:flex lg:min-h-[920px] lg:items-center lg:justify-center lg:py-36 xl:min-h-[1020px]">
        <div className="relative z-20 mx-auto max-w-md text-center lg:max-w-[460px] xl:max-w-[540px] 2xl:max-w-[580px]">
          <ScrollReveal
            as="h2"
            id="knowledge-change-heading"
            className="text-[2rem] leading-[1.14] font-bold tracking-[-0.025em] text-balance text-zinc-950 sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.15rem]"
          >
            Dari Pengetahuan Menuju Perubahan.
          </ScrollReveal>
          <AnimatedContent distance={8} duration={0.65} delay={0.08}>
            <p className="mx-auto mt-5 max-w-[46ch] text-base leading-[1.6] text-pretty text-zinc-600 sm:text-lg">
              Kami ingin menjadikan edukasi lingkungan sebagai langkah awal
              untuk membangun kebiasaan yang lebih bertanggung jawab terhadap
              alam.
            </p>
          </AnimatedContent>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-0 lg:contents">
          {KNOWLEDGE_GALLERY.map((photo) => (
            <div
              key={photo.id}
              data-parallax-end={photo.parallaxEnd}
              data-reveal-delay={photo.revealDelay}
              className={`knowledge-slot lg:absolute ${photo.positionClass}`}
            >
              <div className="knowledge-parallax-card will-change-transform">
                <div className="relative aspect-[16/10] w-full">
                  <div className="knowledge-height-mask absolute inset-0 h-full w-full overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="knowledge-reveal-img h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface CampaignPillar {
  id: string
  icon: typeof GraduationCap
  title: string
  description: string
}

const CAMPAIGN_PILLARS: CampaignPillar[] = [
  {
    id: 'edukasi',
    icon: GraduationCap,
    title: 'Edukasi',
    description: 'Memberikan informasi lingkungan yang mudah dipahami.',
  },
  {
    id: 'kepedulian',
    icon: HandHeart,
    title: 'Kepedulian',
    description: 'Membangun kesadaran untuk menjaga alam.',
  },
  {
    id: 'aksi',
    icon: Plant,
    title: 'Aksi',
    description: 'Mengajak masyarakat melakukan perubahan.',
  },
]

interface WildlifeMarqueeItem {
  id: string
  image: string
  alt: string
}

const WILDLIFE_GALLERY: WildlifeMarqueeItem[] = [
  {
    id: 'owl-flight',
    image:
      'https://images.unsplash.com/photo-1792942204448-775ef17baa7b?auto=format&fit=crop&w=600&q=75',
    alt: 'Burung hantu elang terbang membentangkan sayap di alam terbuka',
  },
  {
    id: 'eagle-mist',
    image:
      'https://images.unsplash.com/photo-1485488448524-23e9ea0a94cd?auto=format&fit=crop&w=600&q=75',
    alt: 'Elang botak terbang melintasi latar langit gelap berkabut',
  },
  {
    id: 'orangutan-canopy',
    image:
      'https://images.unsplash.com/photo-1762301394169-af73f9553e74?auto=format&fit=crop&w=600&q=75',
    alt: 'Orangutan bergelantungan di dahan pohon kawasan hutan alami',
  },
  {
    id: 'rhino-trail',
    image:
      'https://images.unsplash.com/photo-1696894134345-abdb955875b2?auto=format&fit=crop&w=600&q=75',
    alt: 'Badak berjalan di jalur habitat alaminya saat senja',
  },
  {
    id: 'tiger-forest',
    image:
      'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&w=600&q=75',
    alt: 'Harimau beristirahat di habitat hutan alaminya',
  },
  {
    id: 'elephant-wild',
    image:
      'https://images.unsplash.com/photo-1597487389339-5591e52de66f?auto=format&fit=crop&w=600&q=75',
    alt: 'Gajah Asia melangkah di kawasan vegetasi terbuka',
  },
]

function MarqueeCardList({ decorative = false }: { decorative?: boolean }) {
  return (
    <ul
      aria-hidden={decorative || undefined}
      className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
    >
      {WILDLIFE_GALLERY.map((item) => (
        <li
          key={decorative ? `${item.id}-dup` : item.id}
          className="group aspect-square w-[240px] shrink-0 overflow-hidden rounded-[20px] bg-neutral-100 sm:w-[300px] lg:w-[340px]"
        >
          <img
            src={item.image}
            alt={decorative ? '' : item.alt}
            width={340}
            height={340}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </li>
      ))}
    </ul>
  )
}

export function AboutPage() {
  const marqueeViewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = marqueeViewportRef.current
    if (!viewport) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          viewport.dataset.inView = entry.isIntersecting ? 'true' : 'false'
        }
      },
      { threshold: 0 },
    )

    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  return (
    <main id="konten-utama" className="bg-white">
      <section className="pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal
            as="h1"
            className="max-w-3xl text-3xl leading-[1.18] font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.25rem]"
          >
            {'Tentang Kami, Tentang Bumi,\ndan Masa Depannya.'}
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 sm:mt-14 md:mt-20 md:grid-cols-12 lg:mt-24">
            <AnimatedContent
              distance={8}
              duration={0.65}
              delay={0.08}
              threshold={0.02}
              className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-7"
            >
              <p className="text-base leading-relaxed text-neutral-700 sm:text-lg lg:text-[1.25rem]">
                Sebuah kampanye untuk mengajak lebih banyak orang memahami,
                peduli, dan mengambil tindakan nyata dalam menjaga lingkungan.
              </p>
            </AnimatedContent>
          </div>
        </div>

        <AnimatedContent
          distance={40}
          duration={0.8}
          delay={0.14}
          threshold={0.02}
          className="mt-14 sm:mt-20 lg:mt-24"
        >
          <div
            ref={marqueeViewportRef}
            data-in-view="true"
            className="marquee-viewport w-full overflow-hidden"
          >
            <div className="marquee-track flex w-max">
              <MarqueeCardList />
              <MarqueeCardList decorative />
            </div>
          </div>
        </AnimatedContent>
      </section>

      <section className="pt-8 pb-20 sm:pt-12 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-16">
            <AnimatedContent
              distance={32}
              duration={0.7}
              threshold={0.12}
              className="overflow-hidden rounded-[20px] bg-neutral-100 md:col-span-6 lg:col-span-5"
            >
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                alt="Danau alam jernih yang memantulkan langit biru dan perbukitan hijau"
                width={760}
                height={720}
                loading="lazy"
                className="aspect-[1.06/1] h-auto w-full object-cover"
              />
            </AnimatedContent>

            <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
              <div>
                <ScrollReveal
                  as="h2"
                  className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl"
                >
                  Mengapa Kampanye Ini Hadir?
                </ScrollReveal>
                <AnimatedContent distance={8} duration={0.65} threshold={0.12}>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:mt-5 sm:text-lg">
                    Kami percaya bahwa kepedulian terhadap lingkungan dimulai
                    dari pengetahuan dan kesadaran.
                  </p>
                </AnimatedContent>
              </div>

              <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
                {CAMPAIGN_PILLARS.map((pillar, index) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.id}
                      className="flex items-start gap-4 sm:gap-5"
                    >
                      <AnimatedContent
                        distance={24}
                        duration={0.6}
                        delay={0.08 * (index + 1)}
                        threshold={0.12}
                        className="shrink-0"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-950 sm:h-12 sm:w-12">
                          <Icon size={22} weight="regular" aria-hidden="true" />
                        </div>
                      </AnimatedContent>
                      <div>
                        <ScrollReveal
                          as="h3"
                          className="text-base font-bold text-neutral-950 sm:text-lg"
                        >
                          {pillar.title}
                        </ScrollReveal>
                        <AnimatedContent
                          distance={8}
                          duration={0.65}
                          delay={0.08 * (index + 1)}
                          threshold={0.12}
                        >
                          <p className="mt-1 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base">
                            {pillar.description}
                          </p>
                        </AnimatedContent>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Pilar Utama Kampanye">
        {CAMPAIGN_SHOWCASE.map((item) => (
          <ParallaxPillarBand key={item.id} item={item} />
        ))}
      </section>

      <KnowledgeChangeSection />

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedContent distance={8} duration={0.65} threshold={0.15}>
            <p className="text-sm font-medium text-neutral-700 sm:text-base">
              Menjaga Bumi Dimulai dari Kita.
            </p>
          </AnimatedContent>
          <ScrollReveal
            as="h2"
            className="mt-3 text-2xl leading-[1.22] font-bold tracking-tight text-neutral-950 sm:text-4xl"
          >
            Tidak semua perubahan harus dimulai dengan tindakan besar. Kebiasaan
            sederhana yang dilakukan secara konsisten dapat membantu menjaga
            lingkungan.
          </ScrollReveal>
          <AnimatedContent
            distance={32}
            duration={0.75}
            delay={0.1}
            threshold={0.15}
            className="mt-8 flex justify-center"
          >
            <Link
              to="/hutan"
              className="group inline-flex min-h-12 items-center gap-6 rounded-full bg-neutral-950 py-2 pr-2.5 pl-8 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-900 active:scale-[0.99] sm:text-base"
            >
              <span>Mulai Dari Sini</span>
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
