import { User } from "../../../types"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from "@tanstack/react-router";
import { User as UserIcon } from 'lucide-react'
import { LogOut as LogOutIcon, ShoppingCart as ShoppingCartIcon } from 'lucide-react'

type Props = {
  user: User
}

export function Header(props: Props) {
  const { user } = props
  return (
    <div className="border border-border px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <ShoppingCartIcon strokeWidth={1} />
        <span className="font-semibold font-xl relative top-[2px]">Cybercart</span>
      </Link>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center gap-2 mr-4">
          <img src={user.avatar} className="h-8 w-8 border-border rounded-full" alt="avatar" />
          <span>{user.username}</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
         <DropdownMenu.Content sideOffset={8} className="bg-bg text-fg w-[160px] p-3 flex flex-col gap-3 shadow-sheet rounded-lg">
           <DropdownMenu.Item asChild className="flex items-center gap-2 data-highlighted:bg-brand/10 data-highlighted:text-brand py-[2px] px-1 rounded-lg">
              <Link to="/profile">
                <UserIcon size={18} stroke="currentColor" />
                <span>Profile</span>
              </Link>
           </DropdownMenu.Item>
           <DropdownMenu.Item className="flex items-center gap-2 data-highlighted:bg-brand/10 data-highlighted:text-brand py-[2px] px-1 rounded-lg">
              <LogOutIcon size={18} stroke="currentColor" />
              <span>Sign Out</span>
           </DropdownMenu.Item>
         </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
