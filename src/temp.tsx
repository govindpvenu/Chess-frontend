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
{
    /* <AlertDialog defaultOpen={gameOver}>
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
</AlertDialog> */
}
<div className="border-b">
<div className="flex h-16 items-center px-4">
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link to="/">
                    <img className="w-32" src={Logo} alt="Chess.com" />
                </Link>
            </NavigationMenuItem>
            {userInfo?.verified ? (
                <>
                    <NavigationMenuItem>
                        <Link to="/" className={navigationMenuTriggerStyle()}>
                            Home
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/community" className={navigationMenuTriggerStyle()}>
                            Community
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link to="/ranking" className={navigationMenuTriggerStyle()}>
                            Ranking
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link to="/about" className={navigationMenuTriggerStyle()}>
                            About
                        </Link>
                    </NavigationMenuItem>
                </>
            ) : (
                <>
                    <NavigationMenuItem>
                        <Link to="/" className={navigationMenuTriggerStyle()}>
                            Home
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/about" className={navigationMenuTriggerStyle()}>
                            About
                        </Link>
                    </NavigationMenuItem>
                </>
            )}
        </NavigationMenuList>
    </NavigationMenu>
    <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        {userInfo?.verified ? (
            <ProfileAvatar />
        ) : (
            <>
                <Link to="/login">
                    <Button>Log In</Button>
                </Link>
                <Link to="/register">
                    <Button>Register</Button>
                </Link>
            </>
        )}
    </div>
</div>
</div>
