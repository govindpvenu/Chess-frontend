import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_private/community")({
    component: Community,
})
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { NoChatSelected } from "@/components/NoChatSelected"

import type { RootState } from "../../store"
import { useSelector } from "react-redux"
import Conversations from "@/components/Community/Sidebar/Conversations"
import MessageInput from "@/components/Community/ChatArea/MessageInput"
import MessageContainer from "@/components/Community/ChatArea/MessageContainer"

function Community() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const { selectedConversation  } = useSelector((state: RootState) => state.user)
    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border">
            <ResizablePanel defaultSize={30}>
                <div className="sticky top-0 z-10 flex h-[57px] items-center gap-1 bg-background px-4">
                    <h1 className="text-xl font-semibold">Chat</h1>
                    {/* <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
                    </div> */}
                </div>
                <Conversations/>

            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
                {!selectedConversation ? (
                    <NoChatSelected />
                ) : (
                    <div className="flex h-full min-h-[93vh] flex-col bg-muted/50 lg:col-span-2">
                        <div className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={(selectedConversation as any)?.profile} alt="Image not available" />
                                <AvatarFallback>{(selectedConversation as any)?.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <h1 className="text-xl font-semibold">{(selectedConversation as any)?.username}</h1>
                        </div>
                    <MessageContainer/>
                    <MessageInput/>
                    </div>
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
