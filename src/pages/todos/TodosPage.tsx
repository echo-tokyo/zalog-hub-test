import type { Todo, TodoFilter } from '@/types/todo'

import styles from './TodosPage.module.css'
import { Card } from '@/components/ui/card/Card'
import { PlugDefault } from '@/components/ui/plug-default/PlugDefault'
import { SegmentedControl } from '@/components/ui/segmented-control/SegmentedControl'
import { Text } from '@/components/ui/text/Text'
import { TodoForm } from '@/pages/todos/components/todo-form/TodoForm'
import { TodoList } from '@/pages/todos/components/todo-list/TodoList'
import { TodoSummary } from '@/pages/todos/components/todo-summary/TodoSummary'
import { useState } from 'react'

const FILTER_OPTIONS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

const STORAGE_KEY = 'todos'

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Todo[]
  } catch {
    return []
  }
}

function matchesFilter(todo: Todo, filter: TodoFilter) {
  switch (filter) {
    case 'all':
      return true
    case 'active':
      return !todo.completed
    case 'completed':
      return todo.completed
  }
}

export function TodosPage() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState<TodoFilter>('all')

  const visibleTodos = todos.filter((todo) => matchesFilter(todo, filter))
  const completedCount = todos.filter((todo) => todo.completed).length

  function updateTodos(next: Todo[]) {
    setTodos(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function handleAdd(text: string) {
    updateTodos([{ id: crypto.randomUUID(), text, completed: false }, ...todos])
    if (filter === 'completed') {
      setFilter('all')
    }
  }

  function handleToggle(id: string) {
    updateTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function handleDelete(id: string) {
    updateTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <main className={styles.page}>
      <Card as='aside' className={styles.sidebar}>
        <TodoSummary total={todos.length} completed={completedCount} />
      </Card>

      <div className={styles.content}>
        <Card as='section' className={styles.actions}>
          <TodoForm onAdd={handleAdd} />
        </Card>

        <Card as='section' className={styles.list}>
          <div className={styles.listHeader}>
            <Text as='h2' size='l' weight='bold'>
              Задачи
            </Text>
            <SegmentedControl
              options={FILTER_OPTIONS}
              value={filter}
              onChange={setFilter}
              label='Фильтр задач'
            />
          </div>

          {visibleTodos.length === 0 ? (
            <PlugDefault title='Добавьте свою первую задачу' />
          ) : (
            <TodoList
              todos={visibleTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </Card>
      </div>
    </main>
  )
}
