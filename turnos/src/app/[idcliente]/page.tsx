"use client"
import { useEffect, useState } from "react";
import { type field } from "@/interface/inteface";
import { useFetch } from "@/hoocks/useFetch";
import FieldComponet from "@/componets/FieldComponet";

interface paramsProps {
    params: {
        idcliente: string;
    };
}

function Page({params}:paramsProps) {
    const [field,setField]=useState<field[]>()
    const [endpoint,setEndpoint]=useState<string>("")
    const {getData} =useFetch()
    useEffect(()=>{
        const getFields=async()=>{
            try {
              setEndpoint(`api/field/${params.idcliente}`)
              console.log(endpoint);
              
            const data = await getData(endpoint)
           
            console.log(data);
            
            if (typeof data !== "undefined") {
                setField(data.data);
                console.log(field);
                
                
            }else{
                console.log(`undefind`);
                
            }  
            } catch (error) {
                console.error(error);
                
            }
            
        }
        getFields()
    },[endpoint])
  return (
    <div>
        <h1>Eleji tu cancha</h1>
        { field &&field?.length>0 && field?.map((fiel,idex)=>(
            <FieldComponet key={idex}  {...fiel}/>
        ))}
    </div>
  )
}

export default Page