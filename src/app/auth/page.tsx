"use client";
import Input from '@/components/Input'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


import React, { useCallback, useEffect, useState } from 'react'
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
    const {status } = useSession(); 
    const router = useRouter();
    const[email,setEmail] = useState("")
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")
    useEffect(() => {
        if (status === "authenticated") {
          router.push("/profiles"); 
        }
      }, [status, router]);
    
    const[variant,setVariant] = useState("login")
    const toggleVariant=useCallback(()=>{
        setVariant((currentVariant)=>currentVariant ==="login"?"register":"login")
    },[])
    const login = useCallback(async () => {
        try {
                await signIn('credentials',{
                email,
                password,
                
                callbackUrl:'/profiles'
            });
            
        } catch (error) {
            console.log("login Error:", error);
        }

    },[email,password])
    const register = useCallback(async ()=>{
            try {
                console.log("Registering user:", { email, name, password }); // Debugging
                const response=await axios.post("/api/register",{
                    email,
                    name,
                    password,
                });
                login();
                console.log("User registered:", response.data); // Debugging
            } catch (error) {
                console.log("Registration Error:", error);
            }
    },[email, name, password,login])

return (
    <div className="relative h-full w-full bg-[url('/images/bg.jpg')] bg-no-repeat bg-cover bg-center bg-fixed ">
        <div className='bg-black w-full min-h-screen lg:bg-opacity-50'>
        <Image
                src="/images/Netflix_Logo_PMS.png"
                alt="logo"
                width={140}
                height={140}
                className=''
                />
        <div className='flex justify-center'>
            <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                    {variant==="login"?"Sign In":"Register"}
                </h2>
                <div className="flex flex-col gap-4">
                    {variant==="register"&&(
                        <Input
                        label="Username"
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        type="text"
                        value={name}
                        />
                    )}
                    <Input
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    value={email}
                    />
                    
                    <Input
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    value={password}
                    />
                </div>
                <button onClick={variant==="login"?login:register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                    {variant==="login"?"Login":"Create an Account"}
                </button>
                <div className='flex flex-row items-center justify-center gap-4 mt-8'>
                    <div onClick={()=>signIn("google",{callbackUrl: "/profiles"})} className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                        <FcGoogle size={30}/>
                    </div>
                    <div onClick={()=>signIn("github",{callbackUrl: "/profiles"})} className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                        <FaGithub size={30}/>
                    </div>
                </div>
                <p className='text-neutral-500 mt-12'>{variant==="login"?"First Time Using Netflix?":"Already have an account"}</p>
                <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>{variant==="login"?"Create an Account":"Login"}</span>
                
            </div>
        </div>
        </div>
    </div>
)
}

export default Auth
