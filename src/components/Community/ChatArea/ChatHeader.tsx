import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import type { RootState } from "../../../store"
import { useSelector } from "react-redux"

function ChatHeader() {
    const { selectedConversation } = useSelector((state: RootState) => state.user)

    return (
        <div className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <Avatar className="h-10 w-10">
                <AvatarImage src={(selectedConversation as any)?.profile} alt="Image not available" />
                <AvatarFallback>{(selectedConversation as any)?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold">{(selectedConversation as any)?.username}</h1>
        </div>
    )
}

export default ChatHeader
