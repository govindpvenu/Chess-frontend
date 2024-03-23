import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { toast } from "react-toastify"
export const Route = createFileRoute("/_auth/reset-password")({
    component: ResetPassword,
})
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import type { RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useResetPasswordMutation } from "../../slices/userApiSlice"
import { setCredentials } from "../../slices/authSlice"

export function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [resetPassword] = useResetPasswordMutation()
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const submitHandler = async () => {
        if (password.length < 8) {
            toast.error("Password should have atleast 8 characters.")
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match.")
        } else {
            try {
                const email = userInfo?.email
                const res = await resetPassword({ email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate({ to: "/login" })
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
                    <CardTitle className="text-2xl">Reset Passoword</CardTitle>
                    <CardDescription>Enter a new password.</CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" type="password" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirm password</Label>
                        <Input id="password2" type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <Button onClick={submitHandler} className="w-full">
                        Change Password
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
