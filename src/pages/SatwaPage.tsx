import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, PawPrint, ShieldCheck, Tree } from '@phosphor-icons/react'
import { AnimatedContent } from '@/components/AnimatedContent'
import { ScrollReveal } from '@/components/ScrollReveal'
import { cn } from '@/lib/utils'

interface WildlifeProfile {
  id: string
  commonName: string
  scientificName: string
  status: 'Kritis (CR)' | 'Terancam Punah (EN)' | 'Rentan (VU)'
  habitat: string
  region: 'Sumatera' | 'Kalimantan' | 'Jawa'
  roleInForest: string
  mainThreat: string
  conservationAction: string
}

const WILDLIFE_DATA: WildlifeProfile[] = [
  {
    id: 'harimau-sumatera',
    commonName: 'Harimau Sumatera',
    scientificName: 'Panthera tigris sumatrae',
    status: 'Kritis (CR)',
    habitat: 'Hutan hujan dataran rendah hingga hutan pegunungan bukit barisan',
    region: 'Sumatera',
    roleInForest:
      'Predator puncak yang menjaga keseimbangan populasi herbivora seperti babi hutan dan rusa agar regenerasi pohon muda tetap sehat.',
    mainThreat:
      'Fragmentasi koridor hutan akibat pembukaan lahan dan perburuan liar.',
    conservationAction:
      'Melindungi koridor satwa liar dan mendukung produk pangan bebas deforestasi.',
  },
  {
    id: 'orangutan-kalimantan',
    commonName: 'Orangutan Kalimantan',
    scientificName: 'Pongo pygmaeus',
    status: 'Kritis (CR)',
    habitat:
      'Hutan rawa gambut dan hutan Dipterokarpa di lapisan kanopi tengah',
    region: 'Kalimantan',
    roleInForest:
      'Penyebar biji buah hutan jarak jauh yang membantu tumbuhnya ratusan spesies pohon kanopi baru.',
    mainThreat:
      'Kebakaran hutan rawa gambut dan menyempitnya pohon pakan akibat alih fungsi hutan.',
    conservationAction:
      'Menjaga ekosistem rawa gambut tetap basah dan mendukung restorasi pohon pakan alami.',
  },
  {
    id: 'rangkong-gading',
    commonName: 'Rangkong Gading',
    scientificName: 'Rhinoplax vigil',
    status: 'Kritis (CR)',
    habitat: 'Tajuk pohon emergen berbatang besar sebagai sarang alami',
    region: 'Kalimantan',
    roleInForest:
      'Dikenal sebagai petani hutan karena menebar biji pohon buah raksasa di seluruh lanskap rimba.',
    mainThreat:
      'Hilangnya pohon tua berlubang tempat bersarang dan perburuan ilegal.',
    conservationAction:
      'Menolak segala bentuk perdagangan bagian tubuh satwa liar dan menjaga kelestarian pohon tua.',
  },
  {
    id: 'badak-jawa',
    commonName: 'Badak Jawa',
    scientificName: 'Rhinoceros sondaicus',
    status: 'Kritis (CR)',
    habitat: 'Hutan dataran rendah pesisir Taman Nasional Ujung Kulon',
    region: 'Jawa',
    roleInForest:
      'Membentuk celah cahaya alami saat memakan tumbuhan bawah sehingga anak pohon rimba dapat tumbuh.',
    mainThreat:
      'Populasi tunggal yang rentan terhadap penyakit dan tumbuhan invasif langkap.',
    conservationAction:
      'Mendukung pengelolaan habitat Ujung Kulon dan menghindari wisata alam tanpa izin resmi.',
  },
]

const REGION_FILTERS = ['Semua', 'Sumatera', 'Kalimantan', 'Jawa'] as const
type RegionFilter = (typeof REGION_FILTERS)[number]

export function SatwaPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('Semua')

  const filteredSpecies = WILDLIFE_DATA.filter(
    (item) => selectedRegion === 'Semua' || item.region === selectedRegion,
  )

  return (
    <main id="konten-utama" className="min-h-screen bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 border-b border-neutral-200 pb-8">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-green-700">
            <PawPrint size={18} weight="regular" aria-hidden="true" />
            <span>SATWA ENDEMIK &amp; HUTAN INDONESIA</span>
          </p>
          <ScrollReveal
            as="h1"
            className="text-3xl leading-[1.15] font-bold tracking-tight text-neutral-950 sm:text-5xl"
          >
            Satwa Langka Penjaga Keseimbangan Rimba.
          </ScrollReveal>
          <AnimatedContent distance={8} duration={0.65} threshold={0.1}>
            <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
              Ketika hutan terjaga, satwa liar berperan aktif menebar biji pohon
              dan menjaga rantai makanan tetap seimbang. Kenali spesies kunci di
              hutan Indonesia.
            </p>
          </AnimatedContent>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter wilayah sebaran satwa"
            className="flex flex-wrap gap-2"
          >
            {REGION_FILTERS.map((region) => {
              const isActive = selectedRegion === region
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  aria-pressed={isActive}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-xs font-semibold transition-colors sm:text-sm',
                    isActive
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50',
                  )}
                >
                  {region}
                </button>
              )
            })}
          </div>

          <Link
            to="/quiz"
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-neutral-950 py-1.5 pr-2 pl-5 text-xs font-medium text-white transition-colors duration-300 hover:bg-neutral-900 sm:text-sm"
          >
            <span>Uji Pengetahuan di Quiz</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform duration-300 ease-out group-hover:translate-x-1">
              <ArrowRight
                size={15}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-rotate-45"
              />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredSpecies.map((species) => (
            <article
              key={species.id}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-neutral-600">
                    Wilayah: {species.region}
                  </span>
                  <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-mono text-xs font-semibold text-amber-900">
                    {species.status}
                  </span>
                </div>

                <div>
                  <ScrollReveal
                    as="h2"
                    className="text-2xl font-bold tracking-tight text-neutral-950"
                  >
                    {species.commonName}
                  </ScrollReveal>
                  <AnimatedContent distance={8} duration={0.65} threshold={0.1}>
                    <p className="text-sm text-neutral-600 italic">
                      {species.scientificName}
                    </p>
                  </AnimatedContent>
                </div>

                <AnimatedContent distance={8} duration={0.65} threshold={0.1}>
                  <div className="space-y-3 border-t border-neutral-200 pt-4 text-sm leading-relaxed text-neutral-700">
                    <p className="flex items-start gap-2.5">
                      <Tree
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-green-600"
                      />
                      <span>
                        <strong className="text-neutral-950">Habitat:</strong>{' '}
                        {species.habitat}.
                      </span>
                    </p>
                    <p>
                      <strong className="text-neutral-950">
                        Peran ekologis:
                      </strong>{' '}
                      {species.roleInForest}
                    </p>
                    <p>
                      <strong className="text-neutral-950">
                        Ancaman utama:
                      </strong>{' '}
                      {species.mainThreat}
                    </p>
                  </div>
                </AnimatedContent>
              </div>

              <AnimatedContent distance={8} duration={0.65} threshold={0.1}>
                <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-800 sm:text-sm">
                  <ShieldCheck
                    size={18}
                    weight="regular"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-green-600"
                  />
                  <span>
                    <strong className="text-neutral-950">Langkah aksi:</strong>{' '}
                    {species.conservationAction}
                  </span>
                </div>
              </AnimatedContent>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
