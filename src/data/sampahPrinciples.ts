import {
  ClockCounterClockwise,
  Eye,
  GlobeHemisphereWest,
  GraduationCap,
  HandHeart,
  PiggyBank,
  Plant,
  Trash,
} from '@phosphor-icons/react'
import type { SampahPrincipleContent } from '@/components/SampahPrincipleLayout'

export const REDUCE_PRINCIPLE_CONTENT: SampahPrincipleContent = {
  breadcrumbLabel: 'Reduce',
  heroTitle: 'Kurangi Sebelum Menjadi\nSampah',
  heroIntro:
    'Setiap barang yang kita gunakan memiliki potensi menjadi sampah. Dengan mengurangi penggunaan barang sekali pakai dan memilih kebutuhan secara bijak, kita dapat membantu menjaga lingkungan sejak awal.',
  definitionTerm: 'Apa itu Reduce?',
  definitionBody:
    'Adalah upaya mengurangi jumlah sampah dengan membatasi penggunaan barang yang berpotensi menjadi limbah. Prinsip ini mengajak kita untuk lebih bijak dalam memilih, membeli, dan menggunakan sesuatu.',
  whyImage:
    'https://images.unsplash.com/photo-1762805543729-361d38e78a37?auto=format&fit=crop&w=1100&h=1300&q=80',
  whyImageAlt:
    'Petugas kebersihan mengangkut tempat sampah ke truk pengangkut sampah di jalan',
  whyHeading: 'Mengapa Kita Perlu Mengurangi\nSampah?',
  whyIntro:
    'Semakin banyak barang yang kita konsumsi, semakin besar potensi sampah yang dihasilkan.',
  reasons: [
    {
      id: 'pencemaran',
      title: 'Mengurangi Pencemaran',
      description:
        'Lebih sedikit sampah berarti lebih sedikit potensi limbah yang mencemari alam.',
      Icon: Eye,
    },
    {
      id: 'sumber-daya',
      title: 'Menjaga Sumber Daya',
      description:
        'Mengurangi konsumsi membantu menekan kebutuhan bahan baku dan energi.',
      Icon: GlobeHemisphereWest,
    },
    {
      id: 'kebiasaan-baik',
      title: 'Menciptakan Kebiasaan Baik',
      description:
        'Mendorong pola hidup yang lebih bijak dan bertanggung jawab.',
      Icon: HandHeart,
    },
  ],
  parallaxLabel: 'Langkah Nyata Reduce',
  parallaxBands: [
    {
      id: 'bawa-tas-belanja',
      title: 'Bawa Tas Belanja Sendiri',
      description: 'Kurangi penggunaan kantong plastik saat berbelanja.',
      image:
        'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=1600&q=80',
      alt: 'Tas belanja ramah lingkungan berisi sayuran dan buah segar',
    },
    {
      id: 'gunakan-botol-isi-ulang',
      title: 'Gunakan Botol Isi Ulang',
      description:
        'Hindari membeli minuman dengan kemasan sekali pakai jika tersedia alternatif.',
      image:
        'https://images.unsplash.com/photo-1619020986176-50be596d0c02?auto=format&fit=crop&w=1600&q=80',
      alt: 'Botol minum stainless steel isi ulang',
    },
    {
      id: 'bawa-bekal-sendiri',
      title: 'Bawa Bekal Sendiri',
      description: 'Gunakan wadah makan yang bisa dipakai berulang kali.',
      image:
        'https://images.unsplash.com/photo-1744957280662-af6472128abd?auto=format&fit=crop&w=1600&q=80',
      alt: 'Wadah kotak bekal makanan sehat yang dapat dipakai berulang kali',
    },
    {
      id: 'belanja-sesuai-kebutuhan',
      title: 'Belanja Sesuai Kebutuhan',
      description: 'Hindari membeli barang atau makanan secara berlebihan.',
      image:
        'https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?auto=format&fit=crop&w=1600&q=80',
      alt: 'Belanja bahan kebutuhan segar di rak supermarket',
    },
  ],
  tipsHeading: '5 Cara Sederhana Mengurangi\nSampah.',
  tipsIntro:
    'Tidak perlu menunggu kesempatan khusus untuk mulai peduli lingkungan. Berikut beberapa langkah sederhana yang bisa langsung diterapkan.',
  tips: [
    {
      number: '01',
      title: 'Hindari Barang Sekali Pakai',
      description:
        'Gunakan alternatif yang dapat dipakai berulang kali, seperti sedotan stainless atau alat makan pribadi.',
      image:
        'https://images.unsplash.com/photo-1621448594471-726ea66ed97f?auto=format&fit=crop&w=900&q=80',
      alt: 'Minuman segar dalam gelas dengan sedotan',
    },
    {
      number: '02',
      title: 'Pilih Produk dengan Kemasan Minimal',
      description:
        'Utamakan produk yang tidak menggunakan banyak lapisan kemasan yang tidak diperlukan.',
      image:
        'https://images.unsplash.com/photo-1598563597339-df4d424e8959?auto=format&fit=crop&w=900&q=80',
      alt: 'Tas kain isi ulang berisi sayuran dan buah segar tanpa kemasan berlebih',
    },
    {
      number: '03',
      title: 'Hindari Membuang Makanan',
      description:
        'Ambil makanan secukupnya dan simpan bahan makanan dengan baik agar tidak terbuang.',
      image:
        'https://images.unsplash.com/photo-1744957280662-af6472128abd?auto=format&fit=crop&w=900&q=80',
      alt: 'Hidangan secukupnya di dalam wadah makanan rapi',
    },
    {
      number: '04',
      title: 'Belanja dengan Bijak',
      description:
        'Pertimbangkan kebutuhan sebelum membeli barang baru agar tidak menghasilkan sampah konsumsi berlebihan.',
      image:
        'https://images.unsplash.com/photo-1693505628207-dbeb3d882c92?auto=format&fit=crop&w=900&q=80',
      alt: 'Keranjang belanja berisi bahan kebutuhan di lorong supermarket',
    },
    {
      number: '05',
      title: 'Pilih Produk Isi Ulang',
      description:
        'Gunakan produk isi ulang ketika tersedia untuk mengurangi kebutuhan kemasan baru.',
      image:
        'https://images.unsplash.com/photo-1784039518522-ec4cf52a294f?auto=format&fit=crop&w=900&q=80',
      alt: 'Wadah dan produk isi ulang ramah lingkungan di keranjang belanja',
    },
  ],
  ctaEyebrow: 'Menjaga Bumi Dimulai dari Kita.',
  ctaHeading:
    'Tidak semua perubahan harus dimulai dengan tindakan besar. Kebiasaan sederhana yang dilakukan secara konsisten dapat membantu menjaga lingkungan.',
  nextCta: {
    label: 'Reuse',
    to: '/sampah/reuse',
  },
}

export const REUSE_PRINCIPLE_CONTENT: SampahPrincipleContent = {
  ...REDUCE_PRINCIPLE_CONTENT,
  breadcrumbLabel: 'Reuse',
  heroTitle: 'Barang Lama, Manfaat Baru',
  heroIntro:
    'Barang yang sudah tidak digunakan bukan berarti kehilangan seluruh manfaatnya. Dengan memanfaatkan kembali barang yang masih layak, kita dapat mengurangi sampah sekaligus memberikan kesempatan baru bagi barang tersebut untuk digunakan.',
  definitionTerm: 'Apa itu Reuse?',
  definitionBody:
    'Reuse merupakan upaya menggunakan kembali barang yang masih layak pakai, baik untuk fungsi yang sama maupun fungsi yang berbeda. Prinsip ini mengajak kita untuk tidak terburu-buru membuang barang dan mulai melihat potensi manfaat dari benda yang sudah dimiliki.',
  whyImage:
    'https://images.unsplash.com/photo-1753354868656-53671f69602a?auto=format&fit=crop&w=1100&h=1300&q=80',
  whyImageAlt:
    'Seorang wanita memilih produk ramah lingkungan sambil membawa keranjang belanja',
  whyHeading: 'Mengapa Menggunakan Kembali\nItu Penting?',
  whyIntro:
    'Banyak barang yang berakhir menjadi sampah meskipun sebenarnya masih dapat digunakan.',
  reasons: [
    {
      id: 'mengurangi-sampah',
      title: 'Mengurangi Sampah',
      description:
        'Lebih sedikit sampah berarti lebih sedikit potensi limbah yang mencemari alam.',
      Icon: Trash,
    },
    {
      id: 'memperpanjang-umur-barang',
      title: 'Memperpanjang Umur Barang',
      description:
        'Mengurangi konsumsi membantu menekan kebutuhan bahan baku dan energi.',
      Icon: ClockCounterClockwise,
    },
    {
      id: 'menghemat-pengeluaran',
      title: 'Menghemat Pengeluaran',
      description:
        'Mendorong pola hidup yang lebih bijak dan bertanggung jawab.',
      Icon: PiggyBank,
    },
  ],
  parallaxLabel: 'Langkah Nyata Reuse',
  parallaxBands: [
    {
      id: 'gunakan-kembali-wadah',
      title: 'Gunakan Kembali Wadah',
      description:
        'Manfaatkan botol atau stoples bekas sebagai tempat penyimpanan.',
      image:
        'https://images.unsplash.com/photo-1645567454567-901dc409551b?auto=format&fit=crop&w=1600&q=80',
      alt: 'Deretan stoples kaca bekas yang dimanfaatkan kembali sebagai wadah penyimpanan',
    },
    {
      id: 'donasikan-pakaian',
      title: 'Donasikan Pakaian',
      description: 'Berikan pakaian layak pakai kepada orang yang membutuhkan.',
      image:
        'https://plus.unsplash.com/premium_photo-1661964021703-59bbdcdbfdab?auto=format&fit=crop&w=1600&q=80',
      alt: 'Seseorang menata dan melipat pakaian layak pakai ke dalam kardus donasi',
    },
    {
      id: 'perbaiki-barang-rusak',
      title: 'Perbaiki Barang Rusak',
      description:
        'Coba perbaiki barang yang masih memiliki potensi untuk digunakan.',
      image:
        'https://plus.unsplash.com/premium_photo-1663025422368-4ddce39a1462?auto=format&fit=crop&w=1600&q=80',
      alt: 'Perajin memperbaiki perabot kayu agar tetap kokoh dan dapat digunakan kembali',
    },
    {
      id: 'ubah-fungsi-barang',
      title: 'Ubah Fungsi Barang',
      description:
        'Jadikan kaleng atau wadah bekas sebagai pot tanaman atau tempat alat tulis.',
      image:
        'https://images.unsplash.com/photo-1772371145511-3f89a21e8b39?auto=format&fit=crop&w=1600&q=80',
      alt: 'Wadah bekas yang dialihfungsikan menjadi pot tanaman di dekat jendela',
    },
  ],
  tipsHeading: '5 Cara Sederhana Menerapkan\nReuse.',
  tipsIntro:
    'Tidak semua barang yang sudah digunakan harus berakhir di tempat sampah. Berikut beberapa cara sederhana untuk memberikan manfaat baru pada barang yang masih layak.',
  tips: [
    {
      number: '01',
      title: 'Manfaatkan Wadah Bekas',
      description:
        'Gunakan kembali botol kaca, stoples, atau wadah plastik yang masih aman dan layak untuk menyimpan barang.',
      image:
        'https://images.unsplash.com/photo-1645567454567-901dc409551b?auto=format&fit=crop&w=900&q=80',
      alt: 'Deretan stoples kaca berisi bahan makanan di rak dapur',
    },
    {
      number: '02',
      title: 'Donasikan Barang Layak Pakai',
      description:
        'Berikan pakaian, buku, atau barang lain yang sudah tidak dibutuhkan kepada orang yang dapat memanfaatkannya.',
      image:
        'https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?auto=format&fit=crop&w=900&q=80',
      alt: 'Kardus donasi berisi pakaian layak pakai siap disalurkan',
    },
    {
      number: '03',
      title: 'Perbaiki Sebelum Mengganti',
      description:
        'Jika barang mengalami kerusakan ringan, pertimbangkan untuk memperbaikinya daripada langsung membeli yang baru.',
      image:
        'https://plus.unsplash.com/premium_photo-1663025422368-4ddce39a1462?auto=format&fit=crop&w=900&q=80',
      alt: 'Proses memperbaiki perabot kayu agar kembali layak digunakan',
    },
    {
      number: '04',
      title: 'Kreasikan Barang Bekas',
      description:
        'Ubah barang yang sudah tidak digunakan menjadi benda baru, seperti kaleng menjadi tempat pensil atau wadah menjadi pot tanaman.',
      image:
        'https://images.unsplash.com/photo-1759746571141-30a56dde257e?auto=format&fit=crop&w=900&q=80',
      alt: 'Wadah daur ulang berisi pensil warna dan perlengkapan tulis',
    },
    {
      number: '05',
      title: 'Pilih Barang Bekas Berkualitas',
      description:
        'Pertimbangkan membeli barang bekas yang masih bagus dan berfungsi untuk mengurangi kebutuhan produksi barang baru.',
      image:
        'https://images.unsplash.com/photo-1768321612089-cad6e7751bc1?auto=format&fit=crop&w=900&q=80',
      alt: 'Beragam barang bekas berkualitas yang masih layak pakai di pasar barang bekas',
    },
  ],
  nextCta: {
    label: 'Recycle',
    to: '/sampah/recycle',
  },
}

export const RECYCLE_PRINCIPLE_CONTENT: SampahPrincipleContent = {
  ...REDUCE_PRINCIPLE_CONTENT,
  breadcrumbLabel: 'Recycle',
  heroTitle: 'Sampah Diolah, Manfaat\nBertambah.',
  heroIntro:
    'Sampah tidak selalu harus berakhir di tempat pembuangan. Melalui proses daur ulang, berbagai jenis sampah dapat diolah menjadi bahan atau produk baru yang bermanfaat. Mulailah mengenali dan memilah sampah agar dapat dimanfaatkan kembali dengan lebih baik.',
  definitionTerm: 'Apa itu Recycle?',
  definitionBody:
    'Recycle merupakan proses mengolah sampah atau material bekas menjadi bahan baku maupun produk baru yang dapat dimanfaatkan kembali. Prinsip ini membantu mengurangi sampah yang dibuang sekaligus memberikan nilai guna pada material yang sebelumnya sudah tidak terpakai.',
  whyImage:
    'https://plus.unsplash.com/premium_photo-1683063005230-ec93739b6dd8?auto=format&fit=crop&w=1100&h=1300&q=80',
  whyImageAlt:
    'Relawan membawa tempat sampah daur ulang berisi botol plastik untuk diolah kembali',
  whyHeading: 'Mengapa Daur Ulang Itu\nPenting?',
  whyIntro:
    'Sampah yang tidak dikelola dengan baik dapat menumpuk dan mencemari lingkungan. Daur ulang menjadi salah satu cara untuk memanfaatkannya.',
  reasons: [
    {
      id: 'mengurangi-sampah-tpa',
      title: 'Mengurangi Sampah ke TPA',
      description:
        'Daur ulang membantu mengalihkan material yang masih dapat diolah agar tidak langsung berakhir di tempat pembuangan akhir.',
      Icon: GraduationCap,
    },
    {
      id: 'menghemat-bahan-baku',
      title: 'Menghemat Bahan Baku',
      description:
        'Memanfaatkan material daur ulang dapat mengurangi kebutuhan penggunaan bahan mentah baru.',
      Icon: HandHeart,
    },
    {
      id: 'mendorong-pengelolaan-sampah',
      title: 'Mendorong Pengelolaan Sampah',
      description:
        'Kebiasaan memilah dan mendaur ulang membantu membangun lingkungan yang lebih bersih dan bertanggung jawab.',
      Icon: Plant,
    },
  ],
  parallaxLabel: 'Langkah Nyata Recycle',
  parallaxBands: [
    {
      id: 'pilah-sampah-plastik',
      title: 'Pilah Sampah Plastik',
      description:
        'Pisahkan botol dan kemasan plastik yang dapat didaur ulang.',
      image:
        'https://images.unsplash.com/photo-1558583082-409143c794ca?auto=format&fit=crop&w=1600&q=80',
      alt: 'Botol dan kemasan plastik yang dipilah untuk didaur ulang',
    },
    {
      id: 'kumpulkan-kertas-bekas',
      title: 'Kumpulkan Kertas Bekas',
      description:
        'Pisahkan koran, kardus, dan kertas yang masih dapat diolah.',
      image:
        'https://images.unsplash.com/photo-1781243680823-aae6c7f1ff12?auto=format&fit=crop&w=1600&q=80',
      alt: 'Tumpukan koran, kardus, dan kertas bekas yang dikumpulkan untuk daur ulang',
    },
    {
      id: 'pisahkan-botol-kaca',
      title: 'Pisahkan Botol Kaca',
      description:
        'Kumpulkan botol dan wadah kaca secara terpisah agar mudah dikelola.',
      image:
        'https://images.unsplash.com/photo-1654718421032-8aee5603b51f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Botol dan wadah kaca dipisahkan ke dalam tempat penampungan daur ulang',
    },
    {
      id: 'olah-sampah-organik',
      title: 'Olah Sampah Organik',
      description:
        'Manfaatkan sisa makanan dan bahan organik tertentu untuk dijadikan kompos.',
      image:
        'https://plus.unsplash.com/premium_photo-1724660929189-6d7db3b165a0?auto=format&fit=crop&w=1600&q=80',
      alt: 'Wadah pengolahan sisa makanan dan sampah organik menjadi kompos',
    },
  ],
  tipsHeading: '5 Cara Sederhana Mendukung\nDaur Ulang.',
  tipsIntro:
    'Tidak semua barang yang sudah digunakan harus berakhir di tempat sampah. Berikut beberapa cara sederhana untuk memberikan manfaat baru pada barang yang masih layak.',
  tips: [
    {
      number: '01',
      title: 'Pisahkan Sampah Berdasarkan Jenisnya',
      description:
        'Kelompokkan sampah organik, plastik, kertas, kaca, dan logam agar lebih mudah dikelola.',
      image:
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80',
      alt: 'Deretan tempat sampah pilah berwarna-warni untuk pemisahan sampah daur ulang',
    },
    {
      number: '02',
      title: 'Bersihkan Kemasan Bekas',
      description:
        'Kosongkan dan bersihkan kemasan dari sisa makanan atau minuman sebelum dikumpulkan untuk didaur ulang.',
      image:
        'https://images.unsplash.com/photo-1661337999810-120505b2a912?auto=format&fit=crop&w=900&q=80',
      alt: 'Tangan membilas wadah botol bekas dengan air mengalir sebelum didaur ulang',
    },
    {
      number: '03',
      title: 'Siapkan Material untuk Didaur Ulang',
      description:
        'Lipat kardus dan pisahkan material sesuai jenisnya agar lebih mudah disimpan dan diangkut.',
      image:
        'https://images.unsplash.com/photo-1514792368985-f80e9d482a02?auto=format&fit=crop&w=900&q=80',
      alt: 'Tumpukan kardus bekas yang dilipat rapi untuk disalurkan ke proses daur ulang',
    },
    {
      number: '04',
      title: 'Manfaatkan Bank Sampah',
      description:
        'Setorkan sampah anorganik yang sudah dipilah ke bank sampah atau tempat pengumpulan yang menerima material tersebut.',
      image:
        'https://images.unsplash.com/photo-1758599668426-1cf242bb7667?auto=format&fit=crop&w=900&q=80',
      alt: 'Kegiatan warga mengumpulkan dan memilah botol plastik bersama untuk didaur ulang',
    },
    {
      number: '05',
      title: 'Olah Sampah Organik Menjadi Kompos',
      description:
        'Manfaatkan sisa sayuran, daun kering, dan bahan organik yang sesuai untuk menghasilkan kompos.',
      image:
        'https://plus.unsplash.com/premium_photo-1724100592091-0317f05719c7?auto=format&fit=crop&w=900&q=80',
      alt: 'Sisa sayuran dan kulit buah yang disiapkan sebagai bahan kompos organik',
    },
  ],
  nextCta: {
    label: 'Mulai Dari Sini',
    to: '/quiz',
  },
}
