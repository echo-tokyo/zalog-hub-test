import styles from './SegmentedControl.module.css'

type Option<T extends string> = {
  value: T
  label: string
}

type SegmentedControlProps<T extends string> = {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  label: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: SegmentedControlProps<T>) {
  return (
    <div role='group' aria-label={label} className={styles.group}>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          aria-pressed={option.value === value}
          className={styles.option}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
