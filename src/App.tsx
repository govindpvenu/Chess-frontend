import { ThemeProvider } from "@/components/theme-provider"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"

const router = createRouter({
    routeTree,
    context: { authentication: undefined! },
})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    const { googleAuth } = useAuth()
    useEffect(() => {
        googleAuth()
    }, [])
    const authentication = useAuth()
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ToastContainer />
            <RouterProvider router={router} context={{ authentication }} />
        </ThemeProvider>
    )
}

export default App
