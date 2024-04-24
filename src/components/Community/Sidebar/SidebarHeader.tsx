
function SidebarHeader() {
    return (
        <div className="sticky top-0 z-10 flex h-[57px] items-center gap-1 bg-background px-4">
            <h1 className="text-xl font-semibold">Chat</h1>
            {/* <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
    </div> */}
        </div>
    )
}

export default SidebarHeader
