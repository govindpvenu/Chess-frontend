import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_private/community")({
    component: Community,
})

function Community() {
    return (
        <div className="p-2">
            <h3> community!</h3>
        </div>
    )
}
