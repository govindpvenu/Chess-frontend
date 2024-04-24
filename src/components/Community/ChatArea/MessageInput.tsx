import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { messagesApiSlice, useSendMessageMutation } from "../../../slices/messagesApiSlice"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { setMessages } from "../../../slices/messagesSlice"

function MessageInput() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const [sendMessage] = useSendMessageMutation()
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    const { messages } = useSelector((state: RootState) => state.messages)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!message) return
        try {
            setLoading(true)
            console.log({message})

            const res = await sendMessage({ id: (selectedConversation as any)?._id, message }).unwrap()
            console.log("res:",res)
            console.log("setMessages:",[...messages, res])
            
            console.log("messages1:",messages)
            dispatch(setMessages([...messages, res]))
            console.log("messages2:",messages)
            setMessage("")

        } catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" onSubmit={handleSubmit}>
            <Label htmlFor="message" className="sr-only">
                Message
            </Label>
            <div className="flex items-center p-3 pt-0">
                <Textarea id="message" placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0" />
                {/* {loading? <div className='loading loading-spinner'></div> <BsSend />} */}
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                </Button>
            </div>
        </form>
    )
}

export default MessageInput
