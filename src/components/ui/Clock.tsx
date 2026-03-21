import { useState, useEffect } from 'react'

const DAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
const MONTHS = [
  'ene',
  'feb',
  'mar',
  'abr',
  'may',
  'jun',
  'jul',
  'ago',
  'sep',
  'oct',
  'nov',
  'dic',
]

export default function Clock() {
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  const day = DAYS[time.getDay()]
  const date = time.getDate()
  const month = MONTHS[time.getMonth()]

  return (
    <span className="cursor-default font-mono text-xs text-text/80">
      {day} {date} {month} {hours}:{minutes}
    </span>
  )
}
