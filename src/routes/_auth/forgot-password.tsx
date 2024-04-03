import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_auth/forgot-password")({
    component: ForgotPassword,
})

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { VerifyOtpForgetPass } from "@/components/VerifyOtpForgetPass"

import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useForgotPasswordMutation } from "../../slices/authApiSlice"
import { setCredentials } from "../../slices/authSlice"
import type { RootState } from "../../store"

export function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    const [forgotPassword] = useForgotPasswordMutation()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state: RootState) => state.auth)

    const submitHandler = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Email is not valid.")
        } else {
            try {
                setShowLoader(true)
                const res = await forgotPassword({ email }).unwrap()
                dispatch(setCredentials({ ...res }))
            } catch (err: any) {
                setShowLoader(false)
                console.log(err?.data?.message || err?.error)
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return userInfo?.otp ? (
        <VerifyOtpForgetPass />
    ) : (
        <div className="flex justify-center items-center flex-1 overflow-y-auto">
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
                    {showLoader ? (
                        <Button className="w-full">Processing..</Button>
                    ) : (
                        <Button onClick={submitHandler} className="w-full">
                            Send Verification Code
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
