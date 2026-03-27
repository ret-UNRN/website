import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import type { LucideIcon } from 'lucide-react'
import WindowTitlebar from './WindowTitlebar'
import { useDesktopStore } from '../../store/useDesktopStore'
import { useWindowSize } from '../../hooks/useWindowSize'
import type { AppId } from '../../store/useDesktopStore'

const TOP_PANEL_H = 32
const GAP = 8
const ICONS_COL_W = 90
const CASCADE_STEP = 14
const CLOSE_DURATION = 180

interface WindowProps {
  id: AppId
  title: string
  icon: LucideIcon
  children: React.ReactNode
  defaultPosition?: { x: number; y: number }
  defaultSize?: { width: number; height: number }
}

export default function Window({
  id,
  title,
  icon,
  children,
  defaultPosition,
  defaultSize,
}: WindowProps) {
  const closeWindow = useDesktopStore((s) => s.closeWindow)
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow)
  const focusWindow = useDesktopStore((s) => s.focusWindow)
  const win = useDesktopStore((s) => s.windows.find((w) => w.id === id))
  const winIndex = useDesktopStore((s) => s.windows.findIndex((w) => w.id === id))
  const topZIndex = useDesktopStore((s) => s.topZIndex)
  const isActive = win?.zIndex === topZIndex
  const { isMobile, isTablet, width, height } = useWindowSize()
  const rndRef = useRef<Rnd>(null)
  const [closing, setClosing] = useState(false)
  const [maximized, setMaximized] = useState(false)

  if (!win || win.minimized) return null

  const handleFocus = () => focusWindow(id)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => closeWindow(id), CLOSE_DURATION)
  }

  const handleMinimize = () => minimizeWindow(id)
  const handleMaximize = () => setMaximized((m) => !m)

  const titlebar = (
    <WindowTitlebar
      title={title}
      icon={icon}
      onClose={handleClose}
      onMinimize={handleMinimize}
      onMaximize={handleMaximize}
      maximized={maximized}
      onPointerDown={handleFocus}
      hideBorder={isMobile}
    />
  )

  const closeAnim = `window-close ${CLOSE_DURATION}ms ease-in forwards`

  // Mobile: fullscreen between topbar (44px) and bottom nav (64px + safe area)
  if (isMobile) {
    return (
      <div
        className="fixed inset-x-0 flex flex-col overflow-hidden bg-surface animate-[window-open_200ms_ease-out]"
        style={{ zIndex: win.zIndex, top: 44, bottom: 64 }}
        onPointerDown={handleFocus}
      >
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    )
  }

  // Tablet: nearly full area below top panel
  if (isTablet) {
    const w = width - GAP * 2
    const h = height - TOP_PANEL_H - GAP * 2
    return (
      <div
        className="fixed flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
        style={{
          zIndex: win.zIndex,
          width: w,
          height: h,
          top: TOP_PANEL_H + GAP,
          left: GAP,
          animation: closing ? closeAnim : 'window-open 200ms ease-out both',
        }}
        onPointerDown={handleFocus}
      >
        {titlebar}
        <div className="min-w-0 flex-1 overflow-auto">{children}</div>
      </div>
    )
  }

  // Desktop maximized: fills the entire window area
  if (maximized) {
    return (
      <div
        className="absolute inset-0 flex flex-col overflow-hidden border border-border bg-surface shadow-2xl"
        style={{ zIndex: win.zIndex }}
        onPointerDown={handleFocus}
      >
        <div>{titlebar}</div>
        <div className="min-w-0 flex-1 overflow-auto">{children}</div>
      </div>
    )
  }

  // Desktop: react-rnd
  // The window area div is already positioned below the taskbar and right of the icon
  // sidebar (flex layout), so coordinates start at (0,0) within that div.
  const availW = width - ICONS_COL_W
  const availH = height - TOP_PANEL_H
  const cascade = winIndex * CASCADE_STEP

  const defW = defaultSize?.width ?? (availW - GAP * 2) * 0.85
  const defH = defaultSize?.height ?? (availH - GAP * 2) * 0.85

  // Center first window; cascade subsequent ones; clamp so nothing goes off-screen
  const centeredX = (availW - defW) / 2
  const centeredY = (availH - defH) / 2
  const defX = defaultPosition?.x
    ?? Math.max(GAP, Math.min(centeredX + cascade, availW - defW - GAP))
  const defY = defaultPosition?.y
    ?? Math.max(GAP, Math.min(centeredY + cascade, availH - defH - GAP))

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: defX,
        y: defY,
        width: defW,
        height: defH,
      }}
      minWidth={360}
      minHeight={280}
      bounds="parent"
      dragHandleClassName="rnd-drag-handle"
      style={{
        zIndex: win.zIndex,
        animation: closing ? closeAnim : 'window-open 200ms ease-out both',
      }}
      onMouseDown={handleFocus}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        <div className="rnd-drag-handle">{titlebar}</div>
        <div className="min-w-0 flex-1 overflow-auto">{children}</div>
        {!isActive && (
          <div className="window-inactive-overlay absolute inset-0 rounded-xl pointer-events-none" />
        )}
      </div>
    </Rnd>
  )
}
