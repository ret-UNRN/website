import type { LucideIcon } from 'lucide-react'

interface DesktopIconProps {
  label: string
  icon: LucideIcon
  onClick: () => void
  isOpen?: boolean
}

export default function DesktopIcon({
  label,
  icon: Icon,
  onClick,
  isOpen = false,
}: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-[96px] flex-col items-center gap-2 rounded-xl p-2.5 transition-all hover:bg-white/[0.06] active:scale-95"
    >
      {/* Dot indicator above icon */}
      <span
        className={`absolute top-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity ${isOpen ? 'opacity-100 animate-[pulse_1.4s_ease-in-out_3]' : 'opacity-0'}`}
      />

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface/80 shadow-sm transition-all group-hover:bg-surface group-hover:shadow-md">
        <Icon
          size={26}
          className="text-text/70 transition-colors group-hover:text-text"
        />
      </div>
      <span className="w-full break-words text-center font-mono text-[0.65rem] leading-snug text-text/60 transition-colors group-hover:text-text">
        {label}
      </span>
    </button>
  )
}
