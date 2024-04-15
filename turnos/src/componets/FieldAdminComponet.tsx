import { useFetch } from "@/hoocks/useFetch";
import { field } from "@/interface/inteface";
import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./FieldAdmin.module.css";
type Props = {};

function FieldAdminComponet({
  id,
  idfield,
  idusuario,
  name,
  ubicacion,
  idcliente,
  setMessage,
}: field) {
  const [timeEnd, setTimeEnd] = useState<string>("");
  const [timeStart, setTimeStart] = useState<string>("");
  const [dataState, setDateState] = useState<string>("");
  const { postData } = useFetch();
  const timeDateStart = dataState + " " + timeStart;
  const timeDateEnd = dataState + " " + timeEnd;
  const postTineField = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      dateStart: timeDateStart,
      dateEnd: timeDateEnd,
      idfield,
      reservado: false,
      dataDia: dataState,
      idUsuario: idcliente,
    };
    try {
      postData("api/time", data);
      setMessage && setMessage(true);
      setTimeout(() => {
        setMessage && setMessage(false);
      }, 900);
    } catch (error) {}
  };
  return (
    <div className={styles.container}>
      <p>Cancha {name}</p>
      <div className={styles.formContainer}>
        <form onSubmit={postTineField}>
          <label htmlFor="start">Día</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            min="2024-01-01"
            max="2025-01-01"
            onChange={(e) => setDateState(e.target.value)}
          />
          <label htmlFor="timeStart">Inicio</label>
          <input
            type="time"
            id="timeStart"
            onChange={(e) => setTimeStart(e.target.value)}
          />
          <label htmlFor="timeEnd">Fin</label>
          <input
            type="time"
            id="timeEnd"
            onChange={(e) => setTimeEnd(e.target.value)}
          />
          <button type="submit">Agregar hora</button>
        </form>
      </div>
    </div>
  );
}

export default FieldAdminComponet;
