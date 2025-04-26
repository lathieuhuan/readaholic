import type { AxiosError, AxiosRequestConfig } from "axios";

// ===== REQUEST =====

export type RetryConfig = boolean | number | ((error: ApiError, doneRetries: number) => boolean);

export type CustomExtraRequestConfig = {
  suppressNotifier?: boolean;
  retry?: RetryConfig;
  retryDelay?: number;
  useDefaultRetry?: boolean;
};

export type RequestConfig = Omit<AxiosRequestConfig, "url" | "method" | "params" | "data"> &
  CustomExtraRequestConfig;

// ===== RESPONSE =====

export type ResponseData<TData> = {
  meta: {
    code: number;
    message: string;
  };
  data: TData;
};

export type PagingResponseData<TData = any> = ResponseData<{
  content: TData[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}>;

export type ApiError = Omit<AxiosError<ResponseData<null>>, "config"> & {
  config: RequestConfig;
};

export type AxiosErrorCode = "ECONNABORTED" | "ETIMEDOUT" | "ERR_NETWORK" | "ERR_BAD_RESPONSE";
