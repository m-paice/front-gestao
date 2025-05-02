import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import classes from "./Details.module.scss";
import { DetailsItem } from "../../../components/DetailsItem";

import { TransactionsByMonthResponse } from "../../../features/reports/types";
import { api, APIResponse } from "../../../services/api";
import { monthNumbers } from "../../../utils/monthNames";
import { useAppDispatch, useAppSelector } from "../../../features";
import { reportsSlice } from "../../../features/reports/slice";

const fetchData = async (monthName: string) => {
  const response = await api.get<APIResponse<TransactionsByMonthResponse[]>>(
    `/reports/transactions/${
      monthNumbers[monthName as keyof typeof monthNumbers]
    }`
  );
  return response.data.data;
};

export const ReportsDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleted = useAppSelector((state) => state.reports.deleted);
  const { month } = useParams() as { month: string };

  useEffect(() => {
    if (deleted) {
      dispatch(reportsSlice.actions.resetDeleteTransaction());
      navigate("/reports");
    }
  }, [deleted]);

  const { data, isLoading } = useQuery({
    queryKey: [`transactions/${month}`],
    queryFn: () => fetchData(month),
  });

  return (
    <div className={classes.container}>
      <header>
        <h2>{month}</h2>
      </header>

      {isLoading && <div>Carregando...</div>}

      <section>
        {data
          ?.sort((a, b) => dayjs(b.when).diff(a.when))
          .map((item) => (
            <DetailsItem key={item._id} item={{ ...item }} />
          ))}
      </section>
    </div>
  );
};
