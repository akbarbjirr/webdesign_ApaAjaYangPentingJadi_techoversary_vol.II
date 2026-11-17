import type { ComponentType } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { AnimatedContent } from '@/components/AnimatedContent'
import {
  ParallaxPillarBand,
  type ParallaxBandItem,
} from '@/components/ParallaxPillarBand'
import { ScrollReveal } from '@/components/ScrollReveal'

const SAMPAH_HERO_IMAGE =
  'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1794748902/Rectangle_102.png'

const BURDEN_CARDS = [
  {
    id: 'pencemaran-air',
    title: 'Pencemaran Air',
    description:
      'Sampah yang masuk ke sungai dapat merusak kualitas air dan mengganggu kehidupan organisme.',
    image:
      'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=900&q=80',
    alt: 'Sampah plastik dan jaring mengapung di bawah permukaan air laut biru',
  },
  {
    id: 'penumpukan-sampah',
    title: 'Penumpukan Sampah',
    description:
      'Sampah yang tidak terkelola dapat menumpuk dan menurunkan kualitas lingkungan.',
    image:
      'https://images.unsplash.com/photo-1713016877596-6a800832e15c?auto=format&fit=crop&w=900&q=80',
    alt: 'Tumpukan botol plastik bekas berwarna-warni yang menumpuk',
  },
  {
    id: 'ancaman-satwa',
    title: 'Ancaman Satwa',
    description:
      'Satwa dapat menelan sampah plastik atau terjerat limbah yang mencemari habitatnya.',
    image:
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=900&q=80',
    alt: 'Satwa burung di tengah tumpukan sampah plastik di alam terbuka',
  },
] as const

function OrganikIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 text-green-600"
    >
      <path
        d="M27.5 27.5C29.5 18 23.5 9.5 8.5 7.5C6.5 22.5 15 28.5 24.5 26.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11.5L29.5 28.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M17.5 11.5V16.5H12.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 16.5V21.5H17.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function B3Icon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 text-green-600"
    >
      <circle cx="18" cy="18" r="14" fill="currentColor" />
      <circle cx="18" cy="18" r="2.2" fill="#ffffff" />
      <path
        d="M13.8 18H7.2A10.8 10.8 0 0 1 12.6 8.65L15.9 14.36A4.2 4.2 0 0 0 13.8 18ZM20.1 14.36L23.4 8.65A10.8 10.8 0 0 1 28.8 18H22.2A4.2 4.2 0 0 0 20.1 14.36ZM20.1 21.64L23.4 27.35A10.8 10.8 0 0 1 12.6 27.35L15.9 21.64A4.2 4.2 0 0 0 20.1 21.64Z"
        fill="#ffffff"
      />
    </svg>
  )
}

function AnorganikIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 text-green-600"
    >
      <path
        d="M21 6.5L24.5 8.5L23.2 10.7L19.7 8.7Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M19.8 9.2C18.5 10.4 17 11.4 15.8 13.4L10.3 22.8C9.6 24 10 25.5 11.2 26.2L15.4 28.7C16.6 29.4 18.1 29 18.8 27.8L24.3 18.4C25.5 16.4 25.1 14.5 24.4 12"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 29.5L29 6.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ResiduIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9 text-green-600"
    >
      <path
        d="M14.2 6.8C13.7 6 14.3 5 15.2 5H20.8C21.7 5 22.3 6 21.8 6.8L20 9.6H16L14.2 6.8Z"
        fill="currentColor"
      />
      <rect x="14.5" y="10.2" width="7" height="2" rx="1" fill="currentColor" />
      <path
        d="M15.2 13H20.8C24.8 15.2 28.5 20.6 28.5 25.4C28.5 28.9 25.5 31 18 31C10.5 31 7.5 28.9 7.5 25.4C7.5 20.6 11.2 15.2 15.2 13Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface WasteCategory {
  id: string
  title: string
  description: string
  icon: ComponentType
}

const WASTE_CATEGORIES: WasteCategory[] = [
  {
    id: 'organik',
    title: 'Sampah Organik',
    description:
      'Sampah yang berasal dari bahan alami, seperti sisa makanan, kulit buah, dan daun.',
    icon: OrganikIcon,
  },
  {
    id: 'b3',
    title: 'Sampah B3',
    description:
      'Sampah yang mengandung bahan berbahaya, seperti baterai bekas dan produk kimia tertentu, sehingga memerlukan penanganan khusus.',
    icon: B3Icon,
  },
  {
    id: 'anorganik',
    title: 'Sampah Anorganik',
    description:
      'Seperti plastik, kertas, kaca, dan logam yang dapat dipilah untuk digunakan kembali atau didaur ulang.',
    icon: AnorganikIcon,
  },
  {
    id: 'residu',
    title: 'Sampah Residu',
    description:
      'Sisa sampah yang tidak dapat dimanfaatkan melalui proses pengolahan atau daur ulang yang tersedia.',
    icon: ResiduIcon,
  },
]

const IMPACT_PARALLAX_BANDS: ParallaxBandItem[] = [
  {
    id: 'terhadap-manusia',
    title: 'Terhadap Manusia',
    description:
      'Lingkungan yang tercemar dapat meningkatkan risiko gangguan kesehatan, terutama ketika manusia terpapar air, udara, atau bahan berbahaya yang tercemar.',
    image:
      'https://images.unsplash.com/photo-1633219664572-473fd988a44f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Tangan pasien terpasang selang infus saat menjalani perawatan medis',
  },
  {
    id: 'terhadap-satwa',
    title: 'Terhadap Satwa',
    description:
      'Sampah plastik dan limbah lainnya dapat membahayakan satwa melalui tertelan atau terjerat, bahkan mengancam kelangsungan hidupnya.',
    image:
      'https://images.unsplash.com/photo-1589634749362-a8ef3056cbe9?auto=format&fit=crop&w=1600&q=80',
    alt: 'Penyu laut berenang di bawah permukaan air laut biru',
  },
  {
    id: 'terhadap-ekosistem',
    title: 'Terhadap Ekosistem',
    description:
      'Penumpukan dan pencemaran sampah dapat mengganggu keseimbangan ekosistem, baik di daratan maupun perairan.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    alt: 'Pepohonan hutan hijau diterangi berkas cahaya matahari pagi',
  },
]

export function SampahPage() {
  return (
    <main id="konten-utama" className="min-h-screen bg-white">
      <section className="pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal
            as="h1"
            className="max-w-3xl text-3xl leading-[1.18] font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.25rem]"
          >
            {'Sampah Tidak Hilang Begitu\nSaja.'}
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 sm:mt-14 md:mt-16 md:grid-cols-12 lg:mt-20">
            <AnimatedContent
              distance={8}
              duration={0.65}
              delay={0.08}
              threshold={0.02}
              className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7"
            >
              <p className="text-base leading-relaxed text-neutral-700 sm:text-lg lg:text-[1.2rem]">
                Setiap sampah yang kita buang memiliki dampak terhadap
                lingkungan. Tanpa pengelolaan yang tepat, sampah dapat mencemari
                alam dan mengancam kehidupan di dalamnya.
              </p>
            </AnimatedContent>
          </div>

          <AnimatedContent
            distance={44}
            scale={0.97}
            duration={0.8}
            delay={0.14}
            threshold={0.02}
            className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-[24px] bg-neutral-100 sm:mt-20 sm:rounded-[28px] lg:mt-24"
          >
            <img
              src={SAMPAH_HERO_IMAGE}
              alt="Sampah plastik mengapung di perairan laut bersama ikan"
              width={1200}
              height={680}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/9.2] h-auto w-full object-cover"
            />
          </AnimatedContent>
        </div>
      </section>

      <section
        aria-labelledby="waste-burden-heading"
        className="py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <ScrollReveal
              as="h2"
              id="waste-burden-heading"
              className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl"
            >
              {'Bumi Semakin Terbebani oleh\nSampah.'}
            </ScrollReveal>
            <AnimatedContent distance={8} duration={0.65} threshold={0.12}>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base lg:text-lg">
                Sampah yang terus dihasilkan tanpa pengelolaan yang baik dapat
                menumpuk dan mencemari lingkungan. Permasalahan ini bukan hanya
                tentang kebersihan, tetapi juga tentang keberlangsungan
                kehidupan.
              </p>
            </AnimatedContent>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-3 lg:gap-8">
            {BURDEN_CARDS.map((card, index) => (
              <AnimatedContent
                key={card.id}
                distance={44}
                scale={0.97}
                duration={0.75}
                delay={index * 0.1}
                threshold={0.1}
              >
                <div className="photo-hover-card rounded-[24px] bg-neutral-900">
                  <img
                    src={card.image}
                    alt={card.alt}
                    width={540}
                    height={567}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[1/1.05] h-auto w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 pt-20 sm:p-6">
                    <ScrollReveal
                      as="h3"
                      className="text-base font-bold text-white sm:text-lg lg:text-xl"
                    >
                      {card.title}
                    </ScrollReveal>
                    <AnimatedContent
                      distance={8}
                      duration={0.65}
                      threshold={0.1}
                    >
                      <p className="mt-1.5 text-xs leading-relaxed text-white/90 sm:text-sm">
                        {card.description}
                      </p>
                    </AnimatedContent>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="waste-types-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal
            as="h2"
            id="waste-types-heading"
            className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl"
          >
            {'Kenali Sampah Sebelum\nMembuangnya.'}
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:gap-x-24 lg:gap-y-12">
            {WASTE_CATEGORIES.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={category.id} className="flex items-start gap-5">
                  <AnimatedContent
                    distance={24}
                    duration={0.6}
                    delay={index * 0.08}
                    threshold={0.12}
                    className="shrink-0 pt-0.5"
                  >
                    <Icon />
                  </AnimatedContent>
                  <div>
                    <ScrollReveal
                      as="h3"
                      className="text-base font-bold text-neutral-950 sm:text-lg"
                    >
                      {category.title}
                    </ScrollReveal>
                    <AnimatedContent
                      distance={8}
                      duration={0.65}
                      delay={index * 0.08}
                      threshold={0.12}
                    >
                      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-neutral-600 sm:text-base">
                        {category.description}
                      </p>
                    </AnimatedContent>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="waste-impact-split-heading"
        className="py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 lg:gap-12">
            <div className="md:col-span-5">
              <ScrollReveal
                as="h2"
                id="waste-impact-split-heading"
                className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl"
              >
                {'Sampah Tidak Hanya Merusak\nPemandangan.'}
              </ScrollReveal>
            </div>

            <div className="md:col-span-6 md:col-start-7 md:pt-8 lg:col-span-6 lg:col-start-7">
              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.08}
                threshold={0.12}
              >
                <p className="text-base leading-relaxed text-neutral-700 sm:text-lg lg:text-[1.15rem]">
                  Dampak sampah dapat menjangkau lebih jauh dari yang kita
                  bayangkan. Mulai dari pencemaran lingkungan hingga
                  terganggunya keseimbangan ekosistem.
                </p>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Dampak Sampah Secara Mendalam">
        {IMPACT_PARALLAX_BANDS.map((item) => (
          <ParallaxPillarBand
            key={item.id}
            item={item}
            titleClassName="text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.75rem]"
          />
        ))}
      </section>

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
              to="/sampah/reduce"
              className="group inline-flex min-h-12 items-center gap-6 rounded-full bg-neutral-950 py-2 pr-2.5 pl-8 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-900 active:scale-[0.99] sm:text-base"
            >
              <span>Reduce</span>
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
