import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import anime from 'animejs'

import InfiniteText from 'components/InfiniteText'
import SplitText from 'components/SplitText'

import { getRandomColor } from 'utils/helpers'

import css from './styles.modules.scss'

function createLetterEvent(enter) {
  return function(e) {
    e.target && (e.target.style.color = enter ? getRandomColor() : '#000')
  }
}

function Col({ children, innerRef, invert }) {
  return (
    <InfiniteText className={css.col} ref={innerRef} invert={invert}>
      <SplitText
        className={css.text}
        onLetterEnter={createLetterEvent(true)}
        onLetterLeave={createLetterEvent(false)}>
        {children}
      </SplitText>
    </InfiniteText>
  )
}

export default function Home({ shouldBeVisible }) {
  if (typeof window === 'undefined') {
    return <h1>bastienrobert.dev is coming soon!</h1>
  }

  const hasBeenAnimated = useRef(false)
  let elements = []
  useEffect(() => {
    if (shouldBeVisible && !hasBeenAnimated.current) {
      hasBeenAnimated.current = true
      elements.forEach((el, i) => {
        anime({
          targets: el.base,
          opacity: [0, 1],
          duration: 2000,
          ease: 'easeOutSine',
          delay: i * 200
        })
      })
    }
  })
  const pushToElements = el => el && elements.push(el)

  if (!shouldBeVisible) return null

  return (
    <div className={css.Home}>
      <Col innerRef={pushToElements} invert>
        bastien
      </Col>
      <Col innerRef={pushToElements}>robert</Col>
      <Col innerRef={pushToElements} invert>
        portfolio
      </Col>
      <Col innerRef={pushToElements}>coming</Col>
      <Col innerRef={pushToElements} invert>
        soon
      </Col>
    </div>
  )
}
