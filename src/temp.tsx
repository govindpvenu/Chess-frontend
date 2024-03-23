// // import { createFileRoute } from "@tanstack/react-router"
// // export const Route = createFileRoute("/vs-computer")({
// //     component: HumanVsComputer,
// // })

// import { useState } from "react"
// import Chessboard from "chessboardjsx"
// import { ShortMove } from "../../node_modules/@types/chess.js"
// import { Chess } from "chess.js"

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
