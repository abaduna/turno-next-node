"use client";
import { useFetch } from "@/hoocks/useFetch";
import { field } from "@/interface/inteface";
import React, { useEffect, useState } from "react";
import { type time } from "../interface/inteface";
import styles from "./Field.module.css";
import actionPath from "@/action/action";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import jwt  from 'jsonwebtoken'
function FieldComponet({
  dataState,
  id,
  idfield,
  idusuario,
  name,
  ubicacion,
  setMesaggeSusefull,
}: field) {
  const [endpoint, setEndpoint] = useState<string>("");
  const [time, setTime] = useState<time[]>([]);
  const [appointmentEndpoint, setAppointmentEndpoint] = useState<string>("");
  const [idstate, setIdState] = useState<string>("");
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-5f4dbad7-ce3c-43c6-98c3-86fb2fb5deae", {
    locale: "es-AR",
  });
  const { getData } = useFetch();
  const getDataTime = async () => {
    const data = await getData(endpoint);
    if (typeof data !== "undefined") {
      setTime([]);
      setTime(data.data);
    } else {
      console.log(`undefind`);
    }
  };
  useEffect(() => {
    //dia/campo/usarui
    ///http://localhost:3001/api/time/2024-04-11/1234/1234
    ///api/time/2024-04-11/1234
    setEndpoint(`/api/time/${dataState}/${idfield}/${idusuario}`);
    

    actionPath();
    getDataTime();
  }, [dataState]);

 
  const handleClick =async (id:number) => {
    console.log("click");
    let user = ""
    let token:string = localStorage.getItem('token') ?? ""
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken) {
      // Mostrar la carga útil decodificada
      console.log('Carga útil decodificada:', decodedToken.payload);
  
      // Verificar si la carga útil contiene información sobre el usuario
      if (decodedToken.payload && decodedToken.payload.user) {
          user = decodedToken.payload.user
      } else {
          console.log('No se encontró información sobre el usuario en el token.');
      }
  } else {
      console.log('No se pudo decodificar el token.');
  }
  const datamepa = {
    user,
    id
  }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/mepa/create-order",
        datamepa,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); 

      window.location.href = response.data;
      actionPath();
      getDataTime();
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };
  return (
    <div className={styles.container}>
      <p>lugares para reservar {name}</p>

      {/* que solo me muestra los no reservados */}
      {time &&
        time.length > 0 &&
        time.map((lugare, index) => (
          <div key={lugare.id}>
            <div className={styles.reservediv}>
              <p className={styles.hours}>
                {new Date(lugare.dateStart).getHours().toLocaleString()}
              </p>

              <button onClick={() => handleClick(lugare.id)}>
                reservar
              </button>
              {idstate && (
                <Wallet
                  initialization={{ preferenceId: idstate }}
                  customization={{ texts: { valueProp: "smart_option" } }}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default FieldComponet;
