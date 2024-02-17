import { User } from "../../../types"

type Props = {
  user: User
}

export function Header(props: Props) {
  const { user } = props
  return (
    <div className="border border-border px-4 py-3 flex">
      <div className="ml-auto flex items-center gap-2 mr-4">
        <img src={user.avatar} className="h-8 w-8 border-border rounded-full" alt="avatar" />
        <span>{user.username}</span>
      </div>
    </div>
  )
}
