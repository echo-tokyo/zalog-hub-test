import type { Todo } from '@/types/todo'

import styles from './TodoItem.module.css'
import { Button } from '@/components/ui/button/Button'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { Text } from '@/components/ui/text/Text'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem(props: TodoItemProps) {
  const { todo, onToggle, onDelete } = props

  return (
    <li className={styles.item} data-completed={todo.completed}>
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)}>
        <Text as='span' className={styles.text}>
          {todo.text}
        </Text>
      </Checkbox>
      <Button
        variant='ghost'
        aria-label={`Удалить «${todo.text}»`}
        onClick={() => onDelete(todo.id)}
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          aria-hidden='true'
        >
          <path d='M18 6 6 18M6 6l12 12' />
        </svg>
      </Button>
    </li>
  )
}
