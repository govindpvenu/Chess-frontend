import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_private")({
    beforeLoad: ({ context }) => {
        const { isAuthenticated } = context.authentication
        if (!isAuthenticated()) {
            throw redirect({
                to: "/login",
            })
        }
    },
})
