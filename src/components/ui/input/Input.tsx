import type { ComponentProps } from 'react'

import styles from './Input.module.css'

type InputProps = Omit<
  ComponentProps<'input'>,
  'className' | 'type' | 'onChange'
> & {
  onChange: (value: string) => void
}

export function Input({ onChange, ...props }: InputProps) {
  return (
    <input
      {...props}
      type='text'
      autoComplete='off'
      className={styles.input}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
