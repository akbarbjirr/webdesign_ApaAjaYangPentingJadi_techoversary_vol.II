import { type MouseEvent } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { AnimatedContent } from '@/components/AnimatedContent'
import {
  ParallaxPillarBand,
  type ParallaxBandItem,
} from '@/components/ParallaxPillarBand'
import { ScrollReveal } from '@/components/ScrollReveal'

const SATWA_PARALLAX_BANDS: readonly ParallaxBandItem[] = [
  {
    id: 'badak-jawa',
    title: 'Badak Jawa',
    description:
      'Dahulu mereka menjelajah bebas di daratan Asia Tenggara, namun penyusutan habitat dan perburuan cula mengurung mereka di satu semenanjung kecil Ujung Kulon. Jejak kaki raksasa pemalu ini semakin jarang terlihat, bertahan dalam keheningan yang sangat rapuh.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005453/Rectangle_140.jpg',
    alt: 'Badak Jawa berjalan melintasi tanah dan pepohonan di habitat alaminya',
  },
  {
    id: 'badak-sumatera',
    title: 'Badak Sumatera',
    description:
      'Laju deforestasi yang masif membuat mamalia purba berambut ini hidup dalam kesepian yang mematikan. Terisolasi terlalu jauh satu sama lain di sisa-sisa hutan yang terpecah, mereka perlahan menghilang dalam sunyi tanpa sempat menemukan pasangan.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005455/Rectangle_141.jpg',
    alt: 'Potret dekat kepala Badak Sumatera berambut di Suaka Rhino Sumatera',
  },
  {
    id: 'orangutan-tapanuli',
    title: 'OrangUtan Tapanuli',
    description:
      'Spesies kera besar ini baru saja diidentifikasi, namun langsung berhadapan dengan jurang kepunahan. Fragmentasi hutan oleh pembukaan jalan dan beton telah membelah rumah mereka, memisahkan keluarga yang kini terkurung di sisa-sisa kanopi yang kian menyempit.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005463/Rectangle_142.jpg',
    alt: 'Orangutan Tapanuli jantan duduk di antara dedaunan hutan hujan Batang Toru',
  },
  {
    id: 'gajah-sumatera',
    title: 'Gajah Sumatera',
    description:
      'Raksasa lembut penjaga keseimbangan ekosistem ini kian terdesak oleh konflik lahan dan perburuan gading. Rute jelajah purba mereka kini berubah menjadi hamparan perkebunan sawit, mengubah mereka dari penguasa rimba menjadi tamu yang diusir dari rumahnya sendiri.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005462/Rectangle_144.jpg',
    alt: 'Gajah Sumatera bergading panjang berdiri di padang rumput hijau dengan dedaunan segar',
  },
  {
    id: 'orangutan-sumatera',
    title: 'OrangUtan Sumatera',
    description:
      'Primata cerdas yang sering dijuluki "tukang kebun hutan" ini kian kehilangan rimbunnya tajuk pepohonan tempat mereka bergantung. Pembukaan lahan besar-besaran telah merampas rumah purba mereka, memaksa kera berbulu kemerahan ini turun ke tanah dan berhadapan langsung dengan ancaman perburuan yang merenggut kebebasan mereka selamanya.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005457/Rectangle_143.jpg',
    alt: 'Induk Orangutan Sumatera memeluk anaknya di antara dahan pepohonan hutan',
  },
  {
    id: 'macan-tutul-jawa',
    title: 'Macan Tutul Jawa',
    description:
      'Kucing besar terakhir yang tersisa di Pulau Jawa ini hidup seperti bayangan akibat hilangnya hutan pegunungan. Terimpit oleh ekspansi lahan manusia, mereka terpaksa mundur dan bersembunyi di sisa-sisa tebing curam yang kian hari kian menyempit.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005463/Rectangle_147.jpg',
    alt: 'Macan Tutul Jawa beristirahat di atas dahan pohon dengan latar dedaunan hijau',
  },
  {
    id: 'harimau-sumatera',
    title: 'Harimau Sumatera',
    description:
      'Kucing besar terakhir yang tersisa di Indonesia ini terus berpacu dengan waktu di tengah rimbunnya hutan Sumatera yang kian menyusut. Pembalakan liar dan jerat perburuan yang kejam tak henti mengintai, menyudutkan sang predator puncak ke ambang kepunahan sebelum aumannya benar-benar senyap menyusul kerabatnya di Jawa dan Bali.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005463/Rectangle_145.jpg',
    alt: 'Harimau Sumatera berdiri waspada di antara rimbunnya batang bambu hijau',
  },
  {
    id: 'anoa',
    title: 'Anoa',
    description:
      'Sapi kerdil endemik kebanggaan Sulawesi ini semakin terpinggirkan dari habitat aslinya. Perburuan liar dan pembukaan hutan secara masif telah merampas ketenangan mereka, memaksa satwa pemalu yang gemar menyendiri di kedalaman rimba ini terus berlari mencari tempat bersembunyi yang kini seolah tak lagi tersisa.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005465/Rectangle_165.jpg',
    alt: 'Anoa dataran rendah endemik Sulawesi berdiri tampak samping di habitatnya',
  },
] as const

export function SatwaPage() {
  const handleScrollToSpecies = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('daftar-satwa')
    if (!target) return
    event.preventDefault()
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <main id="konten-utama" className="min-h-screen bg-white">
      <section
        aria-label="Pengantar satwa langka"
        className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-16 md:pt-20 md:pb-24"
      >
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-12">
          <div className="md:col-span-6">
            <ScrollReveal
              as="h1"
              className="text-3xl leading-[1.15] font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.75rem]"
            >
              Mereka yang Kehilangan Rumah
            </ScrollReveal>
            <AnimatedContent distance={20} duration={0.65} delay={0.08}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                Hutan lebih dari sekadar pepohonan; ia adalah benteng terakhir
                bagi ribuan spesies langka yang tak ditemukan di belahan bumi
                mana pun. Mari kenali wajah-wajah asli penghuni hutan kita
                sebelum mereka hanya menjadi sejarah.
              </p>
            </AnimatedContent>
            <AnimatedContent distance={20} duration={0.65} delay={0.14}>
              <a
                href="#daftar-satwa"
                onClick={handleScrollToSpecies}
                className="group mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-neutral-950 px-6 py-3 text-xs font-semibold text-white transition-all duration-200 hover:bg-neutral-800 sm:text-sm"
              >
                <span>Jelajahi Spesies</span>
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </AnimatedContent>
          </div>

          <div className="md:col-span-6">
            <AnimatedContent distance={28} duration={0.7} delay={0.1}>
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <div className="photo-hover-card relative row-span-2 min-h-75 overflow-hidden rounded-2xl bg-neutral-100 sm:min-h-95">
                  <img
                    src="https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005511/Rectangle_137.jpg"
                    alt="Potret orangutan jantan di hutan hujan Indonesia"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="photo-hover-card aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src="https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005452/Rectangle_135.jpg"
                    alt="Potret dekat kepala dan cula badak"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="photo-hover-card aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src="https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/v1795005460/Rectangle_136.jpg"
                    alt="Badak bercula satu di habitat hutan hijau"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section
        aria-label="Fakta kepunahan satwa"
        className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-20"
      >
        <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-12 md:gap-9 lg:gap-10">
          <div className="md:col-span-5">
            <AnimatedContent distance={24} duration={0.65}>
              <div className="relative flex h-49 w-full max-w-105 items-end overflow-hidden rounded-[20px] bg-black pr-5 pb-4 pl-34.5 sm:h-55 sm:pr-6 sm:pb-5 sm:pl-39.5">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 -left-5 translate-y-[-48%] text-[16rem] leading-none font-bold tracking-tighter text-[#9e9e9e] select-none sm:-left-6 sm:text-[18.25rem]"
                >
                  0
                </span>
                <p className="relative z-10 text-xs leading-[1.35] font-normal text-white/95 sm:text-[15px]">
                  Sisa populasi dari spesies yang telah pergi selamanya.
                </p>
              </div>
            </AnimatedContent>
          </div>

          <div className="md:col-span-7">
            <ScrollReveal
              as="h2"
              className="text-2xl leading-[1.15] font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.65rem]"
            >
              Beberapa suara kini telah sunyi.
            </ScrollReveal>
            <AnimatedContent distance={20} duration={0.65} delay={0.08}>
              <p className="mt-3.5 max-w-128.75 text-sm leading-normal font-medium text-neutral-900 sm:mt-4 sm:text-base">
                Indonesia pernah menjadi rumah bagi keberagaman hayati yang tak
                tertandingi. Namun, laju deforestasi dan perburuan masif telah
                merampas rumah mereka. Delapan satwa ini bukan lagi sekadar
                catatan sejarah, melainkan peringatan keras tentang apa yang
                terjadi jika kita terus diam.
              </p>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section
        id="daftar-satwa"
        aria-labelledby="daftar-satwa-heading"
        className="scroll-mt-24"
      >
        <div className="mx-auto max-w-4xl px-5 pt-12 pb-10 text-center sm:px-8 sm:pt-16 sm:pb-14">
          <p className="text-[11px] font-bold tracking-[0.14em] text-neutral-950 uppercase sm:text-xs">
            ARSIP KEHILANGAN
          </p>
          <ScrollReveal
            as="h2"
            id="daftar-satwa-heading"
            className="mt-4 text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl"
          >
            Jejak Langkah yang Telah Usai.
          </ScrollReveal>
        </div>

        <div>
          {SATWA_PARALLAX_BANDS.map((item) => (
            <ParallaxPillarBand
              key={item.id}
              item={item}
              titleClassName="mx-auto max-w-5xl text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-6xl lg:text-[4.75rem]"
              descriptionClassName="max-w-3xl text-sm leading-relaxed text-white/95 sm:text-base"
            />
          ))}
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
              <span>Mulai Kuis</span>
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
