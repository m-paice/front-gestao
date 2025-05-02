import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

// slice
import { reportsSlice } from "./slice";
// services
import { api, APIResponse } from "../../services/api";
// types
import {
  LasTransactionsResponse,
  RequestCreateTransaction,
  RequestTransactionsToYear,
  TransactionsToYearResponse,
} from "./types";
import { monthNames } from "../../utils/monthNames";
import { userSlice } from "../user/slice";
import { RootState } from "..";

function* lastTransactions() {
  try {
    const isAuthenticated: boolean = yield select(
      (state: RootState) => state.user.isAuthenticated
    );

    if (!isAuthenticated) return;

    const lastTransactions: AxiosResponse<
      APIResponse<LasTransactionsResponse[]>
    > = yield call(api.get, "/reports/lastTransactions");

    yield put(
      reportsSlice.actions.setLastTransactions(
        lastTransactions.data.data
          .sort((a, b) => (parseInt(a._id) < parseInt(b._id) ? -1 : 1))
          .map((item) => ({
            ...item,
            _id: monthNames[parseInt(item._id) - 1],
          }))
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: "REPORT_FETCH_FAILED", message: error.message });
    }
    if (error instanceof AxiosError) {
      yield put({ type: "REPORT_FETCH_FAILED", message: error.message });
    }
  }
}

function* transactionsToYear(action: PayloadAction<RequestTransactionsToYear>) {
  const isAuthenticated: boolean = yield select(
    (state: RootState) => state.user.isAuthenticated
  );

  if (!isAuthenticated) return;

  try {
    const transactions: APIResponse<
      AxiosResponse<TransactionsToYearResponse[]>
    > = yield call(api.get, "/reports/transactions", {
      params: {
        year: action.payload.year || new Date().getFullYear(),
      },
    });
    yield put(
      reportsSlice.actions.setTransactionsToYear(
        transactions.data.data
          .sort((a, b) => (parseInt(a._id) > parseInt(b._id) ? -1 : 1))
          .map((item) => ({
            ...item,
            _id: monthNames[parseInt(item._id) - 1],
          }))
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: "REPORT_FETCH_FAILED", message: error.message });
    }
    if (error instanceof AxiosError) {
      yield put({ type: "REPORT_FETCH_FAILED", message: error.message });
    }
  }
}

function* createTransaction(action: PayloadAction<RequestCreateTransaction>) {
  try {
    yield call(api.post, "/reports", {
      ...action.payload,
    });

    yield put(reportsSlice.actions.successCreateTransaction());
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: "REPORT_CREATE_FAILED", message: error.message });
    }
    if (error instanceof AxiosError) {
      yield put({ type: "REPORT_CREATE_FAILED", message: error.message });
    }
  }
}

export function* reportSaga() {
  yield all([
    takeEvery("persist/REHYDRATE", lastTransactions),
    takeEvery("persist/REHYDRATE", transactionsToYear),

    takeEvery(
      reportsSlice.actions.successCreateTransaction.type,
      lastTransactions
    ),
    takeEvery(
      reportsSlice.actions.successCreateTransaction.type,
      transactionsToYear
    ),

    takeEvery(userSlice.actions.setUser.type, lastTransactions),
    takeEvery(userSlice.actions.setUser.type, transactionsToYear),

    takeEvery(
      reportsSlice.actions.requestCreateTransaction.type,
      createTransaction
    ),
  ]);
}
