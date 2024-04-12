export interface field {
  id: number;
  idusuario: number;
  name: string;
  idfield: number;
  ubicacion: string;
  dataState: string;
  idcliente?:string
}

export interface time {
  dataDia: string;
  dateEnd: Date;
  dateStart: Date;
  id: number;
  idUsuario: number;
  idfield: number;
  reservado: number;
}
export interface paramsProps {
  params: {
    idcliente: string;
  };
}