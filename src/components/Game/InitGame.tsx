import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Shuffle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import socket from "../../socket"
import { Button } from "@/components/ui/button"
import { useNavigate } from "@tanstack/react-router"

export function InitGame({ orientation, setRoom, setOrientation, setPlayers }: any) {
    const [roomInput, setRoomInput] = useState("")
    
    function createGame() {
        socket.emit("username", orientation)
        socket.emit("createRoom", (roomId: any) => {
            setRoom(roomId)
        })
    }

    function joinGame() {
        if (!roomInput) return
        socket.emit("joinRoom", { roomId: roomInput }, (roomData: any) => {
            if (roomData.error) {
                console.log(roomData.message)
                return
            }
            setRoom(roomData?.roomId)
            setPlayers(roomData?.players)
            console.log("orientaion:", roomData.players[0].username)

            setOrientation(roomData.players[0].username === "white" ? "black" : "white")
        })
    }
    return (
        <div className="flex justify-center items-center flex-1 overflow-auto-y">
            <Card className="w-[900px] h-96 flex flex-col items-center">
                <CardHeader>
                    <CardTitle>Play Online with your friend</CardTitle>
                </CardHeader>
                <CardContent className="my-10 w-[500px]">
                    <ToggleGroup
                        value={orientation}
                        onValueChange={(value) => {
                            setOrientation(value)
                        }}
                        size={"lg"}
                        variant="outline"
                        type="single"
                    >
                        <ToggleGroupItem value="white" aria-label="Toggle white">
                            White
                        </ToggleGroupItem>

                        <ToggleGroupItem value="black" aria-label="Toggle black">
                            Black
                        </ToggleGroupItem>
                        <ToggleGroupItem value={Math.random() < 0.5 ? "black" : "white"} aria-label="Toggle random">
                            <Shuffle />
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button className="w-96 my-4" variant="outline" onClick={createGame}>
                        Create Game
                    </Button>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" value={roomInput} placeholder="Enter a code or link" onChange={(e) => setRoomInput(e.target.value)} />
                        <Button onClick={joinGame}>Join</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
