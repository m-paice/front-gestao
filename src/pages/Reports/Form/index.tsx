import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

// components
import { Badge } from "../../../components/Badge";
import { Switch } from "../../../components/Switch";

// styles
import classes from "./Form.module.scss";
// features
import { useAppDispatch, useAppSelector } from "../../../features";
import { reportsSlice } from "../../../features/reports/slice";

const formSchema = z.object({
  type: z.enum(["in", "out"]),
  month: z.string(),
  value: z.number(),
  description: z.string().min(1),
  client: z.string().optional(),
});

const formKeys = {
  value: "Valor",
  description: "Descrição",
  client: "Cliente",
  type: "Tipo",
  month: "Mês",
};

export const ReportsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isCreated = useAppSelector((state) => state.reports.created);

  useEffect(() => {
    if (isCreated) {
      dispatch(reportsSlice.actions.resetCreateTransaction());
      navigate("/reports");
    }
  }, [isCreated]);

  const formik = useFormik({
    initialValues: {
      type: "in",
      month: new Date().getMonth().toString(),
      value: 0,
      description: "",
      client: "",
    },
    validationSchema: toFormikValidationSchema(formSchema),
    onSubmit: (values) => {
      dispatch(
        reportsSlice.actions.requestCreateTransaction({
          type: values.type,
          month: parseInt(values.month),
          value: Number(values.value),
          description: values.description,
          client: values.client,
        })
      );
    },
  });

  return (
    <div className={classes.container}>
      <header>
        <h2>Novo regristro</h2>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <section className={classes.type}>
          <Badge type="in" />
          <Switch
            activeColor="#e6b8b7"
            inactiveColor="#b5eed6"
            onChange={(isChecked) => {
              formik.setFieldValue("type", isChecked ? "out" : "in");
            }}
          />
          <Badge type="out" />
        </section>

        <section>
          <label htmlFor="month">Mês</label>
          <select
            name="month"
            id="month"
            onChange={formik.handleChange}
            value={formik.values.month}
          >
            <option value="0">Janeiro</option>
            <option value="1">Fevereiro</option>
            <option value="2">Março</option>
            <option value="3">Abril</option>
            <option value="4">Maio</option>
            <option value="5">Junho</option>
            <option value="6">Julho</option>
            <option value="7">Agosto</option>
            <option value="8">Setembro</option>
            <option value="9">Outubro</option>
            <option value="10">Novembro</option>
            <option value="11">Dezembro</option>
          </select>
        </section>

        <section>
          <label htmlFor="value">Valor</label>
          <input
            type="number"
            id="value"
            name="value"
            autoComplete="off"
            inputMode="numeric"
            placeholder="R$ 200,00"
            value={formik.values.value}
            onChange={formik.handleChange}
          />
        </section>

        <section>
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            placeholder="Limpeza de pele"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </section>

        {formik.values.type === "in" && (
          <section>
            <label htmlFor="client">Cliente</label>
            <input
              type="text"
              id="client"
              placeholder="Maria da Silva"
              name="client"
              value={formik.values.client}
              onChange={formik.handleChange}
            />
          </section>
        )}

        <button type="submit" disabled={formik.isSubmitting}>
          Cadastrar
        </button>

        {formik.isSubmitting && (
          <p className={classes.loading}>carregando...</p>
        )}

        {Object.keys(formik.errors).length > 0 && (
          <p className={classes.error}>
            {Object.entries(formik.errors).map(([key, error]) => (
              <span key={key}>
                {formKeys[key as keyof typeof formKeys]}:{error}
              </span>
            ))}
          </p>
        )}
      </form>
    </div>
  );
};
