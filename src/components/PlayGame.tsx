import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { useCallback, useEffect, useState } from "react"
import { Chess, Square } from "chess.js"
import { Chessboard } from "react-chessboard"
import socket from "../socket"
import type { RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { saveGame, clearGame } from "../slices/gameSlice"
import { Button } from "@/components/ui/button"
import { HistoryCard } from "@/components/HistoryCard"
import { useNavigate } from "@tanstack/react-router"
import { useUpdateWinsMutation } from "../slices/gameApiSlice"

export function PlayGame({ players, room, orientation, cleanup }: any) {
    const { userInfo } = useSelector((state: RootState) => state.auth)

    const [game] = useState(new Chess())
    const [updateWins] = useUpdateWinsMutation()

    const [position, setPosition] = useState("start")

    const dispatch = useDispatch()
    // const { gameState } = useSelector((state: RootState) => state.game)
    const navigate = useNavigate()
    const { toast } = useToast()

    function  isOver() {
        if (game.in_checkmate()) {
            async function update() {
                const res = await updateWins({ email: userInfo?.email }).unwrap()
            }
            update()
            return { title: "White wins", description: `${game.turn() === "w" ? "Black" : "White"} won the game by checkmate.` }
        } else if (game.in_draw()) {
            return { title: "Draw", description: "It's a draw." }
        } else if (game.in_stalemate()) {
            return { title: "Stalemate", description: "The king has no moves." }
        } else if (game.in_threefold_repetition()) {
            return { title: "Draw", description: "Draw by repetition." }
        } else {
            return false
        }
    }
    const makeAMove = useCallback(
        (move: any) => {
            try {
                const result = game.move(move) // update Chess instance
                setPosition(game.fen()) // update fen state to trigger a re-render

                const over = isOver()
                if (over) {
                    toast({
                        title: over.title,
                        description: over.description,
                        action: (
                            <ToastAction
                                onClick={() => {
                                    window.location.reload()
                                }}
                                altText="Game over"
                            >
                                Ok
                            </ToastAction>
                        ),
                    })
                }

                return result
            } catch (e) {
                return null
            } // null if the move was illegal, the move object if the move was legal
        },
        [game]
    )

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        console.log("Ondrop")
        if (game.turn() !== orientation[0]) return false // <- 1 prohibit player from moving piece of other player

        if (players.length < 2) return false // <- 2 disallow a move if the opponent has not joined

        const moveData = {
            from: sourceSquare,
            to: targetSquare,
            color: game.turn(),
            promotion: "q", // promote to queen where possible
        }

        const move = makeAMove(moveData)

        // illegal move
        if (move === null) return false

        socket.emit("move", {
            // <- 3 emit a move event.
            move,
            room,
        }) // this event will be transmitted to the opponent via the server

        return true
    }

    useEffect(() => {
        socket.on("move", (move) => {
            makeAMove(move) 
        })
    }, [makeAMove])
    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border">
            <ResizablePanel defaultSize={70}>
                <div className="flex items-center justify-center">
                    <div className="flex-col justify-center items-center">
                        <p className="font-semibold">Game ID:{room}</p>
                        <div className="w-[700px] h-auto">
                            <Chessboard
                                id="PlayVsRandom"
                                position={position}
                                onPieceDrop={onDrop}
                                // arePremovesAllowed={true}
                                customDarkSquareStyle={{ backgroundColor: "#739451" }}
                                customLightSquareStyle={{ backgroundColor: "#ecedd1" }}
                                customBoardStyle={{
                                    borderRadius: "10px",
                                    boxShadow: "0 5px 30px rgb(115, 148, 81)                                    ",
                                }}
                            />
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger className="my-9 dark" asChild>
                                <Button variant="destructive">Resign</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            window.location.reload()
                                        }}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={70}>
                        <div className="flex h-full items-center justify-center">
                            <HistoryCard history={game.history()} />
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30}>
                        <div className="flex h-full items-center justify-center p-6">
                            <span className="font-semibold">Video Chat</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
