"use client"
import { useFetch } from "@/hoocks/useFetch"
import { tokenProps } from "@/interface/inteface"
import { FormEvent, useState } from "react"

type Props = {}

function Page({}: Props) {
  const [user,setUser]= useState<string>("")
  const [password,setPassword]= useState<string>("")
  const {postData}= useFetch()
    const handlerLogin =async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = {
          name:user,
          password
        }
        try {
         const token= await postData("api/login",data)
         if (token) {
          console.log(token.data.token);
          
          localStorage.setItem("token", token.data.token);
        } else {
          console.log('El token es indefinido.');
        }
          // localStorage.setItem("token",token)
          
        } catch (error) {
          console.log(error);
          
        }
        
    }
  return (
    <div>
        <form onSubmit={handlerLogin}>
            <input placeholder="usuario" onChange={e=>setUser(e.target.value)}/>
            <input placeholder="contraseña" type="password" onChange={e=>setPassword(e.target.value)}/>
            <button>Ingresar</button>
        </form>
    </div>
  )
}

export default Page