import { useEffect, useState } from 'react'

export default function ProjectsApp() {
  const [error, setError] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setError(true), 2200)
    return () => clearTimeout(id)
  }, [])

  if (!error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="font-mono text-xs text-muted animate-pulse">
          <span className="text-accent">$</span> git fetch origin...
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <p className="font-mono text-sm text-accent">fetch: connection refused</p>
      <p className="font-mono text-xs text-muted">
        no se pudo conectar con GitHub — revisá tu conexión
      </p>
    </div>
  )
}
