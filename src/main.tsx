import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import store from "./store.ts"
import { Provider } from "react-redux"
import { SocketContextProvider } from "./context/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <SocketContextProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </SocketContextProvider>
    </Provider>
)
