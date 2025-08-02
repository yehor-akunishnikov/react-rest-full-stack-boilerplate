import type { AxiosError } from "axios";

import type {
  LoginPayload,
  LoginSuccessResponse,
  RegisterPayload,
  RegisterSuccessResponse,
} from "./types";
import type { HttpResponse } from "../../../common/types/http";
import httpClient from "../../../libs/httpClient";

export async function login(payload: LoginPayload): Promise<HttpResponse<LoginSuccessResponse>> {
  try {
    const { data, status } = await httpClient.post<LoginSuccessResponse>("/auth/login", payload);

    return {
      status,
      data: data,
      isFailed: false,
    };
  } catch (e) {
    return {
      error: e as AxiosError,
      isFailed: true,
    };
  }
}

export async function register(
  payload: RegisterPayload,
): Promise<HttpResponse<RegisterSuccessResponse>> {
  try {
    const { data, status } = await httpClient.post<RegisterSuccessResponse>(
      "/auth/register",
      payload,
    );

    return {
      status,
      data: data,
      isFailed: false,
    };
  } catch (e) {
    return {
      error: e as AxiosError,
      isFailed: true,
    };
  }
}
