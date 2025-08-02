import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../../libs/httpClient";
import type { Project } from "./types";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => ({ url: "projects", method: "get" }),
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;
