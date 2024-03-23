import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_private/ranking")({
    component: Ranking,
})

function Ranking() {
    return (
        <div className="p-2">
            <h3> ranking!</h3>
        </div>
    )
}
