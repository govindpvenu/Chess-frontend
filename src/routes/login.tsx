import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { toast } from "react-toastify"
export const Route = createFileRoute("/login")({
    component: Login,
})
import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Link } from "@tanstack/react-router"

import type { RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const google = () => {
        window.open("http://localhost:5000/auth/google")
    }

    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [login] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo?.verified) {
            navigate({ to: "/" })
        }
    }, [navigate, userInfo])

    const submitHandler = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Email is not valid.")
        } else if (password.length < 8) {
            toast.error("Password should have atleast 8 characters.")
        } else {
            try {
                const res = await login({ email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
            } catch (err: any) {
                console.log(err?.data?.message || err?.error)
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email below to login your account</CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="grid gap-2">
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <Link to="/forgot-password" className="underline underline-offset-4 hover:text-primary">
                                Forgot Password?
                            </Link>
                        </p>
                    </div>

                    <Button onClick={submitHandler} className="w-full">
                        Log In
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <Button variant="outline" onClick={google}>
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            New User?
                            <Link to="/register" className=" underline underline-offset-4 hover:text-primary">
                                Create an account
                            </Link>
                        </Label>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
