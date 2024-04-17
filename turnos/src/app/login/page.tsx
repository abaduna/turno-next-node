"use client"
import { useFetch } from "@/hoocks/useFetch"
import { tokenProps } from "@/interface/inteface"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

type Props = {}

function Page({}: Props) {
  const [name,setName]= useState<string>("")
  const [password,setPassword]= useState<string>("")
  const {postData}= useFetch()
  const router = useRouter();
    const handlerLogin =async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = {
          name,
          password
        }
        try {
         const token= await postData("api/login",data)
         console.info("toek",token);
         
         if (token) {
          console.log(token.data.token);
          
          localStorage.setItem("token", token.data.token);
          router.push("/")
        } else {
          console.log(`El token es ${token} indefinido. `);
        }
          // localStorage.setItem("token",token)
          
        } catch (error) {
          console.log(error);
          
        }
        
    }
  return (
    <div>
        <form onSubmit={handlerLogin}>
            <input placeholder="usuario" onChange={e=>setName(e.target.value)}/>
            <input placeholder="contraseña" type="password" onChange={e=>setPassword(e.target.value)}/>
            <button>Ingresar</button>
        </form>
    </div>
  )
}

export default Page