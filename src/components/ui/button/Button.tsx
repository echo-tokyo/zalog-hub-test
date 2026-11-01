import type { ComponentProps } from 'react'

import styles from './Button.module.css'

type ButtonProps = Omit<ComponentProps<'button'>, 'className'> & {
  variant?: 'primary' | 'ghost'
}

export function Button({
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${styles.button} ${styles[variant]}`}
    />
  )
}
