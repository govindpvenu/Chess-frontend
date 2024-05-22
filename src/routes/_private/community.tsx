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

import { NoChatSelected } from "@/components/Community/ChatArea/NoChatSelected"

import type { RootState } from "../../store"
import { useSelector } from "react-redux"
import Conversations from "@/components/Community/Sidebar/Conversations"
import MessageInput from "@/components/Community/ChatArea/MessageInput"
import MessageContainer from "@/components/Community/ChatArea/MessageContainer"
import Sidebar from "@/components/Community/Sidebar/SidebarHeader"

function Community() {
    const { selectedConversation } = useSelector((state: RootState) => state.user)
    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border">
            <ResizablePanel defaultSize={30}>
                <Sidebar />
                <Conversations />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
                {!selectedConversation ? (
                    <NoChatSelected />
                ) : (
                    <div className="flex h-full min-h-[93vh] flex-col bg-muted/50 lg:col-span-2">
                        <MessageContainer />
                    </div>
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
