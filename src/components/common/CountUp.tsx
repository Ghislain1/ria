import { useEffect, useState, useRef } from 'react'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
}

export function CountUp({ end, duration = 2, suffix = '+' }: CountUpProps) {
  const [value, setValue] = useState(0)
  const startRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    startRef.current = performance.now()
    const animate = (now: number) => {
      const elapsed = (now - startRef.current) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) * (1 - progress)
      setValue(Math.floor(eased * end))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [end, duration])

  return <>{value}{suffix}</>
}
