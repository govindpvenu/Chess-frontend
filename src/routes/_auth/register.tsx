import { createFileRoute, Link } from "@tanstack/react-router"
export const Route = createFileRoute("/_auth/register")({
    component: Register,
})
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { VerifyOtpRegister } from "@/components/VerifyOtpRegister"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../../slices/userApiSlice"
import { setCredentials } from "../../slices/authSlice"
import type { RootState } from "../../store"

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    const dispatch = useDispatch()
    const [register] = useRegisterMutation()
    const { userInfo } = useSelector((state: RootState) => state.auth)

    const submitHandler = async () => {
        if (username.length < 3) {
            toast.error("User name should have atleast 3 characters.")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Email is not valid.")
        } else if (password.length < 8) {
            toast.error("Password should have atleast 8 characters.")
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match.")
        } else {
            try {
                setShowLoader(true)
                const res = await register({ username, email, password }).unwrap()
                console.log(res)
                dispatch(setCredentials({ ...res }))
            } catch (err: any) {
                setShowLoader(false)
                console.log(err)
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return userInfo?.otp ? (
        <VerifyOtpRegister />
    ) : (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <CardDescription>Enter your email below to login your account</CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Username</Label>
                        <Input id="email" type="username" placeholder="Enter a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirm password</Label>
                        <Input id="password2" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    {/* <div className="grid gap-2">
            <Label htmlFor="password">Country</Label>
            <CountrySelect />
          </div> */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            Already a user?
                            <Link to="/login" className=" underline underline-offset-4 hover:text-primary">
                                {" "}
                                Log in
                            </Link>
                        </Label>
                    </div>
                    {showLoader ? (
                        <Button className="w-full">Processing..</Button>
                    ) : (
                        <Button onClick={submitHandler} className="w-full">
                            Create account
                        </Button>
                    )}
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </div>
    )
}
