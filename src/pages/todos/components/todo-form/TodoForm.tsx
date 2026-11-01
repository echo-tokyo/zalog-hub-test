import styles from './TodoForm.module.css'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { type SubmitEvent, useState } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export function TodoForm(props: TodoFormProps) {
  const { onAdd } = props
  const [text, setText] = useState('')
  const trimmed = text.trim()

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!trimmed) {
      return
    }
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        value={text}
        onChange={setText}
        placeholder='Новая задача'
        aria-label='Текст новой задачи'
      />
      <Button type='submit' disabled={!trimmed}>
        Добавить
      </Button>
    </form>
  )
}
