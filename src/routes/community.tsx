import { createFileRoute, useNavigate } from "@tanstack/react-router"
import type { RootState } from "../store"
import { useSelector } from "react-redux"
import { useEffect } from "react"
export const Route = createFileRoute("/community")({
    component: Community,
})

function Community() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userInfo?.verified) navigate({ to: "/login" })
    }, [navigate, userInfo])

    return (
        <div className="p-2">
            <h3> community!</h3>
        </div>
    )
}
