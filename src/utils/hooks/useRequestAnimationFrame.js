import { useEffect, useRef } from 'preact/hooks'

export default function useAnimationFrame(handler) {
  const savedHandler = useRef()
  const previousTime = useRef()

  const animate = () => {
    const time = Date.now()
    if (previousTime.current) {
      const deltaTime = time - previousTime.current
      handler(deltaTime)
    }
    previousTime.current = time
    savedHandler.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    savedHandler.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(savedHandler.current)
  }, [])
}
