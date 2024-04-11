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
        getMessages: builder.query({
            query: ({id}) => ({
                url: `${MESSAGES_URL}/${id}`,
            }),
        }),
        }),
})
export const {useSendMessageMutation,useGetMessagesQuery} = messagesApiSlice
