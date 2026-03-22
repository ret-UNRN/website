import { Github } from 'lucide-react'
import Clock from '../ui/Clock'
import ThemeToggle from '../ui/ThemeToggle'
import DiscordIcon from '../ui/DiscordIcon'

export default function Taskbar() {
  return (
    <div className="flex h-8 shrink-0 items-center bg-surface px-4 font-mono text-xs backdrop-blur-sm transition-colors">
      {/* Left: retUNRN brand */}
      <div className="flex flex-1 items-center">
        <span className="text-xs text-text">
          ret<span className="font-bold text-accent">UNRN</span>
          <span className="ml-1.5 text-muted/50">OS</span>
        </span>
      </div>

      {/* Center: Clock */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Clock />
      </div>

      {/* Right: System indicators */}
      <div className="flex items-center gap-1">
        <a
          href="https://discord.gg/PENDIENTE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center rounded p-1 text-muted transition-colors hover:text-text"
          aria-label="Discord"
        >
          <DiscordIcon size={14} />
        </a>
        <a
          href="https://github.com/ret-unrn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center rounded p-1 text-muted transition-colors hover:text-text"
          aria-label="GitHub"
        >
          <Github size={14} />
        </a>
        <ThemeToggle />
      </div>
    </div>
  )
}
