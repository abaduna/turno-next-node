export interface field {
  id: number;
  idusuario: number;
  name: string;
  idfield: number;
  ubicacion: string;
  dataState: string;
  idcliente?:string
  setMesaggeSusefull?:(parm:boolean) =>void
  setMessage?:(parm:boolean) =>void
}

export interface time {
  dataDia: string;
  dateEnd: Date;
  dateStart: Date;
  id: number;
  idUsuario: number;
  idfield: number;
  reservado: number;
  users?:string
}
export interface paramsProps {
  params: {
    idcliente: string;
  };
}
export interface tokenProps {
  token:string
}
export interface tokenProps {
  data:dataToken
  response:responseProps
}
interface dataToken {
  token:string
}
interface responseProps {
  data:dataprops
}
interface dataprops {
  message:string
}