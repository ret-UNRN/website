import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react'
import { useWindowSize } from '../../hooks/useWindowSize'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactApp() {
  const [status, setStatus] = useState<Status>('idle')
  const { isMobile, isTablet } = useWindowSize()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/REEMPLAZAR_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClasses = `w-full rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-xs text-text placeholder-muted/50 outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/30 hover:border-accent/50`
  const containerPadding = isMobile ? 'px-3 py-3' : isTablet ? 'px-4 py-4' : 'px-5 py-5'

  if (status === 'sent') {
    return (
      <div className={`flex h-full flex-col items-center justify-center gap-3 sm:gap-4 ${containerPadding}`}>
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-br from-green/30 to-green/10 blur-xl" />
          <CheckCircle size={isMobile ? 40 : isTablet ? 56 : 64} className="relative text-green" />
        </div>
        <div className="text-center space-y-1.5 sm:space-y-2">
          <p className={`font-mono font-bold text-green ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-lg md:text-xl'}`}>
            mensaje enviado
          </p>
          <p className={`font-mono text-muted ${isMobile ? 'text-[0.7rem]' : 'text-xs md:text-sm'}`}>
            te respondemos a la brevedad desde<br />
            <span className="text-accent font-semibold">info@retunrn.org</span>
          </p>
        </div>
        <div className={`rounded-lg border border-green/30 bg-green/5 px-3 py-2 font-mono text-green ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>
          $ sent → OK (200)
        </div>
        <button
          onClick={() => setStatus('idle')}
          className={`mt-1 font-mono text-accent transition-colors hover:text-accent-h ${isMobile ? 'text-[0.7rem]' : 'text-xs md:text-sm'}`}
        >
          ↻ enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-linear-to-br from-surface via-surface to-surface-2">
      <div className={`${containerPadding} border-b border-border`}>
        {/* Header */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-linear-to-br from-accent to-accent-h p-1.5">
              <Mail size={isMobile ? 14 : isTablet ? 16 : 18} className="text-white" />
            </div>
            <div>
              <h2 className={`font-mono font-bold text-text ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-lg'}`}>contacto</h2>
              <p className={`font-mono text-green ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>conectate con el club</p>
            </div>
          </div>
          <div className="h-0.5 w-8 bg-linear-to-r from-accent to-accent-h rounded-full" />
        </div>
      </div>

      {/* Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto">
        <div className={containerPadding}>

          {/* Form */}
          <form onSubmit={handleSubmit} className={isMobile ? 'space-y-2' : 'space-y-3'}>
            {/* Nombre */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className={`font-mono font-semibold text-text/70 uppercase tracking-wide ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>
                nombre
              </label>
              <input
                name="nombre"
                type="text"
                required
                placeholder="ej: Juan Pérez"
                className={inputClasses}
              />
            </div>

            {/* Email */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className={`font-mono font-semibold text-text/70 uppercase tracking-wide ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>
                email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className={inputClasses}
              />
            </div>

            {/* Tema */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className={`font-mono font-semibold text-text/70 uppercase tracking-wide ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>
                tema
              </label>
              <select
                name="tema"
                className={inputClasses}
                defaultValue="consulta"
              >
                <option value="consulta">Consulta general</option>
                <option value="proyecto">Tengo un proyecto</option>
                <option value="evento">Organizar un evento</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Mensaje */}
            <div className="space-y-0.5 sm:space-y-1">
              <label className={`font-mono font-semibold text-text/70 uppercase tracking-wide ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>
                mensaje
              </label>
              <textarea
                name="mensaje"
                required
                rows={isMobile ? 2 : 3}
                placeholder="cuéntanos..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/5 px-3 py-2">
                <AlertCircle size={12} className="shrink-0 text-accent" />
                <p className={`font-mono text-accent ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>
                  Error: intentá de nuevo
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`w-full flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-accent to-accent-h px-3 py-2 font-mono font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-accent/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0 sm:px-4 sm:py-2.5 ${isMobile ? 'text-[0.7rem]' : 'text-xs'}`}
            >
              {status === 'sending' ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  enviando...
                </>
              ) : (
                <>
                  <Send size={isMobile ? 12 : 14} />
                  enviar
                </>
              )}
            </button>

            {/* Footer text */}
            <p className={`text-center font-mono text-muted/50 ${isMobile ? 'text-[0.6rem]' : 'text-xs'}`}>
              respuesta en 24-48 horas
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
