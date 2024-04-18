"use client"
import styles from "./register.module.css";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";


function Page({}) {
  const handlerLogin = (values: {
    name: string;
    password: string;
    repPassword: string;
  }) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
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
