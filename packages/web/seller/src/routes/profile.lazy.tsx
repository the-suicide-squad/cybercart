import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return <div className="p-2">This is the profile page</div>
}
