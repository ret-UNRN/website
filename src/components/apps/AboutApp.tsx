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

export default function AboutApp() {
  return (
    <div className="h-full overflow-auto px-6 py-6">
      <div className="mx-auto max-w-2xl space-y-8">

        {/* Header */}
        <div>
          <h2 className="font-mono text-2xl font-bold text-text">
            Club de Programación
            <span className="text-accent"> retUNRN</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-muted">
            UNRN Sede Andina · Bariloche · Patagonia
          </p>
        </div>

        {/* Descripción */}
        <div>
          <p className="mb-2 font-mono text-xs text-accent"># Descripción</p>
          <p className="font-mono text-sm leading-relaxed text-text/80">
            Somos un espacio extracurricular, inclusivo y colaborativo dentro de
            la Escuela de Producción y Tecnología de la{' '}
            <span className="text-text font-semibold">
              Universidad Nacional de Río Negro
            </span>
            , aprobado por Resolución UNRN AND CDEyVE.
          </p>
        </div>

        {/* Misión */}
        <div>
          <p className="mb-3 font-mono text-xs text-accent"># Misión</p>
          <div className="space-y-2">
            {MISSION_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 font-mono text-sm">
                <span className="mt-0.5 shrink-0 text-green">▸</span>
                <span className="text-text/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div>
          <p className="mb-3 font-mono text-xs text-accent"># Equipo</p>
          <div className="space-y-2">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex items-baseline gap-3 border-b border-border pb-2 last:border-0 last:pb-0"
              >
                <span className="shrink-0 font-mono text-sm font-semibold text-text">
                  {member.name}
                </span>
                <span className="font-mono text-xs text-muted">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
