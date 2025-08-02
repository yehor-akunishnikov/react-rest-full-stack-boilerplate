import { useCallback, useState } from "react";
import type { AxiosError } from "axios";

export type AsyncApiCallback<D> = (...args: unknown[]) => Promise<D>;

export type UseHttpCallOutput<D> = {
  isLoading: boolean;
  error: AxiosError | null;
  data: D | null;
  callApi: (cb: AsyncApiCallback<D>) => Promise<void>;
};

type AsyncCallState<D> = {
  isLoading: boolean;
  error: AxiosError | null;
  data: D | null;
};

export function useAsyncCall<D>(): UseHttpCallOutput<D> {
  const [state, setState] = useState<AsyncCallState<D>>({
    isLoading: false,
    error: null,
    data: null,
  });

  const callApi = useCallback(async (cb: AsyncApiCallback<D>): Promise<void> => {
    try {
      setState((state) => ({ ...state, isLoading: true }));

      const response = await cb();

      setState((state) => ({
        ...state,
        data: response,
        isLoading: false,
      }));
    } catch (e) {
      setState((state) => ({
        ...state,
        error: e as AxiosError,
        isLoading: false,
      }));
    }
  }, []);

  return {
    ...state,
    callApi,
  };
}
