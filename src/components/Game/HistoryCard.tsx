import { TransparencyGridIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function HistoryCard({ history }:any ) {
    return (
        <Card className={cn("w-[380px]")}>
            <CardHeader>
                <CardTitle>History</CardTitle>
                <CardDescription>{history.length} moves made.</CardDescription>
            </CardHeader>
            <ScrollArea className="h-[400px] rounded-md border p-4">
                <CardContent className="grid gap-4">
                    <div>
                        {history.map((move: string, index: number) => (
                            <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
                                <TransparencyGridIcon></TransparencyGridIcon>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {index + 1}. {move}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{index % 2 ? "Black" : "White"}</p>
                                    <Separator />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </ScrollArea>
            <CardFooter></CardFooter>
        </Card>
    )
}
