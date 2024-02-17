import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '../pages/home/components/Header'

const user = {
  username: "Heisen Burger",
  avatar: "https://avatars.githubusercontent.com/u/156156831?v=4"
}

export const Route = createRootRoute({
  component: () => (
    <main className="h-full flex flex-col">
      <Header user={user} />
      <Outlet />
    </main>
  ),
})
