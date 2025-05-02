import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface APIResponse<T> {
  code: string;
  message: string;
  transaction: string;
  data: T;
}
