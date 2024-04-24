import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Shuffle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import socket from "../../socket"
import { CreateGame } from "@/components/Game/CreateGame"
import { Button } from "@/components/ui/button"
import { useNavigate } from "@tanstack/react-router"

export function InitGame({ orientation, setRoom, setOrientation, setPlayers }: any) {
    const [roomInput, setRoomInput] = useState("")
    console.log(orientation)
    function handleJoin() {
        // join a room
        console.log("joining")
        if (!roomInput) return // if given room input is valid, do nothing.
        socket.emit("joinRoom", { roomId: roomInput }, (r: any) => {
            // r is the response from the server
            if (r.error) {
                console.log(r.message)
                return
            }
            console.log("response:", r)
            setRoom(r?.roomId) // set room to the room ID
            setPlayers(r?.players) // set players array to the array of players in the room
            console.log("orientaion:", r.players[0].username)

            setOrientation(r.players[0].username==="white"?"black":"white") // set orientation as black

            //   setRoomDialogOpen(false); // close dialog
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
                    <Button
                        className="w-96 my-4"
                        variant="outline"
                        onClick={() => {
                            socket.emit("username", orientation)
                            socket.emit("createRoom", (r: any) => {
                                console.log(r)
                                setRoom(r)
                                // setOrientation(orientation)
                            })
                        }}
                    >
                        Create Game
                    </Button>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" value={roomInput} placeholder="Enter a code or link" onChange={(e) => setRoomInput(e.target.value)} />
                        <Button onClick={handleJoin}>Join</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
