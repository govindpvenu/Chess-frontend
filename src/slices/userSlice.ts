import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    selectedConversation: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        },
    },
})

export const { setSelectedConversation ,} = userSlice.actions
export default userSlice.reducer

