import type { ReactNode } from 'react'

import styles from './Checkbox.module.css'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
}

export function Checkbox(props: CheckboxProps) {
  const { checked, onChange, children } = props

  return (
    <label className={styles.label}>
      <input
        type='checkbox'
        className={styles.box}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {children}
    </label>
  )
}
