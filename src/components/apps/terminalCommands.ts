const PAGE_LOAD = Date.now()

const QUOTES = [
  '"Computer science is no more about computers than astronomy is about telescopes." — Dijkstra',
  '"Premature optimization is the root of all evil." — Knuth',
  '"Talk is cheap. Show me the code." — Torvalds',
  '"Programs must be written for people to read, and only incidentally for machines to execute." — Abelson',
  '"Debugging is twice as hard as writing the code in the first place." — Kernighan',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Fowler',
]

const GIT_LOG = [
  'commit a3f9c12  fix: arreglar bug que nunca debería haber existido',
  'commit b7e2d45  feat: agregar feature que nadie pidió pero todos necesitaban',
  'commit c1a8f33  chore: renombrar variable de `x` a `xx`',
  'commit d4b6e21  fix: revertir el fix del fix anterior',
  'commit e9c3a17  feat: implementar TODO que llevaba 6 meses como TODO',
  'commit f2d7b09  docs: actualizar README (primera vez en 2 años)',
]

// ─── Agregá comandos acá ──────────────────────────────────────────────────────
// Cada comando recibe args: string[] y retorna string | string[]
// Para comandos con side-effects (open, clear) usá el objeto SPECIAL_COMMANDS en TerminalApp.tsx

export const COMMANDS: Record<string, (args: string[]) => string | string[]> = {
  help: () => [
    'Comandos disponibles:',
    '  help          esta ayuda',
    '  about         info del club',
    '  whoami        quién sos',
    '  ls            apps disponibles',
    '  open <app>    abre una ventana',
    '  uname -a      info del sistema',
    '  uptime        tiempo desde que cargó la página',
    '  git log       historial de commits',
    '  ping <host>   ping con latencia real™',
    '  fortune       sabiduría aleatoria',
    '  neofetch      info del sistema estilo neofetch',
    '  cowsay <msg>  lo que dice la vaca',
    '  coffee        cafeína',
    '  sudo rm -rf / no lo intentes',
    '  clear         limpia la terminal',
    '  exit          inténtalo',
  ],

  whoami: () => 'estudiante de la UNRN',

  about: () => [
    '  ██████╗ ███████╗████████╗██╗   ██╗███╗   ██╗██████╗ ███╗   ██╗',
    '  ██╔══██╗██╔════╝╚══██╔══╝██║   ██║████╗  ██║██╔══██╗████╗  ██║',
    '  ██████╔╝█████╗     ██║   ██║   ██║██╔██╗ ██║██████╔╝██╔██╗ ██║',
    '  ██╔══██╗██╔══╝     ██║   ██║   ██║██║╚██╗██║██╔══██╗██║╚██╗██║',
    '  ██║  ██║███████╗   ██║   ╚██████╔╝██║ ╚████║██║  ██║██║ ╚████║',
    '  ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝',
    '',
    '  Club de Programación · UNRN Sede Andina · Bariloche',
    '  aprender, competir y construir software con impacto social',
  ],

  ls: () => [
    'inicio  quienes-somos  inscripcion  proyectos  agenda  contacto  terminal',
  ],

  'uname -a': () =>
    'retUNRN OS 2026.1 Bariloche #1 SMP GNU/Patagonia aarch64 GNU/Linux',

  uname: (args) =>
    args.includes('-a')
      ? 'retUNRN OS 2026.1 Bariloche #1 SMP GNU/Patagonia aarch64 GNU/Linux'
      : 'retUNRN',

  uptime: () => {
    const s = Math.floor((Date.now() - PAGE_LOAD) / 1000)
    const m = Math.floor(s / 60)
    const h = Math.floor(m / 60)
    const parts = []
    if (h > 0) parts.push(`${h}h`)
    if (m % 60 > 0) parts.push(`${m % 60}m`)
    parts.push(`${s % 60}s`)
    return `up ${parts.join(' ')} — sin crashear (por ahora)`
  },

  'git log': () => GIT_LOG,

  git: (args) =>
    args[0] === 'log'
      ? GIT_LOG
      : 'git: comando no reconocido. probá `git log`',

  'sudo rm -rf /': () => 'Permiso denegado. Nice try.',

  sudo: () => 'Permiso denegado. Nice try.',

  fortune: () => QUOTES[Math.floor(Math.random() * QUOTES.length)],

  neofetch: (args) => [
    '  user@retunrn',
    '  ────────────',
    '  OS      retUNRN OS 2026.1 Bariloche',
    '  Club    Club de Programación retUNRN',
    '  Sede    UNRN Sede Andina · Bariloche',
    '  Lang    C++, Python, JavaScript',
    '  Members 6 coordinadores activos',
    '  Shell   retsh v1.0',
    `  Theme   ${args[0] === 'light' ? 'Light' : 'Dark'}`,
  ],

  coffee: () => [
    'Brewing... [████████░░]',
    'Error: no hay más café',
    'hint: intentá con mate',
  ],

  exit: () => 'No podés salir. Ya sos parte del club.',

  cowsay: (args) => {
    const msg = args.join(' ') || 'Moo!'
    const line = '-'.repeat(msg.length + 2)
    return [
      ` ${line}`,
      `< ${msg} >`,
      ` ${line}`,
      '        \\   ^__^',
      '         \\  (oo)\\_______',
      '            (__)\\       )\\/\\',
      '                ||----w |',
      '                ||     ||',
    ]
  },

  ping: (args) => {
    const host = args[0] ?? 'localhost'
    return [
      `PING ${host}`,
      `64 bytes from ${host}: time=${Math.floor(Math.random() * 8) + 1}ms`,
      `64 bytes from ${host}: time=${Math.floor(Math.random() * 8) + 1}ms`,
      `64 bytes from ${host}: time=${Math.floor(Math.random() * 8) + 1}ms`,
      `— ${host} ping statistics: 3 packets, 0% loss`,
    ]
  },
}
// ─────────────────────────────────────────────────────────────────────────────
