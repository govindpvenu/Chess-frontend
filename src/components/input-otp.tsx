import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"

export function OTPinput() {
    return (
        <InputOTP
            //   onComplete={onSubmit}
            //   onChange={setOtp}
            //   value={otp ?? ""}
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
    )
}
