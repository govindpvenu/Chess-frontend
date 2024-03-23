import { apiSlice } from "./apiSlice"

const USERS_URL = "/api/user"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: "POST",
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/verify-otp`,
                method: "PATCH",
                body: data,
            }),
        }),

        resendOtp: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/resend-otp`,
                method: "POST",
                body: data,
            }),
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/forget-password`,
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/reset-password`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
})
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation, useForgotPasswordMutation, useResetPasswordMutation } = usersApiSlice
