import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/targets/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/targets/"!</div>
}
