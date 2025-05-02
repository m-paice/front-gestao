import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LasTransactionsResponse,
  RequestCreateTransaction,
  RequestTransactionsToYear,
  TransactionsToYearResponse,
} from "./types";

const initialState = {
  graph: [
    {
      name: "JAN",
      in: 1000,
      out: 300,
    },
    {
      name: "FEV",
      in: 2000,
      out: 500,
    },
    {
      name: "MAR",
      in: 1500,
      out: 400,
    },
    {
      name: "ABR",
      in: 2500,
      out: 700,
    },
    {
      name: "MAI",
      in: 3000,
      out: 800,
    },
    {
      name: "JUN",
      in: 3500,
      out: 900,
    },
  ],
  transactions: [
    {
      id: "JAN-2025",
      in: 1000,
      out: 300,
    },
    {
      id: "FEV-2025",
      in: 2000,
      out: 500,
    },
    {
      id: "MAR-2025",
      in: 1500,
      out: 400,
    },
    {
      id: "ABR-2025",
      in: 2500,
      out: 700,
    },
    {
      id: "MAI-2025",
      in: 3000,
      out: 800,
    },
    {
      id: "JUN-2025",
      in: 3500,
      out: 900,
    },
  ],
  created: false,
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    requestTransactionsToYear: (
      _state,
      _action: PayloadAction<RequestTransactionsToYear>
    ) => {},
    setTransactionsToYear: (
      state,
      action: PayloadAction<LasTransactionsResponse[]>
    ) => {
      state.transactions = action.payload.map((item) => ({
        id: item._id,
        in: item.in,
        out: item.out,
      }));
    },

    requestLastTransactions: () => {},
    setLastTransactions: (
      state,
      action: PayloadAction<TransactionsToYearResponse[]>
    ) => {
      state.graph = action.payload.map((item) => ({
        name: item._id,
        in: item.in,
        out: item.out,
      }));
    },

    requestCreateTransaction: (
      _state,
      _action: PayloadAction<RequestCreateTransaction>
    ) => {},
    successCreateTransaction: (state) => {
      state.created = true;
    },
    resetCreateTransaction: (state) => {
      state.created = false;
    },
  },
});
