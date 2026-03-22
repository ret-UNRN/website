import { ExternalLink } from 'lucide-react'

const MISSION_ITEMS = [
  'Promover vocaciones tecnológicas y STEM',
  'Fortalecer competencias en programación competitiva',
  'Impulsar proyectos de software libre con impacto social',
  'Reducir brechas de acceso mediante alfabetización digital',
]

const TEAM = [
  { name: 'Mauricio Boyé', role: 'Coordinador general · Presidente' },
  { name: 'Matías Cajal', role: 'Coordinador · Secretario' },
  { name: 'Celso Brizuela', role: 'Coordinador · Tesorero' },
  { name: 'Ezequiel Navone', role: 'Coordinador' },
  { name: 'Fernando Giménez', role: 'Coordinador' },
  { name: 'Paola Britos', role: 'Coordinadora · Directora UNRN' },
]

const LINKS = [
  { label: 'github.com/ret-unrn', href: 'https://github.com/ret-unrn' },
]

export default function AboutApp() {
  return (
    <div className="h-full overflow-auto px-6 py-6">
      <div className="mx-auto max-w-2xl space-y-8">

        {/* Header */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '0ms' }}>
          <h2 className="font-mono text-2xl font-bold text-text">
            Club de Programación
            <span className="text-accent"> retUNRN</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-muted">
            UNRN Sede Andina · Bariloche · Patagonia
          </p>
        </div>

        {/* Descripción */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '80ms' }}>
          <p className="mb-2 font-mono text-xs text-accent"># Descripción</p>
          <div className="border-l-2 border-accent pl-4">
            <p className="font-mono text-sm leading-relaxed text-text/80">
              Somos un espacio extracurricular, inclusivo y colaborativo dentro de
              la Escuela de Producción y Tecnología de la{' '}
              <span className="text-text font-semibold">
                Universidad Nacional de Río Negro
              </span>
              , aprobado por Resolución UNRN AND CDEyVE.
            </p>
          </div>
        </div>

        {/* Misión */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '160ms' }}>
          <p className="mb-3 font-mono text-xs text-accent"># Misión</p>
          <div className="space-y-2">
            {MISSION_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 font-mono text-sm">
                <span className="mt-0.5 shrink-0 font-semibold text-accent">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span className="text-text/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '240ms' }}>
          <p className="mb-3 font-mono text-xs text-accent"># Equipo</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-lg border border-border px-3 py-2.5 transition-colors hover:border-accent/40 hover:bg-surface-2"
              >
                <p className="font-mono text-sm font-semibold text-text">{member.name}</p>
                <p className="font-mono text-xs text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '320ms' }}>
          <p className="mb-3 font-mono text-xs text-accent"># Links</p>
          <div className="space-y-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
              >
                <ExternalLink size={11} />
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
