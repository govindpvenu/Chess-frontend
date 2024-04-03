import { apiSlice } from "./apiSlice"

const GAME_URL = "/api/game"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        updateWins: builder.mutation({
            query: (data) => ({
                url: `${GAME_URL}/update-wins`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
})
export const { useUpdateWinsMutation } = authApiSlice
