export type BootLine = {
  ts: string
  msg: string
  type: 'ok' | 'warn' | 'err' | 'info'
}

export const bootLines: BootLine[] = [
  {
    ts: '[  0.000000]',
    msg: 'retUNRN OS v2026.1 — Bariloche kernel',
    type: 'info',
  },
  {
    ts: '[  0.012438]',
    msg: 'Initializing UNRN Sede Andina hardware...',
    type: 'info',
  },
  {
    ts: '[  0.089234]',
    msg: 'Loading competitive programming modules... ok',
    type: 'ok',
  },
  {
    ts: '[  0.143021]',
    msg: 'Mounting /dev/mates on /tmp/energía... ok',
    type: 'ok',
  },
  {
    ts: '[  0.201887]',
    msg: 'Starting git daemon... (esperando que alguien haga commit)',
    type: 'info',
  },
  {
    ts: '[  0.298456]',
    msg: 'Checking if tests pass... just kidding, no hay tests',
    type: 'warn',
  },
  {
    ts: '[  0.334512]',
    msg: 'Compiling club enthusiasm: [██████████] 100%',
    type: 'ok',
  },
  {
    ts: '[  0.445230]',
    msg: 'Loading ICPC training data... ok',
    type: 'ok',
  },
  {
    ts: '[  0.512000]',
    msg: 'WARNING: coffee level below threshold — proceeding anyway',
    type: 'warn',
  },
  {
    ts: '[  0.556891]',
    msg: 'Connecting to Instituto Balseiro over /dev/vecinos... ok',
    type: 'ok',
  },
  {
    ts: '[  0.623445]',
    msg: 'Loading algoritmia modules... ok',
    type: 'ok',
  },
  {
    ts: '[  0.701234]',
    msg: 'sudo chmod +x estudiantes.sh — ok',
    type: 'ok',
  },
  {
    ts: '[  0.789001]',
    msg: 'Spawning 6 coordinators in background... ok',
    type: 'ok',
  },
  {
    ts: '[  0.856234]',
    msg: 'git push origin main... nothing to commit (for now)',
    type: 'warn',
  },
  {
    ts: '[  0.901234]',
    msg: 'Starting discord-daemon... ok',
    type: 'ok',
  },
  {
    ts: '[  0.967000]',
    msg: 'Iniciando modo Patagonia: temperatura = -3°C, mate = caliente',
    type: 'info',
  },
  {
    ts: '[  1.023456]',
    msg: 'retUNRN OS ready. Bienvenidx al club.',
    type: 'ok',
  },
]
