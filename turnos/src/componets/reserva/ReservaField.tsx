"use client"
import styles from "./ReservaField.module.css"
import { useFetch } from "@/hoocks/useFetch"
import { field } from "@/interface/inteface"
import { useEffect, useState } from "react"
import {type time} from "@/interface/inteface"
const ReservaField = ({
    dataState,
    id,
    idfield,
    idusuario,
    name,
    ubicacion,
    setMesaggeSusefull,
  }: field) => {
    const [time,setTime]=useState<time[]>([])
    const [update,setUpdate]= useState<boolean>(false)
    const {getData,deletedDate}=useFetch()
    useEffect(()=>{
        const getDataTime= async()=>{
            const result =await getData(`/api/reserve/time/${idusuario}/${dataState}/${idfield}`)
            console.log(result);
            
            setTime(result.data)
        }
        getDataTime()
    },[dataState,update])
    const handlerDeleted =(id:number)=>{
      deletedDate(`/api/reserve/deletd/${id}`)
      setUpdate(!update)

    }
  return (
    <div className={styles.reservasContainer}>
    <p>{name}</p>
    {time?.length === 0 ? (
      <p className={styles.noReserva}>No hay reserva</p>
    ) : (
      time.map((reservas) => (
        <div className={styles.reserva} key={reservas.id}>
          <p>Reservado por {reservas.users}</p>
          <p>
            Empieza: {new Date(reservas.dateStart).getHours().toString()}
          </p>

          <button
            className={styles.cancelButton}
            onClick={() => handlerDeleted(reservas.id)}
          >
            Cancelar reserva
          </button>
        </div>
      ))
    )}
  </div>
  )
}

export default ReservaField