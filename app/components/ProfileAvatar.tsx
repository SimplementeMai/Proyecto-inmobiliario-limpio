import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar"

interface ProfileAvatarProps {
  src: string
  alt: string
}

export function ProfileAvatar({ src, alt }: ProfileAvatarProps) {
  return (
    <Avatar className="h-24 w-24">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}
