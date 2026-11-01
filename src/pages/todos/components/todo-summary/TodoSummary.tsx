import styles from './TodoSummary.module.css'
import { Text } from '@/components/ui/text/Text'
import { formatDayMonth, formatWeekday } from '@/utils/format-date'

interface TodoSummaryProps {
  total: number
  completed: number
}

function getCaption(total: number, completed: number) {
  if (total === 0) {
    return 'Задач пока нет'
  }
  if (total === completed) {
    return 'Всё сделано'
  }
  return `Осталось ${total - completed}`
}

export function TodoSummary(props: TodoSummaryProps) {
  const { total, completed } = props

  const today = new Date()
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const stats = [
    { label: 'Всего', value: total },
    { label: 'Активные', value: total - completed },
    { label: 'Выполненные', value: completed },
  ]

  return (
    <section className={styles.summary} aria-label='Статистика'>
      <div>
        <Text size='s' color='muted' className={styles.weekday}>
          {formatWeekday(today)}
        </Text>
        <Text as='h1' size='xl' weight='bold'>
          {formatDayMonth(today)}
        </Text>
      </div>

      <div className={styles.progress}>
        <Text
          as='h2'
          size='xs'
          weight='semibold'
          color='muted'
          className={styles.label}
        >
          Выполнено
        </Text>
        <Text size='xxl' weight='bold' className={styles.numbers}>
          {completed}
          <Text as='span' weight='medium' color='muted'>
            / {total}
          </Text>
        </Text>
        <div className={styles.bar} aria-hidden='true'>
          <div className={styles.fill} style={{ width: `${percent}%` }} />
        </div>
        <Text size='s' color='muted'>
          {getCaption(total, completed)}
        </Text>
      </div>

      <dl className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <Text as='dt' size='s' color='muted'>
              {stat.label}
            </Text>
            <Text as='dd' size='s' weight='semibold' className={styles.numbers}>
              {stat.value}
            </Text>
          </div>
        ))}
      </dl>
    </section>
  )
}
