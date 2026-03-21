import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { COMMANDS } from './terminalCommands'
import type { AppId } from '../../store/useDesktopStore'

const PROMPT = 'user@retunrn:~$'

const OPENABLE: Record<string, AppId> = {
  inicio: 'welcome',
  'quienes-somos': 'about',
  nosotros: 'about',
  proyectos: 'projects',
  agenda: 'calendar',
  contacto: 'contact',
  terminal: 'terminal',
}

export default function TerminalApp() {
  const history = useDesktopStore((s) => s.terminalHistory)
  const push = useDesktopStore((s) => s.pushTerminalLine)
  const clear = useDesktopStore((s) => s.clearTerminal)
  const openWindow = useDesktopStore((s) => s.openWindow)

  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [focused, setFocused] = useState(true)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    push({ type: 'input', content: cmd })
    setCmdHistory((h) => [cmd, ...h])
    setHistIdx(-1)

    if (cmd === 'clear') { clear(); return }

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

  return (
    <div
      className="flex h-full flex-col bg-surface-2 px-4 py-3 font-mono text-sm transition-colors"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Single scrollable area — prompt follows output naturally */}
      <div className="flex-1 overflow-auto">
        {history.map((line, i) => (
          <div key={i} className="leading-relaxed whitespace-pre-wrap">
            {line.type === 'input' ? (
              <span>
                <span className="text-green">{PROMPT}</span>
                <span className="text-text"> {line.content}</span>
              </span>
            ) : line.type === 'error' ? (
              <span className="text-accent">{line.content}</span>
            ) : (
              <span className="text-text/80">{line.content}</span>
            )}
          </div>
        ))}

        {/* Input row — sits right after last output */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="shrink-0 text-green">{PROMPT}</span>
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

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
