import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    gameState: localStorage.getItem("gameState") ? JSON.parse(localStorage.getItem("gameState") as string) : null,
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        saveGame: (state, action) => {
            state.gameState = action.payload
            localStorage.setItem("gameState", JSON.stringify(action.payload))
        },
        clearGame: (state) => {
            state.gameState = null
            // state.gameState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            localStorage.removeItem("gameState")
        },
    },
})

export const { saveGame, clearGame ,} = gameSlice.actions
export default gameSlice.reducer

