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


// const [gameOver, setGameOver] = useState({ status: false, message: "" })
// <AlertDialog defaultOpen={gameOver?.status}>
// <AlertDialogContent>
//     <AlertDialogHeader>
//         <AlertDialogTitle>{gameOver?.message}</AlertDialogTitle>
//         <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
//     </AlertDialogHeader>
//     <AlertDialogFooter>
//         <AlertDialogCancel>Cancel</AlertDialogCancel>
//         <AlertDialogAction>Continue</AlertDialogAction>
//     </AlertDialogFooter>
// </AlertDialogContent>
// </AlertDialog>
{/* <AlertDialog defaultOpen={gameOver}>
<AlertDialogContent>
    <AlertDialogHeader>
        <AlertDialogTitle>{gameOver}</AlertDialogTitle>
        <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog> */}