import React, { useEffect, useRef, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { setSelectedConversation } from "../../../slices/userSlice"
import { useGetMessagesQuery } from "../../../slices/messagesApiSlice"
import MessageSkelton from "./MessageSkelton"
import Message from "./Message"
import { setMessages } from "../../../slices/messagesSlice"
import ChatHeader from "./ChatHeader"
function MessageContainer() {
    const dispatch = useDispatch()
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    const { messages } = useSelector((state: RootState) => state.messages)
    console.log("messages1--:", messages)
    
    const { data, error, isLoading } = useGetMessagesQuery({ id: (selectedConversation as any)?._id })
    console.log("data--:", data)

    dispatch(setMessages(data))
    console.log("messages2--:", messages)

    return (
        <>
            <ChatHeader />
            <ScrollArea className="h-[77vh] rounded-md border p-1">
                {!isLoading && messages?.length > 0 && messages.map((message: any) => <Message key={message._id} message={message} />)}
                {isLoading && [...Array(3)].map((_, idx) => <MessageSkelton key={idx} />)}
                {!isLoading && messages?.length === 0 && <p className="text-center">Send a message to start the conversation</p>}
            </ScrollArea>
        </>
    )
}

export default MessageContainer
