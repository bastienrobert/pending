import { h } from 'preact'

import links from 'content/links'

export default function SplitText({
  children,
  onLetterEnter,
  onLetterLeave,
  className
}) {
  return (
    <div className={className}>
      {children.split('').map(l => {
        const href = links[Math.floor(Math.random() * links.length)]
        return (
          <a
            href={href}
            rel="noopener, noreferrer"
            target="_blank"
            onMouseEnter={onLetterEnter}
            onMouseLeave={onLetterLeave}>
            {l}
          </a>
        )
      })}
    </div>
  )
}
