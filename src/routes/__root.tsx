import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { NavBar } from "../components/nav-bar"
import type { RootState } from "../store"
import { useSelector } from "react-redux"
import { Login } from "./login"
import { useEffect } from "react"
export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    return (
        <>
            <NavBar />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}
