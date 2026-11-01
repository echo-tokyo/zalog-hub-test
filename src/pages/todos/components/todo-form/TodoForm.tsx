import styles from './TodoForm.module.css'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { type SubmitEvent, useRef, useState } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export function TodoForm(props: TodoFormProps) {
  const { onAdd } = props
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const trimmed = text.trim()

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!trimmed) {
      return
    }
    onAdd(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
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
