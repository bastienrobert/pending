import { useEffect, useRef } from 'preact/hooks'

export default function useVirtualScroll(handler, options = {}) {
  const virtualScroll = useRef()
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const eventListener = event => savedHandler.current(event)
    import('virtual-scroll').then(module => {
      const VirtualScroll = module.default
      virtualScroll.current = new VirtualScroll(options)
      virtualScroll.current.on(eventListener)
    })

    return () => {
      virtualScroll.current.off(eventListener)
    }
  }, [])
}
