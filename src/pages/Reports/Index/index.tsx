import { useNavigate } from "react-router";

// redux
import { useAppSelector } from "../../../features";
// styles
import classes from "./Reports.module.scss";
import addIcon from "../../../assets/icons/add.svg";
// components
import { Bars } from "../../../components/Bars";
import { TransactionItem } from "../../../components/TransactionItem";

export const ReportsIndex = () => {
  const navigate = useNavigate();

  const transactions = useAppSelector((state) => state.reports.transactions);
  const graphData = useAppSelector((state) => state.reports.graph);

  return (
    <div className={classes.container}>
      <header>
        <h2>Despesas x Receitas</h2>
        <button onClick={() => navigate("/reports/form")}>
          <img src={addIcon} alt="Adicionar" />
        </button>
      </header>

      <section className={classes.graph}>
        <Bars data={graphData} />
      </section>

      <section className={classes.reports}>
        {transactions.map((item) => (
          <TransactionItem key={item.id} item={{ ...item }} />
        ))}
      </section>
    </div>
  );
};
