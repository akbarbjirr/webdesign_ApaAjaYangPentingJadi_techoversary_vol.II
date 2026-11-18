import { useState, type FormEvent } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'

export function ContactPage() {
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [messageText, setMessageText] = useState('')
  const [errorText, setErrorText] = useState('')
  const [submittedName, setSubmittedName] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanName = senderName.trim()
    if (!cleanName || !senderEmail.trim() || !messageText.trim()) {
      setErrorText(
        'Mohon lengkapi nama, alamat email, dan isi pesan sebelum mengirim.',
      )
      setSubmittedName('')
      return
    }
    setErrorText('')
    setSubmittedName(cleanName)
    setSenderName('')
    setSenderEmail('')
    setMessageText('')
  }

  return (
    <main
      id="konten-utama"
      className="min-h-screen bg-white py-14 text-neutral-950 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <ScrollReveal
          as="h1"
          className="max-w-xl text-3xl leading-[1.2] font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.75rem]"
        >
          {'Punya Ide untuk Bumi yang Lebih\nBaik?'}
        </ScrollReveal>

        <form onSubmit={handleSubmit} noValidate className="mt-10 sm:mt-14">
          <div className="grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12">
            <div>
              <label
                htmlFor="nama-pengirim"
                className="mb-2.5 block text-xs font-medium text-neutral-800 sm:text-sm"
              >
                Nama Kamu
              </label>
              <input
                id="nama-pengirim"
                type="text"
                maxLength={80}
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value)
                  if (errorText) setErrorText('')
                }}
                placeholder="Masukkan nama kamu"
                required
                className="h-12 w-full rounded-xl border border-neutral-200/80 bg-[#f6f6f6] px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email-pengirim"
                className="mb-2.5 block text-xs font-medium text-neutral-800 sm:text-sm"
              >
                Email Kamu
              </label>
              <input
                id="email-pengirim"
                type="email"
                maxLength={120}
                value={senderEmail}
                onChange={(e) => {
                  setSenderEmail(e.target.value)
                  if (errorText) setErrorText('')
                }}
                placeholder="nama@email.com"
                required
                className="h-12 w-full rounded-xl border border-neutral-200/80 bg-[#f6f6f6] px-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 max-w-lg">
            <label
              htmlFor="pesan-pengirim"
              className="mb-2.5 block text-xs font-medium text-neutral-800 sm:text-sm"
            >
              Pesan
            </label>
            <textarea
              id="pesan-pengirim"
              rows={6}
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value)
                if (errorText) setErrorText('')
              }}
              placeholder="Pesan Anda"
              required
              className="w-full rounded-2xl border border-neutral-200/80 bg-[#f6f6f6] p-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:outline-none"
            />
          </div>

          {errorText && (
            <div
              role="alert"
              className="mt-5 max-w-lg rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-900 sm:text-sm"
            >
              {errorText}
            </div>
          )}

          {submittedName && (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 max-w-lg rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-xs font-semibold text-green-900 sm:text-sm"
            >
              {`Terima kasih, ${submittedName}. Ide dan pesan kamu telah berhasil tercatat.`}
            </div>
          )}

          <button
            type="submit"
            className="mt-8 inline-flex min-h-11 min-w-36 items-center justify-center rounded-full bg-[#171717] px-8 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 active:scale-[0.99] sm:text-sm"
          >
            Kirim
          </button>
        </form>
      </div>
    </main>
  )
}
