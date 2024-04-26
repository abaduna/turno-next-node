"use client";
import styles from "./ReservaAdmin.module.css"
import { useFetch } from "@/hoocks/useFetch";
import { field } from "@/interface/inteface";
import { FormEvent, useEffect, useState } from "react";
import { type time } from "@/interface/inteface";
type Props = {};

const ReservaAdmin = ({
  dataState,
  id,
  idfield,
  idusuario,
  name,
  ubicacion,
}: field) => {
  const { getData, postData } = useFetch();
  const [time, setTime] = useState<time[]>([]);
  const [reserva, setReserva] = useState<string>("");
  useEffect(() => {
    const getDataTime = async () => {
      const result = await getData(
        `/api/reserve/admin/${idusuario}/${dataState}/${idfield}`
      );
      console.log(result);
      console.log(`idusuario ${idusuario}`);
      console.log(`dataState ${dataState}`);
      console.log(`idfield ${idfield}`);

      ///api/reserve/admin/1234/2024-04-25/1234
      setTime(result.data);
    };
    getDataTime();
  }, [dataState, reserva]);
  const handlerReservaAdmin = async (
    e: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    console.log(id);

    await postData(`/api/reserve/adminreserva/${id}`, {});
    setReserva("");
  };
  return (
    <div className={styles.formContainer}>
    <form onSubmit={(e) => handlerReservaAdmin(e, reserva)}>
      <label className={styles.label}>{name}</label>
      <select
        className={styles.select}
        onChange={(e) => setReserva(e.target.value)}
      >
        {time?.length > 0 ? (
          time.map((reservar) => (
            <option key={reservar.id} value={reservar.id}>
              {new Date(reservar.dateStart).getHours().toString()}
            </option>
          ))
        ) : (
          <option>No hay reserva</option>
        )}
      </select>
      <button className={styles.button} type="submit">
        Seleccionar
      </button>
    </form>
  </div>
  );
};

export default ReservaAdmin;
