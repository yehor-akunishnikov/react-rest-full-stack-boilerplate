import { configureStore } from "@reduxjs/toolkit";

import { projectApi } from "../rest/projects/api";
import { userApi } from "../rest/users/api";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
