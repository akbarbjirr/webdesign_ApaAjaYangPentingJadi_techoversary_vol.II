export interface CanopyStratum {
  id: string
  code: string
  name: string
  elevationLabel: string
  ecologicalRole: string
  primaryThreat: string
  citizenAction: string
  speciesExample: string
}

export interface FieldProtocol {
  id: string
  code: string
  category: 'Pencegahan Api' | 'Konsumsi Harian' | 'Pelaporan & Restorasi'
  title: string
  summary: string
  actionSteps: string[]
  whyItMatters: string
  isFlagship?: boolean
}

export interface QuizQuestion {
  id: string
  scenario: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface HabitPledge {
  id: string
  label: string
  impactNote: string
}

export const CANOPY_STRATA: CanopyStratum[] = [
  {
    id: 'emergent',
    code: 'STRATA-01',
    name: 'Tajuk Puncak (Emergent Layer)',
    elevationLabel: 'Di atas 40 meter',
    ecologicalRole:
      'Pohon-pohon tertinggi seperti Meranti dan Keruing menahan terpaan angin kencang serta menjadi tempat bersarang burung rangkong dan elang hutan.',
    primaryThreat:
      'Pembalakan liar memilih pohon berdiameter besar sebagai target utama karena nilai kayu komersialnya tinggi.',
    citizenAction:
      'Pastikan pembelian furnitur atau material kayu memiliki penanda legalitas SVLK (Sistem Verifikasi Legalitas Kayu).',
    speciesExample: 'Shorea spp. (Meranti), Rangkong Badak',
  },
  {
    id: 'canopy',
    code: 'STRATA-02',
    name: 'Atap Kanopi Utama',
    elevationLabel: '20 hingga 40 meter',
    ecologicalRole:
      'Rangkaian tajuk pohon yang saling bertaut menyaring sebagian besar radiasi matahari, menjaga kelembapan udara, dan menjadi jalur jelajah orangutan serta owa.',
    primaryThreat:
      'Fragmentasi hutan akibat pembukaan jalan atau kebun monokultur memutus jembatan alami antar-pohon.',
    citizenAction:
      'Dukung produk agroforestri (seperti kopi naungan atau madu hutan) yang ditanam tanpa menebang pohon pelindung kanopi.',
    speciesExample: 'Pohon Ara (Ficus), Orangutan, Owa Jawa',
  },
  {
    id: 'understory',
    code: 'STRATA-03',
    name: 'Kanopi Bawah (Understory)',
    elevationLabel: '4 hingga 20 meter',
    ecologicalRole:
      'Ruang teduh berkelembapan tinggi tempat anakan pohon hutan tumbuh menunggu celah cahaya, sekaligus rumah bagi amfibi, serangga penyerbuk, dan tumbuhan obat.',
    primaryThreat:
      'Perburuan satwa liar dan pengambilan tanaman hias hutan (anggrek spesies, kantong semar) secara ilegal.',
    citizenAction:
      'Tolak membeli satwa liar dilindungi maupun tanaman hutan hasil cabutan alam; pilih hasil budidaya resmi.',
    speciesExample: 'Nepenthes (Kantong Semar), Anggrek Hutan, Katak Pohon',
  },
  {
    id: 'forest-floor',
    code: 'STRATA-04',
    name: 'Lantai Hutan & Tanah Gambut',
    elevationLabel: '0 hingga 4 meter & lapisan bawah tanah',
    ecologicalRole:
      'Serasah daun, jamur pengurai, dan tanah gambut basah menyerap air hujan seperti spons raksasa serta mengunci cadangan karbon di dalam tanah.',
    primaryThreat:
      'Pengeringan kanal gambut dan puntung api atau pembakaran lahan yang memicu kebakaran bawah permukaan tanah.',
    citizenAction:
      'Jangan pernah menyalakan api unggun di atas tanah bergambut saat mendaki, dan laporkan titik asap melalui kanal resmi.',
    speciesExample: 'Miselium Jamur, Lumut Sphagnum, Harimau Sumatera',
  },
]

export const FIELD_PROTOCOLS: FieldProtocol[] = [
  {
    id: 'protokol-api-gambut',
    code: 'PR-01',
    category: 'Pencegahan Api',
    title: 'Protokol Nol Bara di Kawasan Rawan Karhutla',
    summary:
      'Api di lantai hutan dan lahan gambut sering merambat di bawah permukaan akar tanpa terlihat dari atas hingga muncul asap pekat.',
    actionSteps: [
      'Gunakan kompor tabung portabel berpenyangga saat berkemah, bukan api unggun kayu di atas serasah kering.',
      'Bawa kembali seluruh botol kaca dan kaleng karena pantulan lensa kaca pada rumput kering dapat memicu titik panas.',
      'Catat koordinat GPS ponsel jika melihat kepulan asap putih dari tanah dan laporkan ke pos kehutanan terdekat.',
    ],
    whyItMatters:
      'Kebakaran gambut melepaskan karbon yang tersimpan ratusan tahun dan merusak struktur spons tanah secara permanen.',
    isFlagship: true,
  },
  {
    id: 'protokol-kertas-tisu',
    code: 'PR-02',
    category: 'Konsumsi Harian',
    title: 'Audit Penggunaan Kertas, Tisu, dan Kemasan Serat Kayu',
    summary:
      'Permintaan serat pulp murni (virgin pulp) yang tinggi mendorong konversi hutan alam menjadi hutan tanaman industri satu jenis.',
    actionSteps: [
      'Ganti tisu sekali pakai dengan saputangan kain atau lap mikrofiber yang dapat dicuci ulang.',
      'Gunakan kedua sisi kertas cetak sebelum memasukkannya ke jalur daur ulang terpilah.',
      'Periksa label FSC (Forest Stewardship Council) atau SVLK pada buku tulis dan kemasan karton.',
    ],
    whyItMatters:
      'Menekan konsumsi kertas sekali pakai mengurangi tekanan pembukaan lahan baru untuk bahan baku bubur kertas.',
  },
  {
    id: 'protokol-jejak-pendakian',
    code: 'PR-03',
    category: 'Pelaporan & Restorasi',
    title: 'Etika Kunjungan Hutan: Bawa Pulang Sampah & Jaga Jalur Akar',
    summary:
      'Jalur wisata alam yang melebar liar memadatkan tanah di sekitar akar pohon dan memicu erosi lereng saat hujan deras.',
    actionSteps: [
      'Tetap berjalan di jalur resmi tanpa memotong kompas melewati semak anakan pohon.',
      'Simpan bungkus makanan, sisa organik non-lokal (seperti biji buah luar daerah), dan tisu basah di kantong sampah pribadi.',
      'Hindari memberi makan satwa liar seperti monyet ekor panjang agar pola cari makan alaminya di hutan tidak rusak.',
    ],
    whyItMatters:
      'Biji buah dari luar ekosistem dapat tumbuh menjadi spesies invasif yang mendesak tanaman asli hutan.',
  },
  {
    id: 'protokol-pangan-lokal',
    code: 'PR-04',
    category: 'Konsumsi Harian',
    title: 'Memilih Produk Hasil Hutan Bukan Kayu (HHBK)',
    summary:
      'Masyarakat sekitar hutan dapat memperoleh penghasilan tanpa menebang pohon melalui panen madu hutan, rotan lestari, tengkawang, dan kopi agroforestri.',
    actionSteps: [
      'Beli madu hutan, gula aren, atau kopi dari koperasi petani hutan sosial yang menjaga tegakan pohon asli.',
      'Kurangi pemborosan minyak goreng di rumah tangga untuk menekan ekspansi perkebunan baru ke kawasan hutan.',
    ],
    whyItMatters:
      'Ketika pohon hidup memberi nilai ekonomi bagi warga lokal, masyarakat menjadi garda terdepan penjaga hutan.',
  },
  {
    id: 'protokol-reboisasi-tepat',
    code: 'PR-05',
    category: 'Pelaporan & Restorasi',
    title:
      'Menanam Pohon Lokal yang Sesuai Ekosistem, Bukan Sekadar Asal Tanam',
    summary:
      'Penanaman pohon asing yang tidak cocok dengan tanah lokal sering berakhir mati atau justru menguras mata air setempat.',
    actionSteps: [
      'Pilih bibit pohon endemik atau lokal (seperti beringin, trembesi, meranti, atau bakau untuk pesisir) saat kegiatan tanam pohon.',
      'Pastikan ada jadwal pemeliharaan minimal selama masa kritis tahun pertama setelah bibit ditanam.',
    ],
    whyItMatters:
      'Pohon lokal memiliki akar dan tajuk yang sudah beradaptasi dengan satwa penyerbuk serta siklus air daerah tersebut.',
  },
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    scenario: 'Skenario 01 / Perkemahan Pinggir Hutan',
    question:
      'Saat berkemah di tepi hutan pada musim kemarau, rekan timmu mengusulkan membuat api unggun langsung di atas tanah yang tampak hitam dan empuk penuh serasah kering. Apa langkah paling tepat?',
    options: [
      'Menolak membuat api unggun di atas tanah tersebut karena lapisan gambut/serasah dapat menyimpan bara api di bawah permukaan tanah.',
      'Tetap menyalakan api unggun asalkan disiram satu botol air sebelum tidur.',
      'Membuat api unggun lebih besar supaya cepat habis sebelum tengah malam.',
    ],
    correctIndex: 0,
    explanation:
      'Tanah bergambut atau berserasah tebal dapat terbakar secara smoldering (membara di bawah permukaan) meski bagian atasnya sudah disiram air sedikit. Gunakan kompor portabel berpenyangga.',
  },
  {
    id: 'q2',
    scenario: 'Skenario 02 / Pemulihan Mata Air Desa',
    question:
      'Komunitas kampusmu ingin mengadakan aksi penanaman pohon di sekitar hulu mata air yang mulai mengering. Jenis bibit mana yang paling mendukung fungsi hidrologis hutan?',
    options: [
      'Tanaman hias semusim yang cepat berbunga agar lokasi terlihat indah saat dokumentasi.',
      'Pohon berakar dalam dan bertajuk rimbun asli daerah tersebut seperti Beringin (Ficus) atau Aren yang mampu mengikat air tanah.',
      'Satu jenis pohon kayu cepat panen yang ditebang habis setiap tiga tahun.',
    ],
    correctIndex: 1,
    explanation:
      'Pohon keluarga Ficus (beringin/ara) dan aren memiliki sistem perakaran kuat yang menahan struktur tanah serta tajuk rapat yang menjaga kelembapan mata air.',
  },
  {
    id: 'q3',
    scenario: 'Skenario 03 / Jalur Pendakian Konservasi',
    question:
      'Kamu membawa buah jeruk dan apel impor sebagai bekal mendaki. Mengapa membuang biji dan kulit buah tersebut ke lantai hutan tidak dianjurkan?',
    options: [
      'Karena biji buah non-lokal berisiko tumbuh menjadi tanaman asing yang mengganggu vegetasi asli dan mengubah perilaku satwa liar.',
      'Karena kulit buah tidak bisa membusuk sama sekali seperti plastik.',
      'Hanya karena alasan estetika foto semata.',
    ],
    correctIndex: 0,
    explanation:
      'Meski organik, sisa buah dari luar ekosistem dapat membawa biji non-endemik atau menarik satwa liar berkumpul di jalur pendakian sehingga mengubah pola makan alami mereka.',
  },
  {
    id: 'q4',
    scenario: 'Skenario 04 / Ekonomi Masyarakat Hutan',
    question:
      'Bagaimana cara konsumen di perkotaan ikut menjaga tegakan pohon hutan tetap berdiri tanpa harus datang langsung ke hutan?',
    options: [
      'Membeli satwa liar dilindungi untuk dipelihara di rumah.',
      'Memilih produk Hasil Hutan Bukan Kayu (seperti madu hutan dan kopi naungan) serta kayu/kertas berlabel legalitas resmi.',
      'Menggunakan tisu kertas sebanyak mungkin setiap hari.',
    ],
    correctIndex: 1,
    explanation:
      'Hasil Hutan Bukan Kayu (HHBK) dipanen hanya jika pohon hutannya tetap sehat dan berdiri. Mendukung produk ini menjaga mata pencaharian warga lokal selaras dengan kelestarian hutan.',
  },
]

export const HABIT_PLEDGES: HabitPledge[] = [
  {
    id: 'pledge-1',
    label:
      'Mengurangi pemakaian tisu dan kertas sekali pakai dalam aktivitas kuliah/kerja harian.',
    impactNote: 'Menekan permintaan bahan baku serat kayu murni (virgin pulp).',
  },
  {
    id: 'pledge-2',
    label:
      'Membawa pulang seluruh sampah (termasuk sisa makanan non-lokal dan tisu basah) saat mengunjungi kawasan alam.',
    impactNote: 'Mencegah pencemaran lantai hutan dan penyebaran biji invasif.',
  },
  {
    id: 'pledge-3',
    label:
      'Tidak menyalakan api terbuka di lahan kering/gambut serta ikut menyebarkan literasi bahaya karhutla.',
    impactNote:
      'Melindungi cadangan karbon tanah dan habitat satwa dari kebakaran.',
  },
  {
    id: 'pledge-4',
    label:
      'Mendukung produk agroforestri dan menolak jual-beli satwa liar maupun tanaman hutan cabutan.',
    impactNote:
      'Menjaga rantai ekologi kanopi dan ekonomi warga sekitar hutan.',
  },
]
