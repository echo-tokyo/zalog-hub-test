import type { ComponentProps } from 'react'

import styles from './Input.module.css'

interface InputProps extends Omit<
  ComponentProps<'input'>,
  'className' | 'type' | 'onChange'
> {
  onChange: (value: string) => void
}

export function Input(props: InputProps) {
  const { onChange, ...rest } = props

  return (
    <input
      {...rest}
      type='text'
      autoComplete='off'
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
