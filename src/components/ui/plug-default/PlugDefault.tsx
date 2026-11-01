import styles from './PlugDefault.module.css'
import { Text } from '@/components/ui/text/Text'

interface PlugDefaultProps {
  title?: string
}

export function PlugDefault(props: PlugDefaultProps) {
  const { title = 'Ничего не найдено' } = props

  return (
    <div className={styles.wrapper}>
      <Text color='muted'>{title}</Text>
    </div>
  )
}
