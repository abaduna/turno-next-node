"use client";
import { useEffect, useState } from "react";
import { paramsProps, type field } from "@/interface/inteface";
import { useFetch } from "@/hoocks/useFetch";
import FieldComponet from "@/componets/FieldComponet";
import styles from "./pageHome.module.css";
import { revalidatePath } from "next/cache";
import actionPath from "@/action/action";
import { useRouter } from "next/navigation";
function Page({ params }: paramsProps) {
  const [field, setField] = useState<field[]>();
  const [endpoint, setEndpoint] = useState<string>("");
  const [dataState, setDateState] = useState<string>("");
  const [mesaggeSusefull,setMesaggeSusefull] =useState<boolean>(false)
  const { getData } = useFetch();
  const router = useRouter();
  useEffect(() => {
    const getFields = async () => {
      try {
        setEndpoint(`api/field/${params.idcliente}`);

        const fieldResponse = await getData(endpoint);

        if (typeof fieldResponse !== "undefined") {
          setField([]);
          setField(fieldResponse.data);
         
        } else {
          console.log(`undefind`);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFields();
    actionPath();
  }, [endpoint, dataState]);
  useEffect(()=>{
    const toekn = localStorage.getItem('token') 
    if (!toekn) {
      router.push("/login");  
    }
  },[])
  return (
    <div>
      <h4 className={styles.title}>Eleji tu cancha</h4>
      <label className={styles.label}>Que dia queres jugar?</label>

      <input
        className={styles.date}
        type="date"
        id="start"
        name="trip-start"
        min="2024-01-01"
        max="2024-1-30"
        onChange={(e) => setDateState(e.target.value)}
      />
      <p>reservar el dia {dataState}</p>
      {mesaggeSusefull && <span className={styles.suffesul}>Has reservado con exito</span>}
      
      {field &&
        field?.length > 0 &&
        field?.map((fiel, idex) => (
          <FieldComponet key={idex} {...fiel} setMesaggeSusefull={setMesaggeSusefull} dataState={dataState} />
        ))}
    </div>
  );
}

export default Page;
