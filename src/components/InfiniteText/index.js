import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'
import anime from 'animejs'
import ease from 'eaaase'
import classnames from 'classnames'

import { MOBILE_BREAKPOINT } from 'config'
import useWindowSize from 'utils/hooks/useWindowSize'
import useVirtualScroll from 'utils/hooks/useVirtualScroll'
import useRequestAnimationFrame from 'utils/hooks/useRequestAnimationFrame'

import css from './styles.modules.scss'

const DESKTOP_FLANGE = 100
const MOBILE_FLANGE = 60
const DURATION = 750

const getFlange = width =>
  width < MOBILE_BREAKPOINT ? MOBILE_FLANGE : DESKTOP_FLANGE

export default function InfiniteText({ children, invert, className }) {
  let elements = []
  const direction = invert ? -1 : 1
  const componentStyle = classnames(css.InfiniteText, className)
  const component = useRef()

  const bcr = useRef(null)
  const extra = useRef(5)
  const flange = useRef(0)
  const startY = useRef(0)
  const targetY = useRef(0)
  const currentY = useRef(0)
  const startTime = useRef(0)
  const currentTime = useRef(0)
  const topStateSetAbility = useRef(false)

  const onScroll = e => {
    scroll(Math.min(Math.abs(e.deltaY), flange.current) * Math.sign(e.deltaY))
  }

  const scroll = delta => {
    startY.current = currentY.current
    targetY.current = targetY.current + delta * direction
    startTime.current = currentTime.current

    if (topStateSetAbility.current) {
      const way =
        (targetY.current > -topOffset && -1) ||
        (targetY.current < -topOffset - bcr.current.height && 1) ||
        null

      way && setVirtualList(way)
    }
  }

  const setVirtualList = way => {
    topStateSetAbility.current = false
    setTopOffset(topOffset + bcr.current.height * way)
  }

  const animate = deltaTime => {
    currentTime.current += deltaTime

    if (currentTime.current <= startTime.current + DURATION) {
      currentY.current = ease.easeOutExpo(
        currentTime.current - startTime.current,
        startY.current,
        targetY.current - startY.current,
        DURATION
      )
    } else if (currentY.current !== targetY.current) {
      currentY.current = targetY.current
    }

    anime.set(component.current, {
      translateY: currentY.current,
      translateZ: 0
    })
  }

  useRequestAnimationFrame(animate)
  useVirtualScroll(onScroll)
  const viewport = useWindowSize()
  const { 0: numberOfElements, 1: setNumberOfElements } = useState(1)
  const { 0: topOffset, 1: setTopOffset } = useState(0)

  // on resize
  useEffect(() => {
    const el = elements[0]
    if (!el) return
    flange.current = getFlange(viewport.width)
    bcr.current = el.getBoundingClientRect()
    setTopOffset(bcr.current.height)
    startY.current = currentY.current = targetY.current =
      -bcr.current.height - bcr.current.height / 2

    // round to +1 and add a top & bottom extra element
    extra.current = viewport.height / 2 > bcr.current.height ? 7 : 5
    const n = Math.floor(viewport.height / bcr.current.height) + extra.current
    if (n !== numberOfElements) setNumberOfElements(n)
  }, [viewport])

  // on topOffset set
  useEffect(() => {
    topStateSetAbility.current = true
    scroll(0)
  }, [topOffset])

  const width = bcr.current ? bcr.current.width : 0
  return (
    <div className={componentStyle} ref={component} style={{ width }}>
      {Array.apply(0, Array(numberOfElements)).map((_, i) => {
        const ty = bcr.current
          ? topOffset -
            bcr.current.height * ((extra.current - 1) / 2) +
            i * bcr.current.height
          : 0
        return (
          <div
            ref={el => el && elements.push(el)}
            className={css.block}
            style={{
              transform: `translateY(${ty}px)`
            }}>
            {children}
          </div>
        )
      })}
    </div>
  )
}
