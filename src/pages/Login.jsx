import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { loginUser, btnloading } = UserData();

  const submitHandler = () => {
    loginUser(email, navigate);
  };
  return <div className="min-h-[60vh]">
    <Card className="md:w-[400px] sm:w-[300px] m-auto mt-5">
      <CardHeader>
        <CardTitle>Enter Email to get OTP</CardTitle>
        <CardDescription>If you have already got OTP on mail then you can directly go to OTP tab</CardDescription>

      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-x-1">
          <Label>Enter Email</Label>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
      </CardContent>
      <CardFooter>
        <Button disabled={btnloading} onClick={submitHandler}>{btnloading?<Loader/> : "Submit"}</Button>
      </CardFooter>
    </Card>
  </div>;

};

export default Login;