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
import MessageInput from "./MessageInput"
import { useSocketContext } from "../../../context/SocketContext"

function MessageContainer() {
    const dispatch = useDispatch()
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    // const { messages } = useSelector((state: RootState) => state.messages)
    // console.log("messages1--:", messages)

    const { data, error, isLoading } = useGetMessagesQuery({ id: (selectedConversation as any)?._id })
    console.log("data--:", data)
    const [mes, setMes] = useState<string[]>([])
    console.log({ mes })
    useEffect(() => {
        if (data) {
            setMes(data)
        }
    }, [data])
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [mes]);


    const { socket }: any = useSocketContext()

    useEffect(() => {
        socket?.on("newMessage", (newMessage: any) => {
            newMessage.shouldShake = true;
            console.log(newMessage)
            setMes([...mes, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, setMes, mes])

    // dispatch(setMessages(data))
    // console.log("messages2--:", messages)

    return (
        <>
            <ChatHeader />
            <ScrollArea className="h-[77vh] rounded-md border p-1">
                {!isLoading && mes?.length > 0 && mes.map((message: any) => (
                    	<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
                ))}
                {isLoading && [...Array(3)].map((_, idx) => <MessageSkelton key={idx} />)}
                {!isLoading && mes?.length === 0 && <p className="text-center">Send a message to start the conversation</p>}
            </ScrollArea>
            <MessageInput mes={mes} setMes={setMes} />
        </>
    )
}

export default MessageContainer
