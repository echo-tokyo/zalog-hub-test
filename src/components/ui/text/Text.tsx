import type { ReactNode } from 'react'

import styles from './Text.module.css'

interface TextProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'dt' | 'dd'
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted'
  className?: string
  children: ReactNode
}

export function Text(props: TextProps) {
  const { as: Tag = 'p', size, weight, color, className, children } = props

  const textClassName = [
    size && styles[size],
    weight && styles[weight],
    color && styles[color],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={textClassName || undefined}>{children}</Tag>
}
