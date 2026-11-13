import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'

export function ContactPage() {
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [messageText, setMessageText] = useState('')
  const [errorText, setErrorText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!senderName.trim() || !senderEmail.trim() || !messageText.trim()) {
      setErrorText(
        'Mohon lengkapi nama, alamat surel, dan isi pesan sebelum mengirim.',
      )
      setSubmitted(false)
      return
    }
    setErrorText('')
    setSubmitted(true)
  }

  return (
    <main id="konten-utama" className="min-h-screen py-12 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 border-b border-[var(--border-strong)] pb-6">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
            Formulir Aspirasi &amp; Kontak Tim
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            Kirimkan masukan edukasi kehutanan atau catatan kolaborasi untuk tim
            pengembang.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 sm:p-8"
        >
          <div>
            <label
              htmlFor="nama-pengirim"
              className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]"
            >
              Nama Lengkap
            </label>
            <input
              id="nama-pengirim"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Nama Anda"
              required
              className="min-h-11 w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3.5 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </div>

          <div>
            <label
              htmlFor="email-pengirim"
              className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]"
            >
              Alamat Surel (Email)
            </label>
            <input
              id="email-pengirim"
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="email@contoh.com"
              required
              className="min-h-11 w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3.5 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </div>

          <div>
            <label
              htmlFor="pesan-pengirim"
              className="mb-1.5 block text-sm font-semibold text-[var(--text-primary)]"
            >
              Pesan atau Usulan Topik Edukasi Hutan
            </label>
            <textarea
              id="pesan-pengirim"
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Tulis usulan materi edukasi atau pesan Anda di sini..."
              required
              className="w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </div>

          {errorText && (
            <div
              role="alert"
              className="rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-3.5 text-sm font-semibold text-[var(--accent-warm)]"
            >
              {errorText}
            </div>
          )}

          {submitted && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-md border border-[var(--accent-primary)] bg-[var(--bg-elevated)] p-4 text-sm font-semibold text-[var(--text-primary)]"
            >
              Terima kasih, {senderName}. Pesan aspirasi Anda telah tercatat di
              sistem simulasi lokal.
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-md bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)]"
            >
              Kirim Pesan Aspirasi
            </button>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
