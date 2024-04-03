import { apiSlice } from "./apiSlice"

const MESSAGES_URL = "/api/messages"

export const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: ({ id, ...message }) => ({
                url: `${MESSAGES_URL}/send/${id}`,
                method: "POST",
                body: message,
            }),
        }),
        }),
})
export const {useSendMessageMutation} = messagesApiSlice
