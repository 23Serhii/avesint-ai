import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/targets/$targetId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/targets/$targetId"!</div>
}
