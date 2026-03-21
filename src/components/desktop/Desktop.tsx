import { useEffect, type ComponentType } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { APPS } from '../../constants/apps'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import Window from '../window/Window'
import WelcomeApp from '../apps/WelcomeApp'
import AboutApp from '../apps/AboutApp'
import ProjectsApp from '../apps/ProjectsApp'
import CalendarApp from '../apps/CalendarApp'
import ContactApp from '../apps/ContactApp'
import TerminalApp from '../apps/TerminalApp'
import type { AppId } from '../../store/useDesktopStore'

const APP_COMPONENTS: Record<AppId, ComponentType> = {
  welcome: WelcomeApp,
  about: AboutApp,
  projects: ProjectsApp,
  calendar: CalendarApp,
  contact: ContactApp,
  terminal: TerminalApp,
}

const APP_TITLES: Record<AppId, string> = {
  welcome: 'inicio',
  about: 'quienes-somos',
  projects: 'proyectos',
  calendar: 'agenda',
  contact: 'contacto',
  terminal: 'terminal',
}

export default function Desktop() {
  const windows = useDesktopStore((s) => s.windows)
  const openWindow = useDesktopStore((s) => s.openWindow)
  const focusWindow = useDesktopStore((s) => s.focusWindow)

  // Open WelcomeApp on first render after boot
  useEffect(() => {
    openWindow('welcome')
  }, [openWindow])

  const handleIconClick = (id: AppId) => {
    const isOpen = windows.some((w) => w.id === id)
    if (isOpen) {
      focusWindow(id)
    } else {
      openWindow(id)
    }
  }

  return (
    <div className="flex h-full flex-col bg-bg">
      {/* GNOME-style top panel */}
      <Taskbar />

      {/* Desktop area with icons and windows */}
      <div className="relative flex-1 overflow-hidden">
        {/* Icon grid */}
        <div className="flex flex-wrap gap-2 p-3 pt-4 sm:flex-col sm:gap-3 sm:p-4 sm:pt-5">
          {APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              label={app.label}
              icon={app.icon}
              isOpen={windows.some((w) => w.id === app.id)}
              onClick={() => handleIconClick(app.id as AppId)}
            />
          ))}
        </div>

        {/* Windows */}
        {windows.map((win) => {
          const app = APPS.find((a) => a.id === win.id)
          const AppComponent = APP_COMPONENTS[win.id]
          if (!AppComponent) return null
          const icon = app?.icon ?? APPS[0].icon

          return (
            <Window
              key={win.id}
              id={win.id}
              title={APP_TITLES[win.id]}
              icon={icon}
            >
              <AppComponent />
            </Window>
          )
        })}
      </div>
    </div>
  )
}
