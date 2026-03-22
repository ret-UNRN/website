import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Clock } from 'lucide-react'

// ─── Agregá eventos acá ───────────────────────────────────────────────────────
interface CalendarEvent {
  date: string   // formato YYYY-MM-DD
  title: string
  time?: string  // opcional, ej: "18:00"
  url?: string   // opcional, link a más info
}

const EVENTS: CalendarEvent[] = [
  {
    date: '2026-03-21',
    title: 'Reunión de bienvenida al club',
    time: '18:00',
    url: 'https://www.retunrn.org',
  },
  {
    date: '2026-03-21',
    title: 'Taller de programación competitiva',
    time: '19:30',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

const DAYS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']

const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

// Monday-based: 0=Mon … 6=Sun
function getFirstDayOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return (day + 6) % 7
}

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function CalendarApp() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<string | null>(null)

  const daysInMonth = getDaysInMonth(year, month)
  const offset = getFirstDayOffset(year, month)

  const eventsByDate = EVENTS.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    acc[e.date] = [...(acc[e.date] ?? []), e]
    return acc
  }, {})

  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate())

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelected(null)
  }

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelected(null)
  }

  const selectedEvents = selected ? (eventsByDate[selected] ?? []) : []

  // Siempre 42 celdas (6 filas × 7 cols) — el grid nunca cambia de tamaño
  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - offset + 1
    if (day < 1 || day > daysInMonth) return null
    return day
  })

  return (
    <div className="flex h-full flex-col gap-3 px-5 py-4">

      {/* Header */}
      <div className="flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => { setYear(y => y - 1); setSelected(null) }}
            className="flex h-7 w-7 touch-manipulation items-center justify-center rounded text-muted transition-colors hover:text-text"
            title="Año anterior"
          >
            <ChevronsLeft size={14} />
          </button>
          <button
            onClick={prevMonth}
            className="flex h-7 w-7 touch-manipulation items-center justify-center rounded text-muted transition-colors hover:text-text"
            title="Mes anterior"
          >
            <ChevronLeft size={14} />
          </button>
        </div>

        <span className="font-mono text-sm font-semibold text-text">
          {MONTHS[month]} <span className="text-accent">{year}</span>
        </span>

        <div className="flex items-center gap-0.5">
          <button
            onClick={nextMonth}
            className="flex h-7 w-7 touch-manipulation items-center justify-center rounded text-muted transition-colors hover:text-text"
            title="Mes siguiente"
          >
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => { setYear(y => y + 1); setSelected(null) }}
            className="flex h-7 w-7 touch-manipulation items-center justify-center rounded text-muted transition-colors hover:text-text"
            title="Año siguiente"
          >
            <ChevronsRight size={14} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid shrink-0 grid-cols-7">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-mono text-[11px] text-muted">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid — siempre 6 filas exactas, sin importar el mes */}
      <div className="grid flex-1 grid-cols-7 grid-rows-6 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />
          const key = toKey(year, month, day)
          const hasEvent = !!eventsByDate[key]
          const isToday = key === todayKey
          const isSelected = key === selected

          return (
            <button
              key={key}
              onClick={() => setSelected(isSelected ? null : key)}
              className={`flex touch-manipulation flex-col items-center justify-center rounded-lg font-mono text-sm transition-colors
                ${isSelected
                  ? 'bg-accent text-white'
                  : isToday
                  ? 'border border-accent bg-accent/10 font-semibold text-accent'
                  : 'text-text/70 hover:bg-surface-2'
                }`}
            >
              {day}
              {hasEvent && (
                <span
                  className={`mt-0.5 h-1.5 w-1.5 rounded-full ring-1
                    ${isSelected ? 'bg-white ring-white/30' : 'bg-accent ring-accent/30'}`}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel de eventos — siempre visible, altura mínima fija para no mover el grid */}
      <div className="min-h-[52px] shrink-0 rounded-lg border border-border bg-surface-2 px-4 py-3">
        {!selected ? (
          <p className="font-mono text-xs text-muted/40">seleccioná un día para ver eventos</p>
        ) : selectedEvents.length === 0 ? (
          <p className="font-mono text-xs text-muted">sin eventos este día</p>
        ) : (
          <div className="space-y-2">
            {selectedEvents.map((e, i) => (
              <div key={i} className="flex items-center gap-3">
                {e.time && (
                  <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-accent">
                    <Clock size={10} />
                    {e.time}
                  </span>
                )}
                <span className="flex-1 font-mono text-xs text-text">{e.title}</span>
                {e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    + info
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
