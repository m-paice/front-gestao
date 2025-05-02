import dayjs from "dayjs";

import trashIcon from "../../assets/icons/trash.svg";

import classes from "./DetailsItem.module.scss";
import { Badge } from "../Badge";
import { formatPrice } from "../../utils/formatPrice";
import { TransactionsByMonthResponse } from "../../features/reports/types";
import { useAppDispatch } from "../../features";
import { reportsSlice } from "../../features/reports/slice";

interface DetailsItemProps {
  item: TransactionsByMonthResponse;
}

export const DetailsItem = ({ item }: DetailsItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={classes.container}>
      <header>
        <Badge type={item.type as "out" | "in"} />
        <p>{dayjs(item.when).format("DD/MM HH:mm")}</p>
      </header>

      <p>{formatPrice(item.value)}</p>
      <p>{item.description}</p>
      <p>{item.client}</p>

      <button
        onClick={() =>
          dispatch(
            reportsSlice.actions.requestDeleteTransaction({
              id: item._id,
            })
          )
        }
      >
        <img src={trashIcon} alt="trash" />
      </button>
    </div>
  );
};
