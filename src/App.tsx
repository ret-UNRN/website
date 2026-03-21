import { useDesktopStore } from './store/useDesktopStore'
import BootSequence from './components/boot/BootSequence'
import Desktop from './components/desktop/Desktop'

export default function App() {
  const bootCompleted = useDesktopStore((s) => s.bootCompleted)
  return bootCompleted ? <Desktop /> : <BootSequence />
}
