import { ThemeProvider } from "@/components/theme-provider"

import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ToastContainer />
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
