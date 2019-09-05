import { h } from 'preact'

import links from 'content/links'

export default function SplitText({
  children,
  onLetterEnter,
  onLetterLeave,
  className
}) {
  const href = links[Math.floor(Math.random() * links.length)]
  return (
    <div className={className}>
      {children.split('').map(l => (
        <a
          href={href}
          rel="noopener, noreferrer"
          target="_blank"
          onMouseEnter={onLetterEnter}
          onMouseLeave={onLetterLeave}>
          {l}
        </a>
      ))}
    </div>
  )
}
