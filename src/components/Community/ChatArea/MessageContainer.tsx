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
function MessageContainer() {
    const dispatch = useDispatch()
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    const { messages } = useSelector((state: RootState) => state.messages)
    const { data, error, isLoading } =  useGetMessagesQuery({ id: (selectedConversation as any)?._id })
    // dispatch(setMessages(data))

    // const lastMessageRef = useRef<HTMLElement>(null) // Set initial type

    // useEffect(() => {
    //     setTimeout(() => {
    //         ;(lastMessageRef.current as HTMLElement)?.scrollIntoView({ behavior: "smooth" })
    //     }, 100)
    // }, [messages])

    // useEffect(() => {
    //     const getMessages = async () => {
    //         try {
    //             const { data, error, isLoading } = useGetMessagesQuery({ id: (selectedConversation as any)?._id })
    //             console.log("mmmmmmmm",messages)
    //             dispatch(setMessages(data))
    //             if (error) throw new Error(data.error)
    //         } catch (error: any) {
    //             console.error(error?.message)
    //         } 
    //     }
    //     getMessages()
    // }, [setMessages])

    console.log("data--:", data)
    console.log("data--:", messages)
    // useEffect(() => {
    //     // cleanup function (unmounts component)
    //     return () => {
    //         dispatch(setSelectedConversation(null))
    //     }
    // }, [setSelectedConversation])

    return (
        <ScrollArea className="h-[77vh] rounded-md border p-1">
            {!isLoading && messages.length > 0 && messages.map((message: any) => <Message key={message._id} message={message} />)}
            {isLoading && [...Array(3)].map((_, idx) => <MessageSkelton key={idx} />)}
            {!isLoading && messages.length === 0 && <p className="text-center">Send a message to start the conversation</p>}
        </ScrollArea>
    )
}

export default MessageContainer
