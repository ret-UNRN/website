import { useEffect, useRef, useState, useCallback } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { bootLines } from './bootLines'

type Phase = 'logo' | 'log' | 'progress' | 'splash' | 'done'

const DELAYS = {
  logoFadeIn: 800,
  progressStep: 28,
  fadeOut: 400,
  splashHold: 1800,
}

const BAR_WIDTH = 40

function getLineDelay(index: number): number {
  if (index < 3) return 100
  if (index < 8) return 140
  return 160
}

function buildAsciiBar(pct: number): string {
  const filled = Math.round((pct / 100) * BAR_WIDTH)
  const empty = BAR_WIDTH - filled
  return '[' + '#'.repeat(filled) + '-'.repeat(empty) + ']'
}

const typeClass = (type: string): string =>
  ({
    ok: 'text-green',
    warn: 'text-yellow-500',
    err: 'text-accent',
    info: 'text-text',
  })[type] ?? 'text-text'

export default function BootSequence() {
  const setBootCompleted = useDesktopStore((s) => s.setBootCompleted)

  const [phase, setPhase] = useState<Phase>('logo')
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [splashVisible, setSplashVisible] = useState(false)
  const [splashFading, setSplashFading] = useState(false)
  const [bootFading, setBootFading] = useState(false)

  const logRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<number[]>([])

  const addTimer = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }, [])

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => clearTimeout(id))
    }
  }, [])

  // Skip boot for reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBootCompleted()
    }
  }, [setBootCompleted])

  // Phase 1: Logo fade-in → start log
  useEffect(() => {
    if (phase !== 'logo') return
    addTimer(() => setPhase('log'), DELAYS.logoFadeIn)
  }, [phase, addTimer])

  // Phase 2: Log lines one by one
  useEffect(() => {
    if (phase !== 'log') return
    if (lineIndex >= bootLines.length) {
      setPhase('progress')
      return
    }
    const delay = getLineDelay(lineIndex)
    addTimer(() => {
      setLineIndex((i) => i + 1)
      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight
      }
    }, delay)
  }, [phase, lineIndex, addTimer])

  // Update progress during log phase (fills to ~60%)
  const logProgress =
    phase === 'log' || phase === 'progress'
      ? Math.round((lineIndex / bootLines.length) * 60)
      : 0

  // Phase 3: Progress bar from 60% to 100%
  useEffect(() => {
    if (phase !== 'progress') return
    const start = 60
    let current = start
    const id = window.setInterval(() => {
      current += 2
      setProgress(current)
      if (current >= 100) {
        clearInterval(id)
        addTimer(() => {
          setBootFading(true)
          addTimer(() => {
            setPhase('splash')
          }, 500)
        }, 300)
      }
    }, DELAYS.progressStep)
    timersRef.current.push(id)
    return () => clearInterval(id)
  }, [phase, addTimer])

  // Phase 4: Splash — show logo PNG
  useEffect(() => {
    if (phase !== 'splash') return
    addTimer(() => setSplashVisible(true), 80)
    addTimer(() => {
      setSplashFading(true)
      addTimer(() => {
        setPhase('done')
        setBootCompleted()
      }, DELAYS.fadeOut + 100)
    }, DELAYS.splashHold)
  }, [phase, addTimer, setBootCompleted])

  const displayProgress = phase === 'progress' ? progress : logProgress

  return (
    <div className="relative h-full w-full overflow-hidden bg-black font-mono text-sm text-text">
      {/* Boot screen (logo + log + progress) */}
      <div
        className="mx-auto flex h-full max-w-3xl flex-col px-6 transition-opacity duration-500 ease-in"
        style={{ opacity: bootFading ? 0 : 1 }}
      >
        {/* ASCII logo area */}
        <div
          className="flex flex-col items-center gap-2 pt-8 pb-6 transition-opacity duration-[600ms] ease-out"
          style={{ opacity: phase === 'logo' ? 0 : 1 }}
        >
          <div className="text-center text-xs leading-tight tracking-wider">
            <span className="text-accent">&gt;_</span>
            <br />
            <span className="text-text">ret</span>
            <span className="text-accent">UNRN</span>
            <span className="text-accent">;</span>
          </div>
          <div className="text-xs tracking-[0.15em] text-muted">
            RETUNRN OS v2026.1
          </div>
        </div>

        {/* Log area */}
        <div
          ref={logRef}
          className="flex flex-1 flex-col gap-1 overflow-y-auto pb-6"
        >
          {bootLines.slice(0, lineIndex).map((line, i) => (
            <div
              key={i}
              className="animate-[slide-in_0.12s_ease_forwards] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className="inline-block min-w-[140px] text-[#444]">
                {line.ts}
              </span>{' '}
              <span className={typeClass(line.type)}>{line.msg}</span>
            </div>
          ))}

          {/* ASCII progress bar — inline as the next log line */}
          {(phase === 'log' || phase === 'progress') && (
            <div className="mt-1 whitespace-nowrap">
              <span className="text-muted">iniciando sistema... </span>
              <span className="text-accent">
                {buildAsciiBar(displayProgress)}
              </span>
              <span className="text-muted">
                {' '}
                {String(displayProgress).padStart(3, ' ')}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Logo splash overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black transition-opacity duration-500 ease-in"
        style={{
          opacity: phase === 'splash' && !splashFading ? 1 : 0,
          pointerEvents: phase === 'splash' ? 'all' : 'none',
        }}
      >
        <img
          src="/logo.png"
          alt="retUNRN"
          className="w-[min(280px,60vw)] transition-all duration-[550ms] ease-out"
          style={{
            opacity: splashVisible && !splashFading ? 1 : 0,
            transform: splashFading
              ? 'scale(1.04)'
              : splashVisible
                ? 'scale(1)'
                : 'scale(0.88)',
          }}
        />
        <div
          className="h-px bg-accent transition-[width] duration-[900ms] ease-out"
          style={{
            width: splashVisible && !splashFading ? 'min(280px, 60vw)' : '0',
            transitionDelay: '100ms',
          }}
        />
        <div
          className="font-mono text-xs tracking-[0.2em] transition-all duration-500 ease-out"
          style={{
            color: '#333',
            opacity: splashVisible && !splashFading ? 1 : 0,
            transform:
              splashVisible && !splashFading
                ? 'translateY(0)'
                : 'translateY(5px)',
            transitionDelay: splashVisible && !splashFading ? '250ms' : '0ms',
          }}
        >
          CLUB DE PROGRAMACI&Oacute;N &middot; UNRN &middot; BARILOCHE
        </div>
      </div>
    </div>
  )
}
