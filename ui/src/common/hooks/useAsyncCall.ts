import { useCallback, useState } from "react";
import type { AxiosError } from "axios";

export type AsyncApiCallback<D> = (...args: unknown[]) => Promise<D>;

export type UseHttpCallOutput<D> = {
  isLoading: boolean;
  error: AxiosError | null;
  data: D | null;
  callApi: (cb: AsyncApiCallback<D>) => Promise<void>;
};

export function useAsyncCall<D>(): UseHttpCallOutput<D> {
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<D | null>(null);

  const callApi = useCallback(async (cb: AsyncApiCallback<D>): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await cb();

      setData(response);
      setIsLoading(false);
    } catch (e) {
      setError(e as AxiosError);
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    data,
    callApi,
  };
}
