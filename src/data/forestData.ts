export interface QuizQuestion {
  id: string
  scenario: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

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
