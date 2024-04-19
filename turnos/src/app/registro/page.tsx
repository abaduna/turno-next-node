"use client";
import styles from "./register.module.css";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import { useFetch } from "@/hoocks/useFetch";
import { useState } from "react";

function Page({}) {
  const [succes, setSucces] = useState<boolean>(false);
  const { postData } = useFetch();
  const handlerLogin = async (values: {
    name: string;
    password: string;
    repPassword: string;
    email: string;
  }) => {
    const data = {
      password: values.password,
      name: values.name,
      email: values.email,
    };
    const response = await postData("api/login/register", data);
    console.log(response);
    if (response.data.message === "agregado con exito") {
      console.log(`èxitoso`);
      setSucces(true);
      setTimeout(() => {
        setSucces(false);
      }, 1000);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      repPassword: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(`onSubmit`);

      handlerLogin(values);
    },
  });
  return (
    <div className={styles.container}>
      {succes &&<span>Agregado con exito</span>}
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          className={styles.frominput}
          placeholder="usuario"
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <br />
        {formik.touched.name && formik.errors.name && (
          <span className={styles.spanFrom}>{formik.errors.name}</span>
        )}
        <br />
        <input
          className={styles.frominput}
          placeholder="email"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <br />
        {formik.touched.email && formik.errors.email && (
          <span className={styles.spanFrom}>{formik.errors.email}</span>
        )}
        <br />
        <input
          className={styles.frominput}
          placeholder="contraseña"
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <br />
        {formik.touched.password && formik.errors.password && (
          <span className={styles.spanFrom}>{formik.errors.password}</span>
        )}
        <br />
        <input
          className={styles.frominput}
          placeholder="repeti la contraseña"
          type="password"
          id="repPassword"
          name="repPassword"
          onChange={formik.handleChange}
          value={formik.values.repPassword}
        />
        <br />
        {formik.touched.repPassword && formik.errors.repPassword && (
          <span className={styles.spanFrom}>{formik.errors.repPassword}</span>
        )}
        <br />
        <div>
          <button className={styles.formbutton} type="submit">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
