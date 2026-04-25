import { Newspaper, Rss } from 'lucide-react'
import { useWindowSize } from '../../hooks/useWindowSize'

export default function NewsApp() {
  const { isMobile } = useWindowSize()
  const padding = isMobile ? 'px-4 py-4' : 'px-6 py-6'
  const headerText = isMobile ? 'text-[0.7rem]' : 'text-xs'

  return (
    <div className={`h-full overflow-auto ${padding}`}>
      <div className="mx-auto flex h-full max-w-2xl flex-col">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className={`font-mono ${headerText} text-muted`}>
            $ tail -f ~/noticias.log
          </span>
          <span className={`flex items-center gap-1 font-mono ${headerText} text-muted`}>
            <Rss size={isMobile ? 10 : 12} className="text-accent" />
            feed
          </span>
        </div>

        {/* Empty state */}
        <div
          className="flex flex-1 flex-col items-center justify-center gap-4 py-8"
          style={{ animation: 'slide-in 220ms ease-out both' }}
        >
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface-2">
            <Newspaper size={36} className="text-text/40" />
            <span
              className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent"
              style={{ animation: 'pulse 1.4s ease-in-out infinite' }}
            />
          </div>

          <div className="text-center">
            <p className="font-mono text-base font-bold text-text">
              Próximamente
            </p>
            <p className="mt-1 max-w-xs font-mono text-xs leading-relaxed text-muted">
              Las novedades del club van a aparecer acá: torneos, logros,
              anuncios y más.
            </p>
          </div>

          <div className="font-mono text-[0.7rem] text-muted">
            <span className="text-green">$</span> waiting for push
            <span className="animate-[blink_700ms_step-end_infinite] ml-0.5 inline-block">
              ▌
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
