"use client";
import ReservaAdmin from "@/componets/reserva/ReservaAdmin";
import ReservaField from "@/componets/reserva/ReservaField";
import { useFetch } from "@/hoocks/useFetch";
import { paramsProps } from "@/interface/inteface";
import { type field } from "@/interface/inteface";
import { useScrollTrigger } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {};

const Page = ({ params }: paramsProps) => {
  const [field, setField] = useState<field[]>([]);
  const [dataState, setDateState] = useState<string>("");
  const [dataUpdate, setUpdate] = useState<string>("");
  const { getData } = useFetch();
  let today = new Date();
  let fecha_actual =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  let dataStateUpdate = dataState.split("-");
  let day = parseInt(dataStateUpdate[2]);
  dataStateUpdate[2] = day.toString();
  let newDate = dataStateUpdate.join("-");
  useEffect(()=>{
    setUpdate(newDate)
  },[dataState])
  useEffect(() => {
    const getFields = async () => {
      const result = await getData(`api/field/${params.idcliente}`);
      setField(result?.data);
    };
    getFields();
  }, []);
  return (
    <div>
      <input
        type="date"
        id="start"
        name="trip-start"
        min="2024-1-30"
        max="2025-1-30"
        onChange={(e) => setDateState(e.target.value)}
      />
       <div>
        <h2>reservar</h2>
        {field?.length > 0 &&
          field.map((fie) => <ReservaAdmin key={fie.id} {...fie} dataState={dataUpdate} />)}
      </div>
      <h2>cancelar</h2>
      
      <div>
        {field?.length > 0 &&
          field.map((fie) => <ReservaField key={fie.id} {...fie} dataState={dataUpdate} />)}
      </div>
     
    </div>
  );
};

export default Page;
