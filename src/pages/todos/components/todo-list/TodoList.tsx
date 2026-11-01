import type { Todo } from '@/types/todo'

import styles from './TodoList.module.css'
import { TodoItem } from '@/pages/todos/components/todo-item/TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList(props: TodoListProps) {
  const { todos, onToggle, onDelete } = props

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
