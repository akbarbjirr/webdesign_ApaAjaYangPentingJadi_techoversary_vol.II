import { Link } from 'react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { AnimatedContent } from '@/components/AnimatedContent'
import { ScrollReveal } from '@/components/ScrollReveal'

const FOREST_HERO_IMAGE =
  'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005467/image_17.jpg'

const ECOSYSTEM_CARDS = [
  {
    id: 'jejaring-kehidupan',
    title: 'Jejaring Kehidupan',
    description:
      'Dari lantai hutan hingga tajuk kanopi tertinggi, setiap lapisan menciptakan rumah dan ruang bagi kehidupan.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005466/Rectangle_126.jpg',
    alt: 'Pandangan ke atas batang bambu tinggi menuju kanopi hijau hutan',
  },
  {
    id: 'paru-paru-dunia',
    title: 'Paru Paru Dunia',
    description:
      'Hutan menyimpan karbon, melepaskan oksigen, dan membantu mengatur sistem iklim yang kita andalkan setiap hari.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005479/Rectangle_127.jpg',
    alt: 'Berkas sinar matahari menembus sela pepohonan di dalam hutan',
  },
  {
    id: 'keseimbangan-hidup',
    title: 'Keseimbangan Hidup',
    description:
      'Sebuah jaring kehidupan antara tumbuhan, satwa, dan manusia, menjadikan hutan lebih dari sekadar kumpulan pepohonan.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005471/Rectangle_128.jpg',
    alt: 'Jamur dan organisme pengurai tumbuh alami di batang pohon hutan',
  },
] as const

const FOREST_THREAT_IMAGE =
  'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005485/Rectangle_129.jpg'

const FOREST_THREATS = [
  {
    number: '01',
    title: 'Deforestasi Massal',
    description:
      'Pembukaan lahan dan penebangan liar yang menggerus tutupan hijau secara drastis.',
  },
  {
    number: '02',
    title: 'Krisis Habitat',
    description:
      'Terpecahnya area hutan yang mengancam rumah alami dan populasi spesies endemik.',
  },
  {
    number: '03',
    title: 'Pencemaran Ekosistem',
    description:
      'Tumpukan limbah dan sampah manusia yang merusak kesuburan tanah serta sumber air alami.',
  },
] as const

const CONSERVATION_PHOTOS = {
  orangutanClimb: {
    src: 'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005477/Rectangle_133.jpg',
    alt: 'Orangutan bergelantungan pada batang pohon di tengah hutan hujan Sumatera',
  },
  treeClimber: {
    src: 'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005494/Rectangle_134.jpg',
    alt: 'Peneliti memanjat batang pohon raksasa menggunakan helm dan tali pengaman di hutan hujan',
  },
} as const

export function HutanPage() {
  return (
    <main id="konten-utama" className="min-h-screen bg-white">
      <section
        aria-label="Pengantar Hutan Dunia"
        className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 lg:gap-12">
            <div className="md:col-span-6">
              <ScrollReveal
                as="h1"
                className="text-3xl leading-[1.18] font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.75rem]"
              >
                Lebih dari Sekadar Pepohonan
              </ScrollReveal>
            </div>

            <div className="md:col-span-6 md:pt-8 lg:col-span-5 lg:col-start-8">
              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.08}
                threshold={0.02}
              >
                <p className="text-sm leading-relaxed text-neutral-700 sm:text-base lg:text-[1.0625rem]">
                  Masuklah ke dalam hutan dunia dengan koneksi yang sunyi,
                  keanekaragaman liar, dan kehidupan yang menjangkau jauh
                  melampaui kanopi pohon.
                </p>
              </AnimatedContent>
            </div>
          </div>

          <AnimatedContent
            distance={44}
            scale={0.97}
            duration={0.8}
            delay={0.14}
            threshold={0.02}
            className="mt-12 overflow-hidden rounded-[24px] bg-neutral-100 sm:mt-14 sm:rounded-[28px] lg:mt-16"
          >
            <img
              src={FOREST_HERO_IMAGE}
              alt="Siluet pepohonan pinus dan puncak pegunungan yang diterangi sinar matahari terbit"
              width={1800}
              height={1012}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/9] h-auto w-full object-cover"
            />
          </AnimatedContent>
        </div>
      </section>

      <section
        aria-labelledby="ecosystem-heading"
        className="py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 lg:gap-12">
            <div className="md:col-span-5">
              <ScrollReveal
                as="h2"
                id="ecosystem-heading"
                className="text-2xl leading-[1.2] font-semibold tracking-tight text-neutral-950 sm:text-3xl lg:text-[2.25rem]"
              >
                {'Ekosistem Di\nSetiap Sudutnya'}
              </ScrollReveal>
            </div>

            <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.08}
                threshold={0.12}
              >
                <p className="text-sm leading-relaxed text-neutral-800 sm:text-base lg:text-[1.0625rem]">
                  Lihat lebih dekat, dan hutan akan menyingkap rahasianya.
                  Lapisan kehidupan yang saling terhubung, di mana setiap bagian
                  sangat penting bagi kelangsungan seluruh ekosistem.
                </p>
              </AnimatedContent>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3 lg:gap-8">
            {ECOSYSTEM_CARDS.map((card, index) => (
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

      <section
        aria-labelledby="green-loss-heading"
        className="py-10 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2">
            <AnimatedContent
              distance={32}
              duration={0.75}
              threshold={0.1}
              className="photo-hover-frame relative min-h-[340px] bg-neutral-200 md:min-h-[600px]"
            >
              <img
                src={FOREST_THREAT_IMAGE}
                alt="Kerusakan lahan hutan dengan tanah longsor dan akar pepohonan tumbang"
                width={900}
                height={960}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </AnimatedContent>

            <div className="flex flex-col justify-center bg-[#165e1f] px-8 py-12 text-white sm:px-12 sm:py-16 lg:px-14 lg:py-20">
              <ScrollReveal
                as="h2"
                id="green-loss-heading"
                className="text-2xl leading-[1.2] font-bold tracking-tight text-white sm:text-3xl lg:text-[2.25rem]"
              >
                {'Ketika bentangan hijau\nmulai menghilang'}
              </ScrollReveal>

              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.08}
                threshold={0.12}
              >
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                  Setiap tahun, hutan Indonesia menghadapi tekanan besar akibat
                  aktivitas manusia dan alih fungsi lahan. Memahami akar
                  penyebabnya adalah langkah pertama untuk melindungi apa yang
                  tersisa.
                </p>
              </AnimatedContent>

              <div className="mt-8 space-y-6 sm:mt-10">
                {FOREST_THREATS.map((threat, index) => (
                  <div
                    key={threat.number}
                    className="flex items-start gap-4 sm:gap-5"
                  >
                    <AnimatedContent
                      distance={8}
                      duration={0.65}
                      delay={index * 0.08}
                      threshold={0.12}
                      className="w-12 shrink-0 sm:w-14"
                    >
                      <span className="block text-3xl leading-none font-semibold tracking-tight text-white tabular-nums sm:text-4xl">
                        {threat.number}
                      </span>
                    </AnimatedContent>
                    <div>
                      <ScrollReveal
                        as="h3"
                        className="text-base font-bold text-white sm:text-lg"
                      >
                        {threat.title}
                      </ScrollReveal>
                      <AnimatedContent
                        distance={8}
                        duration={0.65}
                        delay={index * 0.08}
                        threshold={0.12}
                      >
                        <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                          {threat.description}
                        </p>
                      </AnimatedContent>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="restore-heading"
        className="py-16 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <ScrollReveal
                as="h2"
                id="restore-heading"
                className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl"
              >
                {'Menjaga yang Tersisa,\nMemulihkan yang Terluka.'}
              </ScrollReveal>
              <AnimatedContent
                distance={8}
                duration={0.65}
                delay={0.08}
                threshold={0.12}
              >
                <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-700 sm:text-base">
                  Kerusakan memang terjadi, namun harapan belum hilang. Melalui
                  langkah konservasi yang tepat, reboisasi, dan kesadaran
                  bersama, kita masih bisa mengembalikan rimbunnya napas
                  nusantara untuk generasi mendatang.
                </p>
              </AnimatedContent>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start lg:col-span-7 lg:gap-8">
              <AnimatedContent
                distance={44}
                scale={0.97}
                duration={0.75}
                threshold={0.1}
              >
                <div className="photo-hover-card rounded-[24px] bg-neutral-100">
                  <img
                    src={CONSERVATION_PHOTOS.orangutanClimb.src}
                    alt={CONSERVATION_PHOTOS.orangutanClimb.alt}
                    width={540}
                    height={756}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4.2] h-auto w-full object-cover"
                  />
                </div>
              </AnimatedContent>

              <AnimatedContent
                distance={44}
                scale={0.97}
                duration={0.75}
                delay={0.12}
                threshold={0.1}
                className="sm:mt-24 lg:mt-32"
              >
                <div className="photo-hover-card rounded-[24px] bg-neutral-100">
                  <img
                    src={CONSERVATION_PHOTOS.treeClimber.src}
                    alt={CONSERVATION_PHOTOS.treeClimber.alt}
                    width={540}
                    height={756}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4.2] h-auto w-full object-cover"
                  />
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
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
              to="/quiz"
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
