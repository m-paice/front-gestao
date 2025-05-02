import { useNavigate } from "react-router";

import { formatPrice } from "../../utils/formatPrice";
import { Badge } from "../Badge";

import classes from "./TransactionItem.module.scss";

interface TransactionItemProps {
  item: {
    id: string;
    in: number;
    out: number;
  };
}

export const TransactionItem = ({ item }: TransactionItemProps) => {
  const navigate = useNavigate();

  const total = item.in + item.out;
  const percentageIn = (item.in / total) * 100;
  const percentageOut = (item.out / total) * 100;

  const monthValue = item.in - item.out;

  return (
    <div
      className={classes.container}
      onClick={() => navigate(`/reports/${item.id}`)}
    >
      <header>
        <Badge title={item.id} />
        <h2 className={monthValue > 0 ? classes.inText : classes.outText}>
          {formatPrice(monthValue)}
        </h2>
      </header>
      <div className={classes.wrapper}>
        <div
          className={[classes.in, classes.bar].join(" ")}
          style={{
            width: `${percentageIn}%`,
          }}
        />

        <p className={classes.value}>{formatPrice(item.in)}</p>
      </div>

      <div className={classes.wrapper}>
        <div
          className={[classes.out, classes.bar].join(" ")}
          style={{
            width: `${percentageOut}%`,
          }}
        />

        <p className={classes.value}>{formatPrice(item.out)}</p>
      </div>
    </div>
  );
};
