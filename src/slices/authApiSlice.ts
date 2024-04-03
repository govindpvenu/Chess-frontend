import { apiSlice } from "./apiSlice"

const AUTH_URL = "/api/auth"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/verify-otp`,
                method: "PATCH",
                body: data,
            }),
        }),

        resendOtp: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/resend-otp`,
                method: "POST",
                body: data,
            }),
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/forget-password`,
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password`,
                method: "PATCH",
                body: data,
            }),
        }),

    }),
})
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation, useForgotPasswordMutation,useResetPasswordMutation } = authApiSlice
