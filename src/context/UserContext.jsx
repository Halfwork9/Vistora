import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import {createContext, useContext, useEffect, useState} from "react";
import toast, {Toaster} from "react-hot-toast";

const UserContext = createContext();

//const server = import.meta.env.VITE_API_URL || "http://localhost:5000/";

export const UserProvider = ({children}) =>{
    const [user, setuser] = useState([])
    const [loading, setloading] = useState(true)
    const [btnloading, setbtnloading] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    async function loginUser(email, navigate) {
    setbtnloading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });
      toast.success(data.message);
      localStorage.setItem("email", email);
      navigate("/verify");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setbtnloading(false);
    }
  }
    async function verifyUser (otp, navigate, fetchCart){
        setbtnloading(true);
        const email = localStorage.getItem("email");
        try {
            const {data} = await axios.post(`${server}/api/user/verify`,{email,otp,});

            toast.success(data.message);
            localStorage.clear();
            navigate("/")
            setbtnloading(false);
            setIsAuth(true);
            setuser(data.user);
            
            Cookies.set("token", data.token, {
                expires: 15,
                secure: true,
                path: "/",
            });
            fetchCart();

        } catch (error) {
            toast.error(error.response.data.message);
            setbtnloading(false);
            
        }

    }

   

async function fetchUser() {
  try {
    console.log("SERVER URL:", server); // Debug
    const { data } = await axios.get(`${server}/api/user/me`, {
      headers: {
        token: Cookies.get("token"),
      },
    });

    setIsAuth(true);
    setuser(data);
    setloading(false);
  } catch (error) {
    console.log("Fetch User Error:", error);
    setIsAuth(false);
    setloading(false);
  }
}

function logoutUser(navigate, setTotalItem){
  Cookies.set("token" , null);
  setuser([]);
  setIsAuth(false);
  navigate("/login");
  toast.success("Logged Out");
  setTotalItem(0);
};
useEffect(()=>{
        fetchUser();
    },[]);
    return (<UserContext.Provider value={{user, loading, btnloading , isAuth, loginUser, verifyUser,logoutUser }}>
        {children}
        <Toaster />
    </UserContext.Provider>);
};

export const UserData = () => useContext(UserContext);