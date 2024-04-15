"use client";
import { useFetch } from "@/hoocks/useFetch";
import { field } from "@/interface/inteface";
import React, { useEffect, useState } from "react";
import { type time } from "../interface/inteface";
import styles from "./Field.module.css";
import actionPath from "@/action/action";
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

  const { getData, putData } = useFetch();
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
    console.error(endpoint);

    actionPath();
    getDataTime();
  }, [dataState]);
  const handerAppointment = (id: number) => {
    try {
      setAppointmentEndpoint(`/api/time/reserver/${id}`);
      getDataTime();
      setMesaggeSusefull(true);
      setTimeout(() => {
        setMesaggeSusefull(false);
      }, 900);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const appointment = () => {
      putData(appointmentEndpoint);
    };
    appointment();
  }, [appointmentEndpoint]);
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

              <button onClick={() => handerAppointment(lugare.id)}>
                reservar
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FieldComponet;
