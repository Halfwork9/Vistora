import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartData } from "@/context/CartContext";
import { UserData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Verify = () => {
    const [otp, setotp] = useState("");
    

    const Navigate = useNavigate();

    

    const {btnloading, loginUser, verifyUser} =  UserData();
    
    const {fetchCart} = CartData();

    const submitHandler = () => {
      verifyUser(Number(otp), Navigate, fetchCart);
    };

    const [Timer, setTimer] = useState(90);
    const [canResend, setCanResend] = useState(false);

    // Timer logic
  useEffect(() => {
    if (Timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [Timer]);

   // Format timer as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const handleResendOtp = async () => {
    const email = localStorage.getItem("email")
    await loginUser(email, Navigate)
    setTimer(90)
    setCanResend(false)
  };
  return (
    <div className="min-h-[60vh]">
        <Card className="md:w-[400px] sm:w-[300px] m-auto mt-5">
          <CardHeader>
            <CardTitle>Verify User OTP</CardTitle>
            <CardDescription >Check your email (or spam folder) for the OTP sent to you. </CardDescription>
    
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-x-1">
              <Label>Enter OTP</Label>
              <Input type="number" placeholder="Enter your OTP" value={otp} onChange={(e) => setotp(e.target.value)} />
              </div>
          </CardContent>
          <CardFooter>
            <Button disabled={btnloading} onClick={submitHandler}>{btnloading?<Loader/> : "Submit"}</Button>
          </CardFooter>

          <div className="flex flex-col justify-center items-center w-[200px] m-auto">
            <p className="text-md text-text">
                {
                    canResend ? "You can Now Resend OTP": `Time Remaining:${formatTime(Timer)}`
                }
            </p>
            <Button onClick={handleResendOtp} className="mb-3" disabled={!canResend}>Resend OTP</Button>
          </div>
        </Card>
      </div>
    
  
  );
};

export default Verify;   