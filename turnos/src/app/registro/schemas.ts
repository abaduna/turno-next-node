import * as Yup from "yup";

export const loginSchema = Yup.object({
  name: Yup.string().required("Campo requerido"),
  password: Yup.string()
    .min(2, "El campo password debe tener al menos 3 caracteres")
    .required("El campo password es obligatorio"),
  repPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Es necesario confirmar la contraseña"),
  email:Yup.string().required("campo requerido")
});
