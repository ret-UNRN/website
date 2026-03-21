import { useState } from 'react'
import { Send } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactApp() {
  const [status, setStatus] = useState<Status>('idle')

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

  if (status === 'sent') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p className="font-mono text-sm text-green">mensaje enviado</p>
        <p className="font-mono text-xs text-muted">
          te respondemos a la brevedad desde info@retunrn.org
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 font-mono text-xs text-accent hover:underline"
        >
          enviar otro
        </button>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto px-6 py-6">
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <h2 className="font-mono text-2xl font-bold text-text">contacto</h2>
          <p className="mt-1 font-mono text-xs text-muted">
            info@retunrn.org
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="font-mono text-xs text-muted">nombre</label>
            <input
              name="nombre"
              type="text"
              required
              placeholder="tu nombre"
              className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-sm text-text placeholder-muted/50 outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-xs text-muted">email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-sm text-text placeholder-muted/50 outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-xs text-muted">mensaje</label>
            <textarea
              name="mensaje"
              required
              rows={5}
              placeholder="¿en qué podemos ayudarte?"
              className="w-full resize-none rounded-lg border border-border bg-surface-2 px-3 py-2 font-mono text-sm text-text placeholder-muted/50 outline-none focus:border-accent transition-colors"
            />
          </div>

          {status === 'error' && (
            <p className="font-mono text-xs text-accent">
              error al enviar — intentá de nuevo
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm text-white transition-colors hover:bg-accent-h disabled:opacity-50"
          >
            <Send size={14} />
            {status === 'sending' ? 'enviando...' : 'enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}
