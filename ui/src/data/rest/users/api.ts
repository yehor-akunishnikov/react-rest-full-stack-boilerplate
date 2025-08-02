import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../../libs/httpClient";
import type { CurrentUser } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getCurrentUser: build.query<CurrentUser, void>({
      query: () => ({ url: "users/me", method: "get" }),
    }),
  }),
});

export const { useGetCurrentUserQuery } = userApi;
