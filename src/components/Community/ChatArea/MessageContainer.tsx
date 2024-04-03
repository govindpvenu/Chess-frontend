import React, { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { setSelectedConversation } from "../../../slices/userSlice"

function MessageContainer() {
    const dispatch = useDispatch()
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    // useEffect(() => {
    //     // cleanup function (unmounts component)
    //     return () => {
    //         dispatch(setSelectedConversation(null))
    //     }
    // }, [selectedConversation])
    return (
        <ScrollArea className="flex-1 ">
            <div className="flex gap-3 items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={(selectedConversation as any)?.profile} alt="Image not available" />
                    <AvatarFallback>{(selectedConversation as any)?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <span className=" bg-primary p-3 rounded-md max-w-xs">Adfasdfjhalkds</span>
                    <p className="text-sm text-muted-foreground py-2">Time </p>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={(selectedConversation as any)?.profile} alt="Image not available" />
                    <AvatarFallback>{(selectedConversation as any)?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className=" bg-secondary p-3 rounded-md max-w-xs">Adfasdfjhalkds</span>
            </div>
        </ScrollArea>
    )
}

export default MessageContainer
