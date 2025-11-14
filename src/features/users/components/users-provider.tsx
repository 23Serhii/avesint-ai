import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type User } from '../data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete' | 'view'

type UsersContextType = {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
  items: User[]
  setItems: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersContext = React.createContext<UsersContextType | null>(null)

type UsersProviderProps = {
  children: React.ReactNode
  initialItems: User[]
}

export function UsersProvider({ children, initialItems }: UsersProviderProps) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)
  const [items, setItems] = useState<User[]>(initialItems)

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow, items, setItems }}>
      {children}
    </UsersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const usersContext = React.useContext(UsersContext)

  if (!usersContext) {
    throw new Error('useUsers has to be used within <UsersProvider>')
  }

  return usersContext
}
