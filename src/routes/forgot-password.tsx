import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { toast } from "react-toastify"
export const Route = createFileRoute("/forgot-password")({
    component: ForgotPassword,
})
import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Link } from "@tanstack/react-router"
import { VerifyOtpForgetPass } from "@/components/VerifyOtpForgetPass"

import type { RootState } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useForgotPasswordMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"

export function ForgotPassword() {
    const [email, setEmail] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [forgotPassword] = useForgotPasswordMutation()

    const { userInfo } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (userInfo?.verified) {
            navigate({ to: "/" })
        }
    }, [navigate, userInfo])

    const submitHandler = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Email is not valid.")
        } else {
            try {
                const res = await forgotPassword({ email }).unwrap()
                dispatch(setCredentials({ ...res }))
            } catch (err: any) {
                console.log(err?.data?.message || err?.error)
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return userInfo?.otp ? (
        <VerifyOtpForgetPass />
    ) : (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[350px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Forgot Passoword</CardTitle>
                    <CardDescription>Enter your email.</CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <Button onClick={submitHandler} className="w-full">
                        Send Verification Code
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
