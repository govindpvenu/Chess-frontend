import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import socket from "../socket"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

export function CreateGame() {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState("")
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-96 my-4" variant="outline">
                    Create Game
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Game</DialogTitle>
                    <DialogDescription>Share this link to your friend.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Link:
                        </Label>
                        <Input id="name" value={roomId} placeholder="" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    {/* <Button
                        onClick={() => {
                            socket.emit("username", "govind")
                            socket.emit("createRoom", (r: any) => {
                                setRoomId(r)
                                console.log(r)
                                setRoom(r)
                                setOrientation("white")
                            })
                        }}
                    >
                        Generate Link
                    </Button>
                    <Button
                        onClick={() => {

                        }}
                    >
                        Start Game
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
