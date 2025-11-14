import { UsersActionDialog } from './users-action-dialog'
import { UsersDeleteDialog } from './users-delete-dialog'
import { UsersInviteDialog } from './users-invite-dialog'
import { UsersDetailsDialog } from './users-details-dialog'
import { useUsers } from './users-provider'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()

  return (
    <>
      {/* Додавання нового користувача */}
      <UsersActionDialog
        key="user-add"
        open={open === 'add'}
        onOpenChange={(state) => {
          if (!state) {
            setOpen(null)
            setCurrentRow(null)
          } else {
            setOpen('add')
            setCurrentRow(null)
          }
        }}
      />

      {/* Інвайт по email */}
      <UsersInviteDialog
        key="user-invite"
        open={open === 'invite'}
        onOpenChange={(state) => {
          if (!state) setOpen(null)
          else setOpen('invite')
        }}
      />

      {currentRow && (
        <>
          {/* Деталі (клік по рядку таблиці) */}
          <UsersDetailsDialog
            key={`user-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={(state) => {
              if (!state) {
                setOpen(null)
                // currentRow може ще знадобитися для edit/delete – не очищаємо тут
              } else {
                setOpen('view')
              }
            }}
            currentRow={currentRow}
          />

          {/* Редагування */}
          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={(state) => {
              if (!state) {
                setOpen(null)
                // трошки затримки, щоб діалог встиг закритися
                setTimeout(() => setCurrentRow(null), 200)
              } else {
                setOpen('edit')
              }
            }}
            currentRow={currentRow}
          />

          {/* Видалення */}
          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={(state) => {
              if (!state) {
                setOpen(null)
                setTimeout(() => setCurrentRow(null), 200)
              } else {
                setOpen('delete')
              }
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
