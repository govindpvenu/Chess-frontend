import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"
export const Route = createFileRoute("/_private/game")({
    component: Game,
})
import socket from "../../socket"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { InitGame } from "@/components/Game/InitGame"
import { PlayGame } from "@/components/Game/PlayGame"

function Game() {
    const { userInfo } = useSelector((state: RootState) => state.auth)

    const [room, setRoom] = useState<string>("")
    const [orientation, setOrientation] = useState("")
    const [players, setPlayers] = useState([])
    // resets the states responsible for initializing a game
    const cleanup = useCallback(() => {
        setRoom("")
        setOrientation("")
        setPlayers([])
    }, [])

    useEffect(() => {
        // const username = prompt("Username");
        // setUsername(username);
        socket.emit("username", userInfo?.username)
        socket.on("opponentJoined", (roomData: any) => {
            console.log("roomData", roomData)
            setPlayers(roomData.players)
        })
    }, [])

    return room ? (
        <PlayGame
        room={room}
        orientation={orientation}
        username={userInfo?.username}
        players={players}
        // the cleanup function will be used by Game to reset the state when a game is over
        cleanup={cleanup}

        />
    ) : (
        <InitGame orientation={orientation} setRoom={setRoom} setOrientation={setOrientation} setPlayers={setPlayers} />
    )
}
