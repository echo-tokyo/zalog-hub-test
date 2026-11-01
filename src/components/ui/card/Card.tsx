import type { ReactNode } from 'react'

import styles from './Card.module.css'

interface CardProps {
  as?: 'div' | 'section' | 'aside'
  className?: string
  'aria-label'?: string
  children: ReactNode
}

export function Card(props: CardProps) {
  const { as: Tag = 'div', className, ...rest } = props

  const cardClassName = className ? `${styles.card} ${className}` : styles.card

  return <Tag {...rest} className={cardClassName} />
}
