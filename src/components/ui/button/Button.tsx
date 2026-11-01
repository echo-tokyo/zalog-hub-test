import type { ComponentProps } from 'react'

import styles from './Button.module.css'

interface ButtonProps extends Omit<ComponentProps<'button'>, 'className'> {
  variant?: 'primary' | 'ghost'
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', type = 'button', ...rest } = props

  return (
    <button
      {...rest}
      type={type}
      className={`${styles.button} ${styles[variant]}`}
    />
  )
}
