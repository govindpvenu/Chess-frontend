import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import socket from "../socket"
import { CreateGame } from "@/components/CreateGame"
import { Button } from "@/components/ui/button"
import { useNavigate } from "@tanstack/react-router"

export function InitGame({ setRoom, setOrientation, setPlayers }: any) {
    const [roomInput, setRoomInput] = useState("")
    const navigate = useNavigate()

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
            setOrientation("black") // set orientation as black
            //   setRoomDialogOpen(false); // close dialog
        })
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[900px] h-96 flex flex-col items-center">
                <CardHeader>
                    <CardTitle>Play Online with your friend</CardTitle>
                </CardHeader>
                <CardContent className="my-10 w-[500px]">
                    <Button
                        className="w-96 my-4"
                        variant="outline"
                        onClick={() => {
                            socket.emit("username", "govind")
                            socket.emit("createRoom", (r: any) => {
                                console.log(r)
                                setRoom(r)
                                setOrientation("white")
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
