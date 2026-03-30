import { ExternalLink } from 'lucide-react'
import { useWindowSize } from '../../hooks/useWindowSize'

const WORK_ITEMS = [
  'Formación y entrenamiento: Clases, bootcamps y entrenamiento competitivo',
  'Proyectos de software libre: Desarrollo colaborativo en GitHub',
  'Extensión y comunidad: Talleres en escuelas y actividades abiertas',
  'Eventos y competencias: Participación en ICPC, hackatones y jornadas tecnológicas',
]

const TEAM = [
  { name: 'Mauricio Boyé', role: 'Coordinador general · Presidente' },
  { name: 'Matías Cajal', role: 'Coordinador · Secretario' },
  { name: 'Celso Brizuela', role: 'Coordinador · Tesorero' },
  { name: 'Ezequiel Navone', role: 'Coordinador' },
  { name: 'Fernando Giménez', role: 'Coordinador' },
  { name: 'Paola Britos', role: 'Directora Ing. Computación - UNRN' },
]

const LINKS = [
  { label: 'github.com/ret-unrn', href: 'https://github.com/ret-unrn' },
]

export default function AboutApp() {
  const { isMobile, isTablet } = useWindowSize()
  const padding = isMobile ? 'px-4 py-4' : isTablet ? 'px-5 py-5' : 'px-6 py-6'
  const heading = isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl'
  const sectionTitle = isMobile ? 'text-sm' : 'text-sm'
  const bodyText = isMobile ? 'text-xs' : 'text-sm'
  const spacing = isMobile ? 'space-y-5' : 'space-y-8'

  return (
    <div className={`h-full overflow-auto ${padding}`}>
      <div className={`mx-auto max-w-2xl ${spacing}`}>

        {/* Header */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '0ms' }}>
          <h2 className={`font-mono ${heading} font-bold text-text`}>
            ¿Quiénes somos?
          </h2>
        </div>

        {/* Descripción */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '80ms' }}>
          <p className={`mb-2 font-mono ${sectionTitle} text-accent`}># Descripción</p>
          <div className="border-l-2 border-accent pl-3 sm:pl-4">
            <p className={`font-mono ${bodyText} leading-relaxed text-text/80`}>
              El Club de Programación retUNRN es un espacio extracurricular de la Universidad Nacional de Río Negro, orientado a complementar la formación académica mediante experiencias prácticas en programación, tecnología e innovación.
            </p>
          </div>
        </div>

        {/* Comunidad */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '80ms' }}>
          <p className={`mb-2 font-mono ${sectionTitle} text-accent`}># Comunidad</p>
          <div className="border-l-2 border-accent pl-3 sm:pl-4">
            <p className={`font-mono ${bodyText} leading-relaxed text-text/80`}>
              Está conformado por estudiantes, docentes, mentores y participantes externos. Es un espacio inclusivo, interdisciplinario y abierto a todos los niveles, desde principiantes hasta perfiles avanzados.
            </p>
          </div>
        </div>

        {/* Metodología */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '160ms' }}>
          <p className={`mb-3 font-mono ${sectionTitle} text-accent`}># Metodología</p>
          <div className={isMobile ? 'space-y-1.5' : 'space-y-2'}>
            {WORK_ITEMS.map((item, i) => (
              <div key={i} className={`flex items-start gap-2 sm:gap-3 font-mono ${bodyText}`}>
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
          <p className={`mb-3 font-mono ${sectionTitle} text-accent`}># Equipo</p>
          <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-lg border border-border px-3 py-2.5 transition-colors hover:border-accent/40 hover:bg-surface-2"
              >
                <p className={`font-mono font-semibold text-text ${isMobile ? 'text-xs' : 'text-sm'}`}>{member.name}</p>
                <p className="font-mono text-xs text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ animation: 'slide-in 220ms ease-out both', animationDelay: '320ms' }}>
          <p className={`mb-3 font-mono ${sectionTitle} text-accent`}># Links</p>
          <div className="space-y-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 font-mono ${bodyText} text-accent hover:underline`}
              >
                <ExternalLink size={isMobile ? 10 : 12} />
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
