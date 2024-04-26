import {
  User
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import useAuth from "@/utlis/useAuth"
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const profilePicture = currentUser?.avatar;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={profilePicture} alt="user_img"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{currentUser?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span onClick={() => navigate(`my-profile/${currentUser.id}`)}>My Profile</span>
          </DropdownMenuItem>
          </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-white bg-[#EF4444]">
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
