# retUNRN Web · Club de Programación

Sitio web oficial del Club de Programación retUNRN — UNRN Sede Andina, Bariloche.
Diseño estilo **Linux OS** con ventanas arrastrables, terminal funcional y booteo animado.

## Stack

- **React 18** + **TypeScript** — UI y estado
- **Vite 5** — Bundler con HMR instantáneo
- **Tailwind CSS 3** — Estilos
- **Zustand** — Estado global (ventanas, tema, terminal)
- **react-rnd** — Ventanas arrastrables
- **Lucide React** — Iconos

## Empezar

```bash
npm install
npm run dev       # localhost:5173
```

## Comandos

```bash
npm run dev       # desarrollo con HMR
npm run build     # generar /dist para producción
npm run preview   # previsualizar build
npm run lint      # ESLint
npm run format    # Prettier
```

## Estructura

```
src/
├── components/
│   ├── boot/        BootSequence, boot log animado
│   ├── desktop/     Desktop, iconos, taskbar
│   ├── window/      Window con titlebar arrastrables
│   ├── apps/        AboutApp, ProjectsApp, TerminalApp, etc.
│   └── ui/          ThemeToggle, Clock
├── store/          Zustand: ventanas, tema, terminal
├── hooks/          useWindowSize (responsive)
├── constants/      apps.ts con definición de apps
└── styles/         global.css
```

## Desarrollo

1. **Apps nuevas**: Crear componente en `src/components/apps/`, agregarlo a `src/constants/apps.ts`
2. **Estilos**: Tailwind CSS — no crear archivos CSS nuevos
3. **Estado global**: Zustand en `src/store/useDesktopStore.ts`
4. **Terminal**: Comandos en `src/components/apps/TerminalApp.tsx`

## Deploy

*TODO*

📖 Ver **CLAUDE.md** para detalles de arquitectura, animaciones y diseño del OS.
