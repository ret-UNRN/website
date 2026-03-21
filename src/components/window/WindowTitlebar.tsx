import { X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface WindowTitlebarProps {
  title: string
  icon: LucideIcon
  onClose: () => void
  onPointerDown: () => void
}

export default function WindowTitlebar({
  title,
  icon: Icon,
  onClose,
  onPointerDown,
}: WindowTitlebarProps) {
  return (
    <div
      className="flex h-10 items-center border-b border-border bg-surface-2 px-4 select-none"
      onPointerDown={onPointerDown}
    >
      {/* Left: icon + title */}
      <div className="flex flex-1 items-center gap-2">
        <Icon size={14} className="shrink-0 text-text/70" />
        <span className="truncate font-mono text-xs text-text/70">{title}</span>
      </div>

      {/* Right: close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="group ml-4 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-border transition-colors hover:bg-accent"
        aria-label="Cerrar"
      >
        <X
          size={8}
          className="opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: '#ffffff' }}
          strokeWidth={2.5}
        />
      </button>
    </div>
  )
}
