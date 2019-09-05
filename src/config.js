export const MOBILE_BREAKPOINT = 768

/**
 * VIRTUAL SCROLL SETUP
 */
if (typeof window !== 'undefined') {
  document.addEventListener(
    'touchmove',
    function(e) {
      e.preventDefault()
    },
    { passive: false }
  )
}
