"use client";
import { useEffect, useState } from "react";
import { paramsProps, type field } from "@/interface/inteface";
import { useFetch } from "@/hoocks/useFetch";
import FieldComponet from "@/componets/FieldComponet";
import styles from "./pageHome.module.css"
import { revalidatePath } from "next/cache";
import actionPath from "@/action/action";


function Page({ params }: paramsProps) {
  const [field, setField] = useState<field[]>();
  const [endpoint, setEndpoint] = useState<string>("");
  const [dataState, setDateState] = useState<string>("");
  const { getData } = useFetch();
  useEffect(() => {
    const getFields = async () => {
      try {
        setEndpoint(`api/field/${params.idcliente}`);

      const fieldResponse = await getData(endpoint);

        if (typeof fieldResponse !== "undefined") {
          fieldResponse?  setField(fieldResponse.data): ""
          console.error(fieldResponse.data);
          
        } else {
          console.log(`undefind`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFields();
    actionPath()
  }, [endpoint,dataState]);
  return (
    <div>
      <h4 className={styles.title}>Eleji tu cancha</h4>
      <label className={styles.label} >Que dia queres jugar?</label>

      <input
       className={styles.date}
        type="date"
        id="start"
        name="trip-start"
        min="2024-01-01"
        max="2025-1-1"
        onChange={(e) => setDateState(e.target.value)}
      />
      <p>reservar el dia {dataState}</p>
      {field &&
        field?.length > 0 &&
        field?.map((fiel, idex) => (
          <FieldComponet key={idex} {...fiel} dataState={dataState} />
        ))}
    </div>
  );
}

export default Page;
