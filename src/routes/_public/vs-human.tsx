import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_public/vs-human")({
    component: HumanVsHuman,
})

import { Chess, ChessInstance } from "chess.js"
import { Chessboard } from "react-chessboard"
import { useState } from "react"

function HumanVsHuman() {
    const [game, setGame] = useState(new Chess())
    const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()

    function safeGameMutate(modify: (game: ChessInstance) => void) {
        setGame((g) => {
            const update = new Chess(g.fen())
            modify(update)
            return update
        })
    }

    function onDrop(sourceSquare: any, targetSquare: any, piece: any) {
        const gameCopy = new Chess(game.fen())
        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece[1]?.toLowerCase() ?? "q",
        })
        setGame(gameCopy)

        // illegal move
        if (move === null) return false

        // store timeout so it can be cleared on undo/reset
        clearTimeout(currentTimeout)
        const newTimeout = setTimeout(isOver, 200)
        setCurrentTimeout(newTimeout)
        return true
    }

    function isOver() {
        if (game.game_over() || game.in_draw()) {
            console.log("Exitt")
            return
        }
    }

    return (
        <div className="flex justify-center items-center h-[846px]">
            <div className="w-96 h-auto">
                <Chessboard
                    id="PlayVsRandom"
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    customBoardStyle={{
                        borderRadius: "4px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                    }}
                />
            </div>

            <button
                onClick={() => {
                    safeGameMutate((game) => {
                        game.reset()
                    })
                    clearTimeout(currentTimeout)
                }}
            >
                reset
            </button>
            <button
                onClick={() => {
                    safeGameMutate((game) => {
                        game.undo()
                    })
                    clearTimeout(currentTimeout)
                }}
            >
                undo
            </button>
        </div>
    )
}

// function HumanVsComputer() {
//     const [chess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))
//     const [fen, setFen] = useState(chess.fen())
//     const handleMove = (move: ShortMove) => {
//         if (chess.move(move)) {
//             setTimeout(() => {
//                 const moves = chess.moves()
//                 if (moves.length > 0) {
//                     const computerMove = moves[Math.floor(Math.random() * moves.length)]
//                     chess.move(computerMove)
//                     setFen(chess.fen())
//                 }
//             }, 300)
//             setFen(chess.fen())
//         }
//     }
//     return (
//         <div className="flex justify-center items-center h-[846px]">
//             <Chessboard
//                 position={fen}
//                 onDrop={(move) =>
//                     handleMove({
//                         from: move.sourceSquare,
//                         to: move.targetSquare,
//                         promotion: "q",
//                     })
//                 }
//             />
//         </div>
//     )
// }
