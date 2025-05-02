import { useNavigate } from "react-router";
import { useFormik } from "formik";

import pakge from "../../../package.json";
import logo from "../../assets/logo.png";

import classes from "./Login.module.scss";
import { useAppDispatch, useAppSelector } from "../../features";
import { userSlice } from "../../features/user/slice";
import { useEffect } from "react";

export const LoginIndex = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/reports");
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(
        userSlice.actions.requestLogin({
          username: values.username,
          password: values.password,
        })
      );

      navigate("/reports");
    },
  });

  return (
    <div className={classes.container}>
      <header>
        <img src={logo} alt="logo" />
      </header>

      <form onSubmit={formik.handleSubmit}>
        <section>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder="Digite seu usuário"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
            autoComplete="username"
          />
        </section>

        <section>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
            autoComplete="current-password"
          />
        </section>

        <button type="submit">Entrar</button>
      </form>

      <span>versão {pakge.version}</span>
    </div>
  );
};
