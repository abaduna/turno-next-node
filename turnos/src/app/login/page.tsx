"use client";
import { useFetch } from "@/hoocks/useFetch";
import { tokenProps } from "@/interface/inteface";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "./schema";
import styles from "./login.module.css";
import Link from "next/link";
function Page({}) {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [messageNotUser, setMessageNotUser] = useState<boolean>(false);
  const [messageNotPassword, setMessageNotPassword] = useState<boolean>(false);
  const { postData } = useFetch();
  const router = useRouter();
  const handlerLogin = async (values: { name: string; password: string }) => {
    console.log(`handlerLogin`);

    let dataLogin = {
      name: values.name,
      password: values.password,
    };
    console.log(`data `, dataLogin);
    try {
      const token:tokenProps = await postData("api/login", dataLogin);
      if (token.data) {
        console.log(token.data.token);

        localStorage.setItem("token", token.data.token);
        router.push("/");
      } else {
        console.log(`El token es ${token} indefinido. `);
      }
      if (
        token.response &&
        token.response.data.message === "Usuario no encontrado"
      ) {
        setMessageNotUser(true);
        setTimeout(() => {
          setMessageNotUser(false);
        }, 900);
        return;
      }

      if (
        token.response &&
        token.response.data.message === "Contraseña incorrecta"
      ) {
        setMessageNotPassword(true);
        setTimeout(() => {
          setMessageNotPassword(false);
        }, 900);
        return;
      }

      // localStorage.setItem("token",token)
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: name,
      password: password,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(`onSubmit`);

      handlerLogin(values);
    },
  });

  return (
    <div className={styles.container}>
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
        {messageNotUser && (
          <span className={styles.spanFrom}>Usuario no encontrado</span>
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
        {messageNotPassword && (
          <span className={styles.spanFrom}>Contraseña incorrecta</span>
        )}
        <br />
        <div>
            <button className={styles.formbutton} type="submit">Ingresar</button>
            <Link href={`/registro`}>Registrarme</Link>
        </div>
      
      </form>
      
    </div>
  );
}

export default Page;
