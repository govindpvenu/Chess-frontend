import { ModeToggle } from "./mode-toggle"
import ProfileAvatar from "./profile-avatar"
import Logo from "../assets/logo.png"
import { NavigationMenu, navigationMenuTriggerStyle, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import type { RootState } from "../store"
import { useSelector } from "react-redux"

export function NavBar() {
    const { userInfo } = useSelector((state: RootState) => state.auth)

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to="/">
                                <img className="w-32" src={Logo} alt="Chess.com" />
                            </Link>
                        </NavigationMenuItem>
                        {userInfo?.verified ? (
                            <>
                                <NavigationMenuItem>
                                    <Link to="/" className={navigationMenuTriggerStyle()}>
                                        Home
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/community" className={navigationMenuTriggerStyle()}>
                                        Community
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link to="/ranking" className={navigationMenuTriggerStyle()}>
                                        Ranking
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link to="/about" className={navigationMenuTriggerStyle()}>
                                        About
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        ) : (
                            <>
                                <NavigationMenuItem>
                                    <Link to="/" className={navigationMenuTriggerStyle()}>
                                        Home
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/about" className={navigationMenuTriggerStyle()}>
                                        About
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    {userInfo?.verified ? (
                        <ProfileAvatar />
                    ) : (
                        <>
                            <Link to="/login">
                                <Button>Log In</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
