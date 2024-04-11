import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { extractTime } from "../../../lib/extractTime"

const Message = ({ message }: any) => {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    const fromMe = message.senderId === userInfo._id
    const formattedTime = extractTime(message.createdAt)
    const chatClassName = fromMe ? "flex-row-reverse" : "flex-row"
    const avatarImage = fromMe ? userInfo.profile : (selectedConversation as any)?.profile
    const avatarFallback = fromMe ? userInfo.username[0].toUpperCase() : (selectedConversation as any)?.username[0].toUpperCase()
    const bubbleBgColor = fromMe ? "bg-primary" : "bg-secondary"

    return (
        <div className={`flex items-start gap-3 ${chatClassName}`}>
            <Avatar className="h-10 w-10">
                <AvatarImage src={avatarImage} alt="Image not available" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className={`p-3 rounded-md max-w-xs ${bubbleBgColor}`}>{message.message}</span>
                <p className="text-sm text-muted-foreground py-2">{formattedTime}</p>
            </div>
        </div>
    )
}

export default Message
