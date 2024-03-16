import { createFileRoute, useNavigate } from "@tanstack/react-router"
import type { RootState } from "../store"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const Route = createFileRoute("/ranking")({
    component: Ranking,
})

function Ranking() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userInfo?.verified) navigate({ to: "/login" })
    }, [navigate, userInfo])

    return (
        <div className="p-2">
            <h3> ranking!</h3>
        </div>
    )
}
