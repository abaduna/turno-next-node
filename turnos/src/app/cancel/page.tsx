"use client";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { type time } from "../../interface/inteface";
import { useFetch } from "@/hoocks/useFetch";
import styles from "./cancelar.module.css"
import { boolean } from "yup";
type Props = {};

function Page({}: Props) {
  const [time, setTime] = useState<time[] | null>([]);
  const { getData,pathDate } = useFetch();
  const [update,setUpdate]= useState<boolean>(false)
  useEffect(() => {
    let user = "";
    let token: string = localStorage.getItem("token") ?? "";
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken) {
      // Mostrar la carga útil decodificada
      console.log("Carga útil decodificada:", decodedToken.payload);

      // Verificar si la carga útil contiene información sobre el usuario
      if (decodedToken.payload && decodedToken.payload.user) {
        user = decodedToken.payload.user;
      } else {
        console.log("No se encontró información sobre el usuario en el token.");
      }
    }
    const getTime = async () => {
      const data = await getData(`api/time/cancel/${user}`);
      
      setTime(data.data.data);
    };
    getTime();
  }, [update]);
  
const pathTime =async(id:number)=>{
 const result =await pathDate(`api/time/cancel/${id}`)
 console.log(result);
 setUpdate(!update)
}
  return (
    <div className={styles.container}>
    <h1 className={styles.heading}>Cancelar</h1>
    {time?.map((reservados) => (
      <div key={reservados.id} className={styles.reservation}>
        <p>
          Empieza a las{" "}
          {new Date(reservados.dateStart).getHours().toLocaleString()} el día {reservados.dataDia}
        </p>
        {new Date(reservados.dataDia) > new Date()
          ? <button
          className={styles.cancelButton}
          onClick={() => pathTime(reservados.id)}
        >
          Cancelar
        </button>
          : "No se puede cancelar"}
        
      </div>
    ))}
  </div>
  );
}

export default Page;
