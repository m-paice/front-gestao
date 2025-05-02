import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

// slice
import { userSlice } from "./slice";
// services
import { api, APIResponse } from "../../services/api";
// types
import { LoginRequest, LoginResponse } from "./types";

function* login(action: PayloadAction<LoginRequest>) {
  try {
    const user: APIResponse<AxiosResponse<LoginResponse>> = yield call(
      api.post,
      "/auth",
      action.payload
    );

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.data.data.token}`;

    yield put(userSlice.actions.setIsAuthenticated(true));

    yield put(
      userSlice.actions.setUser({
        token: user.data.data.token,
        name: user.data.data.user.name,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put({ type: "USER_FETCH_FAILED", message: error.message });
    }
    if (error instanceof AxiosError) {
      yield put({ type: "USER_FETCH_FAILED", message: error.message });
    }
  }
}

function* reLogin() {
  const token: string = yield select((state) => state.user.auth.token);

  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function* userSaga() {
  yield all([
    takeLatest(userSlice.actions.requestLogin.type, login),
    takeLatest("persist/REHYDRATE", reLogin),
  ]);
}
