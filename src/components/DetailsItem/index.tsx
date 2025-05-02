import dayjs from "dayjs";

import classes from "./DetailsItem.module.scss";
import { Badge } from "../Badge";
import { formatPrice } from "../../utils/formatPrice";
import { TransactionsByMonthResponse } from "../../features/reports/types";

interface DetailsItemProps {
  item: TransactionsByMonthResponse;
}

export const DetailsItem = ({ item }: DetailsItemProps) => {
  return (
    <div className={classes.container}>
      <header>
        <Badge type={item.type as "out" | "in"} />
        <p>{dayjs(item.when).format("DD/MM HH:mm")}</p>
      </header>

      <p>{formatPrice(item.value)}</p>
      <p>{item.description}</p>
      <p>{item.client}</p>
    </div>
  );
};
