import { apiSlice } from "./apiSlice"

const USER_URL = "/api/user"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: `${USER_URL}/get-all-users`,
            }),
        }),
        getOtherUsers: builder.query({
            query: () => ({
                url: `${USER_URL}/get-other-users`,
            }),
        }),
    }),
    
})
export const { useGetAllUsersQuery,useGetOtherUsersQuery } = usersApiSlice
