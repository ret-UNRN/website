import { Sun, Moon } from 'lucide-react'
import { useDesktopStore } from '../../store/useDesktopStore'

export default function ThemeToggle() {
  const theme = useDesktopStore((s) => s.theme)
  const toggleTheme = useDesktopStore((s) => s.toggleTheme)

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center rounded p-1 text-muted transition-colors hover:text-text"
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  )
}
