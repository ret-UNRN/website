import { X, Minus, Maximize2, Minimize2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface WindowTitlebarProps {
  title: string
  icon: LucideIcon
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onPointerDown: () => void
  maximized?: boolean
  hideBorder?: boolean
}

export default function WindowTitlebar({
  title,
  icon: Icon,
  onClose,
  onMinimize,
  onMaximize,
  onPointerDown,
  maximized = false,
  hideBorder = false,
}: WindowTitlebarProps) {
  return (
    <div
      className={`flex h-9 items-center bg-surface-2 px-3 select-none ${hideBorder ? '' : 'border-b border-border'}`}
      onPointerDown={onPointerDown}
    >
      {/* Center: icon + title */}
      <div className="flex flex-1 items-center justify-left gap-1.5">
        <Icon size={13} className="shrink-0 text-text/50" />
        <span className="truncate font-mono text-xs text-text/60">{title}</span>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Minimize */}
        <button
          onPointerUp={(e) => { e.stopPropagation(); onMinimize() }}
          className="flex h-7 w-5 items-center justify-center"
          aria-label="Minimizar"
        >
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-text/20">
            <Minus size={9} className="text-text/70" strokeWidth={2.5} />
          </span>
        </button>

        {/* Maximize / Restore */}
        <button
          onPointerUp={(e) => { e.stopPropagation(); onMaximize() }}
          className="flex h-7 w-5 items-center justify-center"
          aria-label={maximized ? 'Restaurar' : 'Maximizar'}
        >
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-text/20">
            {maximized
              ? <Minimize2 size={9} className="text-text/70" strokeWidth={2.5} />
              : <Maximize2 size={9} className="text-text/70" strokeWidth={2.5} />
            }
          </span>
        </button>
        {/* Close */}
        <button
          onPointerUp={(e) => { e.stopPropagation(); onClose() }}
          className="flex h-7 w-5 items-center justify-center"
          aria-label="Cerrar"
        >
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-text/20">
            <X size={9} className="text-text/70" strokeWidth={2.5} />
          </span>
        </button>
      </div>
    </div>
  )
}
