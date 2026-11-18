# Under

Platform web edukasi interaktif tentang konservasi hutan Indonesia, perlindungan satwa liar, pengelolaan sampah **3R** (_Reduce, Reuse, Recycle_), serta kuis lingkungan interaktif.

Live demo: [under-iota.vercel.app](https://under-iota.vercel.app)

## Fitur Utama

- **Beranda (`/`)**: Pengantar misi konservasi, statistik ekosistem, dan navigasi ke seluruh pilar edukasi.
- **Edukasi Hutan (`/hutan`)**: Informasi ekosistem hutan, ancaman deforestasi, dan upaya pelestarian.
- **Satwa (`/satwa`)**: Pengenalan satwa endemik Indonesia dan status perlindungannya.
- **Sampah 3R (`/sampah`)**: Panduan pengelolaan sampah beserta halaman khusus **Reduce** (`/sampah/reduce`), **Reuse** (`/sampah/reuse`), dan **Recycle** (`/sampah/recycle`).
- **Kuis Interaktif (`/quiz`)**: Kuis pemahaman lingkungan dengan skor yang tersimpan melalui Supabase.
- **Tentang & Kontak (`/about`, `/contact`)**: Informasi tim dan formulir pengiriman ide/masukan.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, React Router 8
- **Styling**: Tailwind CSS v4
- **Animasi & Scroll**: GSAP, Lenis, SplitType
- **Backend / Database**: Supabase (`@supabase/supabase-js`)
- **Deploy**: Vercel (SPA rewrite + cache/security headers di `vercel.json`)

## Cara Setup Lokal

### 1. Prasyarat

- **Node.js** >= 20 dan **npm**
- Akun/project **Supabase** (untuk fitur kuis)

### 2. Clone & Install Dependencies

```bash
git clone https://github.com/akbarbjirr/webdesign_ApaAjaYangPentingJadi_techoversary_vol.II.git
cd webdesign_ApaAjaYangPentingJadi_techoversary_vol.II
npm install
```

### 3. Konfigurasi Environment Variable

Buat file `.env` di root project dan isi kredensial Supabase:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<supabase-publishable-or-anon-key>
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

## Script Tersedia

| Perintah               | Deskripsi                                                        |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Menjalankan server pengembangan Vite                             |
| `npm run build`        | Type-check TypeScript (`tsc -b`) dan build production ke `dist/` |
| `npm run preview`      | Preview hasil build production secara lokal                      |
| `npm run lint`         | Menjalankan ESLint                                               |
| `npm run format`       | Memformat kode dengan Prettier                                   |
| `npm run format:check` | Mengecek format kode tanpa mengubah file                         |
