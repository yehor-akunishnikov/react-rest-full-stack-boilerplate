import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import { AUTH_TOKEN_KEY } from "../common/constants/http";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY) ?? ""}`;

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (e: AxiosError) => {
    if (e.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.location.href = "/auth";
    }

    return Promise.reject(e);
  },
);

export default httpClient;

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await httpClient.request({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
