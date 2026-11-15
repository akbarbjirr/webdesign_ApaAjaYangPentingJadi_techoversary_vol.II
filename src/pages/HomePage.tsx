import { Link } from 'react-router'
import { ArrowRight, PawPrint, Trash, Tree } from '@phosphor-icons/react'
import { AnimatedContent } from '@/components/AnimatedContent'

interface PillActionLinkProps {
  to: string
  label: string
}

function PillActionLink({ to, label }: PillActionLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-12 items-center gap-6 rounded-full bg-neutral-950 py-2 pr-2 pl-8 text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-[0.99] sm:text-base"
    >
      <span>{label}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-950 sm:h-9 sm:w-9">
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      </span>
    </Link>
  )
}

const THREAT_STATS = [
  {
    id: 'forest-loss',
    icon: Tree,
    label: 'Hutan yang Terus Hilang',
    value: '10 juta',
    unit: 'hektare / tahun',
    description: 'Rata-rata deforestasi global pada periode 2015-2020.',
  },
  {
    id: 'endangered-species',
    icon: PawPrint,
    label: 'Satwa & Tumbuhan Terancam',
    value: '1 juta',
    unit: 'spesies',
    description: 'Diperkirakan terancam punah menurut kajian global 2019.',
  },
  {
    id: 'waste-accumulation',
    icon: Trash,
    label: 'Sampah yang Terus Menumpuk',
    value: '2,1 miliar',
    unit: 'ton sampah perkotaan',
    description:
      'Estimasi sampah padat perkotaan yang dihasilkan global pada 2023.',
  },
] as const

const WILDLIFE_CARDS = [
  {
    id: 'harimau-sumatera',
    name: 'Harimau Sumatera',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/v1794748863/Rectangle_99.png',
    alt: 'Harimau Sumatera berjalan di atas tanah hutan',
  },
  {
    id: 'orangutan',
    name: 'Orangutan',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/v1794748884/Rectangle_100.png',
    alt: 'Induk dan anak orangutan bergelantungan di dahan pohon',
  },
  {
    id: 'bajak-jawa',
    name: 'Bajak Jawa',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/v1794748893/Rectangle_101.png',
    alt: 'Badak Jawa berdiri di habitat alaminya',
  },
] as const

const WASTE_IMPACTS = [
  {
    id: 'mencemari-perairan',
    number: '01',
    title: 'Mencemari Perairan',
    description:
      'Sampah yang terbawa ke sungai dapat mengotori perairan dan mengganggu kehidupan di dalamnya.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/v1794748902/Rectangle_102.png',
    alt: 'Sampah plastik mengapung di perairan laut bersama ikan',
  },
  {
    id: 'mengancam-satwa',
    number: '02',
    title: 'Mengancam Satwa',
    description:
      'Satwa dapat menelan sampah plastik atau terjerat benda yang dibuang manusia.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/v1794748910/Rectangle_103.png',
    alt: 'Tumpukan sisa sampah makanan di atas tanah berumput',
  },
  {
    id: 'merusak-lingkungan',
    number: '03',
    title: 'Merusak Lingkungan',
    description:
      'Sampah yang dibuang sembarangan dapat menurunkan kualitas lingkungan.',
    image:
      'https://res.cloudinary.com/hd53eglp/image/upload/v1794748916/Rectangle_104.png',
    alt: 'Gunungan sampah menumpuk di area terbuka dekat pepohonan',
  },
] as const

export function HomePage() {
  return (
    <main id="konten-utama" className="min-h-screen bg-white">
      <section className="pt-16 pb-16 sm:pt-24 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[68rem] text-center">
            <AnimatedContent distance={28} duration={0.7} threshold={0.02}>
              <h1 className="text-3xl leading-[1.15] font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-[4rem]">
                Jauh di Dalam Hutan, Menjaganya Tetap Hidup.
              </h1>
            </AnimatedContent>

            <AnimatedContent
              distance={28}
              duration={0.7}
              delay={0.08}
              threshold={0.02}
            >
              <p className="mx-auto mt-5 max-w-[58rem] text-sm leading-relaxed text-neutral-600 sm:mt-6 sm:text-lg">
                Kenali hutan Indonesia, satwa langka yang bergantung padanya,
                dan langkah kecil yang dapat kita lakukan untuk menjaga alam
                tetap hidup.
              </p>
            </AnimatedContent>

            <AnimatedContent
              distance={24}
              duration={0.65}
              delay={0.16}
              threshold={0.02}
              className="mt-8 flex justify-center sm:mt-10"
            >
              <PillActionLink to="/quiz" label="Yuk Quiz" />
            </AnimatedContent>
          </div>

          <AnimatedContent
            distance={48}
            scale={0.97}
            duration={0.85}
            delay={0.2}
            threshold={0.02}
            className="mt-14 overflow-hidden rounded-2xl bg-neutral-100 sm:mt-20 sm:rounded-[24px]"
          >
            <img
              src="https://res.cloudinary.com/hd53eglp/image/upload/f_auto,q_auto/Group_18"
              alt="Harimau Sumatera di balik pagar kandang dengan dedaunan hijau di sekitarnya"
              width={1200}
              height={638}
              fetchPriority="high"
              className="aspect-[16/9] h-auto w-full object-cover sm:aspect-[16/8.5]"
            />
          </AnimatedContent>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent
            distance={40}
            duration={0.75}
            threshold={0.12}
            className="max-w-3xl"
          >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Bumi Sedang Menghadapi Ancaman.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Hutan yang terus berkurang, satwa yang kehilangan habitat, dan
              sampah yang mencemari lingkungan menjadi masalah yang membutuhkan
              perhatian kita.
            </p>
          </AnimatedContent>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 md:grid-cols-3 lg:gap-14">
            {THREAT_STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <AnimatedContent
                  key={stat.id}
                  distance={44}
                  duration={0.7}
                  delay={index * 0.1}
                  threshold={0.12}
                >
                  <Icon
                    size={44}
                    weight="regular"
                    aria-hidden="true"
                    className="text-green-600"
                  />
                  <h3 className="mt-5 text-sm font-bold text-neutral-950 sm:text-base">
                    {stat.label}
                  </h3>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.5rem]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-neutral-700 sm:text-sm">
                    {stat.unit}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {stat.description}
                  </p>
                </AnimatedContent>
              )
            })}
          </div>
        </div>
      </section>

      <section className="overflow-x-clip py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent distance={40} duration={0.75} threshold={0.12}>
            <h2 className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Menjaga Hutan,
              <br />
              Melindungi Satwa,
              <br />
              Memulai Perubahan.
            </h2>
          </AnimatedContent>

          <div className="mt-10 grid grid-cols-1 items-start gap-8 sm:mt-12 md:grid-cols-12 lg:gap-12">
            <AnimatedContent
              direction="horizontal"
              reverse
              distance={48}
              duration={0.8}
              threshold={0.12}
              className="overflow-hidden rounded-2xl bg-neutral-100 md:col-span-5 lg:col-span-4"
            >
              <img
                src="https://res.cloudinary.com/hd53eglp/image/upload/f_auto/q_auto/Rectangle_90.png"
                alt="Tajuk pepohonan hutan hijau menjulang ke arah langit berawan"
                width={600}
                height={798}
                loading="lazy"
                className="aspect-[3/4] h-auto w-full object-cover"
              />
            </AnimatedContent>

            <AnimatedContent
              direction="horizontal"
              distance={48}
              duration={0.8}
              delay={0.1}
              threshold={0.12}
              className="space-y-5 md:col-span-7 lg:col-span-6 lg:col-start-7"
            >
              <p className="text-base leading-relaxed text-neutral-700 sm:text-lg">
                Hutan memiliki peran penting dalam menjaga keseimbangan
                ekosistem. Di dalamnya terdapat berbagai spesies yang saling
                bergantung, mulai dari tumbuhan hingga satwa liar.
              </p>

              <p className="text-base leading-relaxed text-neutral-700 sm:text-lg">
                Ketika hutan mengalami kerusakan, kehidupan di dalamnya ikut
                terancam. Hilangnya habitat dapat membuat satwa kesulitan
                mencari makan, berkembang biak, dan mempertahankan kelangsungan
                hidupnya.
              </p>

              <div className="pt-2">
                <PillActionLink to="/hutan" label="Jelajahi Hutan" />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent
            distance={40}
            duration={0.75}
            threshold={0.12}
            className="max-w-3xl"
          >
            <h2 className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Mereka Juga Berhak Hidup
              <br />
              di Alam
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Hutan merupakan rumah bagi berbagai satwa liar. Namun, kerusakan
              habitat, perburuan, dan perdagangan ilegal membuat banyak satwa
              kehilangan tempat berlindung dan terancam keberadaannya.
            </p>
          </AnimatedContent>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-3 lg:gap-8">
            {WILDLIFE_CARDS.map((card, index) => (
              <AnimatedContent
                key={card.id}
                distance={50}
                scale={0.96}
                duration={0.75}
                delay={index * 0.1}
                threshold={0.1}
                className="relative overflow-hidden rounded-2xl bg-neutral-900"
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  width={420}
                  height={540}
                  loading="lazy"
                  className="aspect-[3/3.8] h-auto w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 pt-12">
                  <h3 className="text-base font-bold text-white sm:text-lg">
                    {card.name}
                  </h3>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-x-clip py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent
            distance={40}
            duration={0.75}
            threshold={0.12}
            className="max-w-3xl"
          >
            <h2 className="text-2xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Sampah yang Kita Buang, Alam
              <br />
              yang Menanggung
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
              Sampah yang tidak dikelola dengan baik dapat mencemari tanah,
              sungai, dan laut. Plastik yang berakhir di alam juga dapat
              membahayakan satwa dan merusak ekosistem.
            </p>
            <div className="mt-6">
              <PillActionLink to="/hutan" label="Jelajahi Sampah" />
            </div>
          </AnimatedContent>

          <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
            {WASTE_IMPACTS.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 lg:gap-12"
              >
                <AnimatedContent
                  distance={36}
                  duration={0.7}
                  threshold={0.14}
                  className="md:col-span-6 lg:col-span-5"
                >
                  <span className="block text-3xl font-bold text-neutral-500 sm:text-4xl">
                    {item.number}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-neutral-950 sm:text-[1.75rem] lg:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
                    {item.description}
                  </p>
                </AnimatedContent>

                <AnimatedContent
                  distance={44}
                  scale={0.97}
                  duration={0.8}
                  delay={0.1}
                  threshold={0.14}
                  className="overflow-hidden rounded-2xl bg-neutral-100 md:col-span-6 lg:col-span-6 lg:col-start-7"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={600}
                    height={320}
                    loading="lazy"
                    className="aspect-[16/8.5] h-auto w-full object-cover"
                  />
                </AnimatedContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent
            distance={36}
            duration={0.75}
            threshold={0.12}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Satu Alam, Satu Kehidupan.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Hutan, satwa, dan lingkungan memiliki hubungan yang erat.
              Kerusakan pada satu bagian dapat memengaruhi kehidupan lainnya.
            </p>
          </AnimatedContent>

          <div className="mt-12 grid grid-cols-1 items-start gap-8 sm:mt-16 md:grid-cols-12 lg:gap-10">
            <AnimatedContent
              distance={44}
              scale={0.97}
              duration={0.75}
              threshold={0.12}
              className="md:col-span-5"
            >
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="https://res.cloudinary.com/hd53eglp/image/upload/v1794748923/Rectangle_105.png"
                  alt="Orangutan terjebak di antara jaring plastik"
                  width={520}
                  height={480}
                  loading="lazy"
                  className="aspect-[11/10] h-auto w-full object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-base font-bold text-neutral-950 sm:text-lg">
                  Satwa Terancam
                </h3>
                <p className="mt-0.5 text-sm text-neutral-600 sm:text-base">
                  Kehilangan ruang hidup
                </p>
              </div>
            </AnimatedContent>

            <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 md:col-span-7 md:col-start-6">
              <AnimatedContent
                distance={44}
                scale={0.97}
                duration={0.75}
                delay={0.1}
                threshold={0.12}
              >
                <div>
                  <h3 className="text-base font-bold text-neutral-950 sm:text-lg">
                    Alam Tercemar
                  </h3>
                  <p className="mt-0.5 text-sm text-neutral-600 sm:text-base">
                    Ekosistem terganggu
                  </p>
                </div>
                <div className="mt-3 overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src="https://res.cloudinary.com/hd53eglp/image/upload/v1794748933/Rectangle_106.png"
                    alt="Sampah plastik mencemari perairan hijau"
                    width={380}
                    height={440}
                    loading="lazy"
                    className="aspect-[5/6] h-auto w-full object-cover"
                  />
                </div>
              </AnimatedContent>

              <AnimatedContent
                distance={44}
                scale={0.97}
                duration={0.75}
                delay={0.2}
                threshold={0.12}
              >
                <div className="overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src="https://res.cloudinary.com/hd53eglp/image/upload/v1794748941/Rectangle_107.png"
                    alt="Pembukaan lahan hutan dilihat dari atas dengan alat berat"
                    width={340}
                    height={520}
                    loading="lazy"
                    className="aspect-[3/4.6] h-auto w-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-base font-bold text-neutral-950 sm:text-lg">
                    Hutan Rusak
                  </h3>
                  <p className="mt-0.5 text-sm text-neutral-600 sm:text-base">
                    Habitat alam berkurang.
                  </p>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <AnimatedContent
          distance={40}
          duration={0.8}
          threshold={0.15}
          className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        >
          <p className="text-sm font-medium text-neutral-700 sm:text-base">
            Menjaga Bumi Dimulai dari Kita.
          </p>
          <h2 className="mt-3 text-2xl leading-[1.22] font-bold tracking-tight text-neutral-950 sm:text-4xl">
            Tidak semua perubahan harus dimulai dengan tindakan besar. Kebiasaan
            sederhana yang dilakukan secara konsisten dapat membantu menjaga
            lingkungan.
          </h2>
          <div className="mt-8 flex justify-center">
            <PillActionLink to="/hutan" label="Mulai Dari Sini" />
          </div>
        </AnimatedContent>
      </section>
    </main>
  )
}
