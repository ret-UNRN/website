import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

// ── Agregá proyectos acá ─────────────────────────────────────────────────────
interface Repo {
  name: string
  description: string
  langs: string[]  // uno o más lenguajes, ej: ['TypeScript', 'React']
  url: string
}

const REPOS: Repo[] = [
  {
    name: 'retunrn-web',
    description: 'Sitio web oficial del club — retUNRN OS',
    langs: ['TypeScript', 'React'],
    url: 'https://github.com/ret-unrn/retunrn-web',
  },
  {
    name: 'competitive-programming',
    description: 'Soluciones y recursos para programación competitiva (ICPC)',
    langs: ['C++'],
    url: 'https://github.com/ret-unrn/competitive-programming',
  },
  {
    name: 'workshops',
    description: 'Material de talleres y charlas del club',
    langs: ['Markdown'],
    url: 'https://github.com/ret-unrn/workshops',
  },
  {
    name: 'algoritmos-unrn',
    description: 'Implementaciones de algoritmos para la cursada',
    langs: ['Python', 'C++'],
    url: 'https://github.com/ret-unrn/algoritmos-unrn',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'text-blue-400 border-blue-400/30',
  React:      'text-cyan-400 border-cyan-400/30',
  'C++':      'text-purple-400 border-purple-400/30',
  Python:     'text-yellow-400 border-yellow-400/30',
  Markdown:   'text-green border-green/30',
  JavaScript: 'text-yellow-300 border-yellow-300/30',
  Go:         'text-cyan-300 border-cyan-300/30',
  Rust:       'text-orange-400 border-orange-400/30',
  Java:       'text-red-400 border-red-400/30',
  Shell:      'text-green border-green/30',
}

const LOADING_LINES = [
  '$ git remote -v',
  '  origin  https://github.com/ret-unrn (fetch)',
  '$ git fetch origin...',
]

export default function ProjectsApp() {
  const [ready, setReady] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let i = 0
    const next = () => {
      i++
      setVisibleLines(i)
      if (i < LOADING_LINES.length) {
        setTimeout(next, 180)
      } else {
        setTimeout(() => setReady(true), 400)
      }
    }
    const id = setTimeout(next, 100)
    return () => clearTimeout(id)
  }, [])

  if (!ready) {
    return (
      <div className="flex h-full flex-col justify-center px-6 py-6 font-mono text-xs">
        {LOADING_LINES.slice(0, visibleLines).map((line, i) => (
          <p
            key={i}
            className={`leading-relaxed ${line.startsWith('$') ? 'text-green' : 'text-muted'}`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {line}
            {i === visibleLines - 1 && (
              <span className="animate-[blink_700ms_step-end_infinite] ml-0.5 inline-block">▌</span>
            )}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto px-6 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">$ ls ~/proyectos/</span>
        <a
          href="https://github.com/ret-unrn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-mono text-[11px] text-accent hover:underline"
        >
          <ExternalLink size={10} />
          github.com/ret-unrn
        </a>
      </div>

      {/* Repos */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {REPOS.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-border bg-surface-2 p-4 transition-colors hover:border-accent/40"
          >
            <p className="font-mono text-sm font-semibold text-green group-hover:underline">
              {repo.name}
            </p>
            <p className="mt-1 font-mono text-xs leading-relaxed text-muted">
              {repo.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {repo.langs.map((lang) => (
                <span
                  key={lang}
                  className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${LANG_COLORS[lang] ?? 'text-muted border-border'}`}
                >
                  {lang}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
