import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { useWindowSize } from '../../hooks/useWindowSize'
import { COMMANDS } from './terminalCommands'
import type { AppId } from '../../store/useDesktopStore'

const OPENABLE: Record<string, AppId> = {
  inicio: 'welcome',
  'quienes-somos': 'about',
  nosotros: 'about',
  inscripcion: 'form',
  proyectos: 'projects',
  agenda: 'calendar',
  noticias: 'news',
  contacto: 'contact',
  terminal: 'terminal',
}

function Prompt({ isMobile }: { isMobile: boolean }) {
  return (
    <span className={`shrink-0 text-green ${isMobile ? 'text-xs' : 'text-sm'}`}>
      user@retunrn
      <span className="text-white">:</span>
      <span className="text-cyan-500">~</span>
      <span className="text-white">$ </span>
    </span>
  )
}

export default function TerminalApp() {
  const history = useDesktopStore((s) => s.terminalHistory)
  const push = useDesktopStore((s) => s.pushTerminalLine)
  const clear = useDesktopStore((s) => s.clearTerminal)
  const openWindow = useDesktopStore((s) => s.openWindow)
  const theme = useDesktopStore((s) => s.theme)
  const { isMobile } = useWindowSize()

  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [focused, setFocused] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    push({ type: 'input', content: cmd })
    setCmdHistory((h) => [cmd, ...h])
    setHistIdx(-1)

    if (cmd === 'clear') { clear(); return }

    if (cmd === 'neofetch') {
      const lines = COMMANDS['neofetch']([theme])
      const result = Array.isArray(lines) ? lines : [lines]
      result.forEach((line) => push({ type: 'output', content: line }))
      return
    }

    if (cmd.startsWith('open ')) {
      const name = cmd.slice(5).trim()
      const id = OPENABLE[name]
      if (id) {
        openWindow(id)
        push({ type: 'output', content: `abriendo ${name}...` })
      } else {
        push({ type: 'error', content: `open: '${name}' no encontrado. Usá 'ls' para ver las apps.` })
      }
      return
    }

    const fn = COMMANDS[cmd] ?? COMMANDS[cmd.split(' ')[0]]
    if (!fn) {
      push({ type: 'error', content: `${cmd.split(' ')[0]}: comando no encontrado. Usá 'help'.` })
      return
    }

    const args = cmd.split(' ').slice(1)
    const result = fn(args)
    const lines = Array.isArray(result) ? result : [result]
    lines.forEach((line) => push({ type: 'output', content: line }))
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(idx)
      setInput(cmdHistory[idx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(histIdx - 1, -1)
      setHistIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const cmds = [...Object.keys(COMMANDS), 'clear', 'open']
      const match = cmds.find((c) => c.startsWith(input) && c !== input)
      if (match) setInput(match)
    }
  }

  const fontSize = isMobile ? 'text-xs' : 'text-sm'
  const padding = isMobile ? 'px-3 py-2' : 'px-4 py-3'

  return (
    <div
      className={`flex h-full flex-col bg-surface-2 ${padding} font-mono ${fontSize} transition-colors`}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto">
        {history.map((line, i) => (
          <div key={i} className="leading-relaxed whitespace-pre-wrap">
            {line.type === 'input' ? (
              <span>
                <Prompt isMobile={isMobile} />
                <span className="text-text"> {line.content}</span>
              </span>
            ) : line.type === 'error' ? (
              <span className="text-accent">{line.content}</span>
            ) : (
              <span className="text-text/80">{line.content}</span>
            )}
          </div>
        ))}

        {/* Input row */}
        <div className="flex items-center gap-2 pt-0.5">
          <Prompt isMobile={isMobile} />
          <div className="relative flex-1 overflow-hidden">
            <span className="invisible whitespace-pre leading-relaxed">{input || ' '}</span>
            <div className="absolute inset-0 flex items-center">
              <span className="text-text whitespace-pre">{input}</span>
              <span
                className={`inline-block w-[0.55em] h-[1.1em] bg-text ${focused ? 'animate-[blink_700ms_step-end_infinite]' : 'opacity-0'}`}
              />
            </div>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoFocus
              spellCheck={false}
              className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
