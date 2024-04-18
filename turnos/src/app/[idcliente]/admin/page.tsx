"use client";
import FieldAdminComponet from "@/componets/FieldAdminComponet";
import { useFetch } from "@/hoocks/useFetch";
import { field, paramsProps } from "@/interface/inteface";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import styles from "./admin.module.css";
/* 
agregar mas canchas check
agregar horas a a la cancha check
btn para ver los reservados por cancha
en otra pagina con el parametro idfields
ver las canchas reservadas y el id con el id buscar quien es
*/

function Page({ params }: paramsProps) {
  const { postData, getData } = useFetch();
  const [ubicacion, setUbicacion] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [field, setField] = useState<field[]>([]);
  const [message, setMessage] = useState<boolean>(false);
  const idcliente = params.idcliente;
  let today = new Date();
  let fecha_actual =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  const postFields = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      idusuario: params.idcliente,
      name,
      ubicacion,
    };
    postData("api/field", data);
  };
  const postTimeFields = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  useEffect(() => {
    const getFileds = async () => {
      const fieldResponse = await getData(`api/field/${params.idcliente}`);

      if (typeof fieldResponse !== "undefined") {
        setField(fieldResponse.data);
        console.error(fieldResponse.data);
      } else {
        console.log(`undefind`);
      }
    };
    getFileds();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <p>Agregar una cancha</p>
        <form onSubmit={postFields}>
          <input
            placeholder="ubicacion"
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <input
            placeholder="nombre"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Agregar cancha</button>
        </form>
      </div>
      {message && <span className={styles.message}>Agregado con exito</span>}
      <div className={styles.fieldsContainer}>
        {field &&
          field.length > 0 &&
          field.map((fiel) => (
            <FieldAdminComponet
              idcliente={idcliente}
              setMessage={setMessage}
              key={fiel.id}
              {...fiel}
            />
          ))}
      </div>
      <div className={styles.linkContainer}>
        <Link href={`/${params.idcliente}`}>Reservar</Link>
      </div>
    </div>
  );
}

export default Page;
