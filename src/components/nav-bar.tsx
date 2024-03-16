import { ModeToggle } from "./mode-toggle"
import ProfileAvatar from "./profile-avatar"
import Logo from "../assets/logo.png"
import { NavigationMenu, navigationMenuTriggerStyle, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu"
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
                        <Link to="/">
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <img className="w-32" src={Logo} alt="Chess.com" />
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </Link>
                        {userInfo?.verified ? (
                            <>
                                <Link to="/">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                                    </NavigationMenuItem>
                                </Link>
                                <Link to="/community">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Community</NavigationMenuLink>
                                    </NavigationMenuItem>
                                </Link>

                                <Link to="/ranking">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ranking</NavigationMenuLink>
                                    </NavigationMenuItem>
                                </Link>

                                <Link to="/about">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                                    </NavigationMenuItem>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                                    </NavigationMenuItem>
                                </Link>
                                <Link to="/about">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                                    </NavigationMenuItem>
                                </Link>
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
