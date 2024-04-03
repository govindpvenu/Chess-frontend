import { useNavigate } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useResendOtpMutation, useVerifyOtpMutation } from "../slices/authApiSlice"
import { setCredentials } from "../slices/authSlice"
import type { RootState } from "../store"

export function VerifyOtpRegister() {
    const [otp, setOtp] = useState<string | null>(null)
    const [timer, setTimer] = useState(10)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [verifyOtp] = useVerifyOtpMutation()
    const [resendOtp] = useResendOtpMutation()

    useEffect(() => {
        let intervalId: any
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1)
            }, 1000)
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [timer])

    const handleResend = async () => {
        setTimer(10)
        const res = await resendOtp({ email: userInfo.email }).unwrap()
        dispatch(setCredentials({ ...res }))
    }

    const onSubmit = async () => {
        if (otp == userInfo?.otp) {
            const res = await verifyOtp({ email: userInfo.email }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate({ to: "/" })
        } else {
            toast.error("Wrong OTP")
        }
    }

    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Verify Email</CardTitle>
                    <CardDescription>Enter the 6-digit OTP to verify your email.</CardDescription>
                </CardHeader>
                <CardContent>
                    <InputOTP
                        onComplete={onSubmit}
                        onChange={setOtp}
                        value={otp ?? ""}
                        maxLength={6}
                        containerClassName="group flex items-center has-[:disabled]: opacity-30"
                        render={({ slots }) => (
                            <>
                                <InputOTPGroup>
                                    {slots.slice(0, 3).map((slot, index) => (
                                        <InputOTPSlot key={index} {...slot} />
                                    ))}{" "}
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    {slots.slice(3).map((slot, index) => (
                                        <InputOTPSlot key={index} {...slot} />
                                    ))}
                                </InputOTPGroup>
                            </>
                        )}
                    />
                </CardContent>
                <CardFooter>{timer > 0 ? <CardDescription>Resend({timer}s)</CardDescription> : <button onClick={handleResend}>Resend</button>}</CardFooter>
            </Card>
        </div>
    )
}
