import type { ReactNode } from 'react'

import styles from './Checkbox.module.css'

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
}

export function Checkbox({ checked, onChange, children }: CheckboxProps) {
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
