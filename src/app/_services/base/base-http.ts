import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getTranslations } from "next-intl/server";

import type { ApiError, CustomExtraRequestConfig, RetryConfig } from "./base-api-models";

import { notifier } from "@app/_utils/notifier";
import { DOMAIN, IS_DEV_ENV } from "@app/_constants/config";

type ApiResponse<TResponseData> = Promise<AxiosResponse<TResponseData, ApiError>>;

type InternalRequestConfig = Omit<AxiosRequestConfig, "url" | "method"> & CustomExtraRequestConfig;

class BaseHttp {
  private http: AxiosInstance;
  private readonly NUM_OF_DEFAULT_RETRIES = 1;
  private readonly DELAY_OF_DEFAULT_RETRY = 1000;
  private readonly axiosErrorMap = new Map<string, string>([
    ["ECONNABORTED", "CONNECTION_TIMEOUT"],
    ["ETIMEDOUT", "CONNECTION_TIMEOUT"],
    ["ERR_NETWORK", "NETWORK_ERROR"],
  ]);

  constructor() {
    const http = axios.create({
      baseURL: "/api",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 8000,
    });

    // http.interceptors.request.use((config) => {
    //   const accessToken = Cookies.get("access_token");

    //   if (accessToken) {
    //     config.headers.Authorization = `Bearer ${accessToken}`;
    //   }
    //   return config;
    // });

    if (IS_DEV_ENV) {
      http.interceptors.request.use((config) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(config), 200);
        });
      });
    }

    this.http = http;
  }

  /**
   * @param retry - If false, no retry; if true, retry indefinitely.
   * If 0, no retry; if number < 0, retry indefinitely; if number > 0, retry [number] times.
   * If function, its boolean return value will be used as the retry condition.
   */
  private mayRetry<TResponseData = any>(
    fn: (retry: RetryConfig) => ApiResponse<TResponseData>,
    remainingDefaultRetries: number,
    retry: RetryConfig = 0,
    retryDelay = 1000,
    doneRetries = 0,
  ): ApiResponse<TResponseData> {
    //
    return fn(retry).catch((error: ApiError) => {
      // DEFAULT RETRY
      if (remainingDefaultRetries > 0) {
        const shouldRetryByDefault =
          (error.code && this.axiosErrorMap.has(error.code)) || error.status === 503;

        if (shouldRetryByDefault) {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve(
                this.mayRetry(fn, remainingDefaultRetries - 1, retry, retryDelay, doneRetries + 1),
              );
            }, this.DELAY_OF_DEFAULT_RETRY),
          );
        }
      }

      // CUSTOM RETRY
      let shouldRetry: boolean;
      let nextRetry: RetryConfig;

      switch (typeof retry) {
        case "boolean":
          shouldRetry = nextRetry = retry;
          break;
        case "number":
          shouldRetry = retry > 0;
          nextRetry = retry - 1;
          break;
        case "function":
          shouldRetry = retry(error, doneRetries);
          nextRetry = retry;
          break;
      }

      if (shouldRetry) {
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              this.mayRetry(fn, remainingDefaultRetries, nextRetry, retryDelay, doneRetries + 1),
            );
          }, retryDelay),
        );
      }

      // LAST CALL FAILED
      const config = error.config as unknown as InternalRequestConfig;
      const axiosError = error.code ? this.axiosErrorMap.get(error.code) : undefined;

      if (!config?.suppressNotifier) {
        notifier.notify({
          type: "error",
          message: axiosError
            ? i18n.t(axiosError, { ns: "error" })
            : error.response?.data?.meta.message || error.message,
        });
      }

      return Promise.reject(error);
    });
  }

  request<TResponseData = any>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    config: InternalRequestConfig = {},
  ): ApiResponse<TResponseData> {
    const { retry, retryDelay, useDefaultRetry = true, ...axiosConfig } = config;

    return this.mayRetry(
      () => {
        return this.http.request({ method, url, ...axiosConfig });
      },
      useDefaultRetry ? this.NUM_OF_DEFAULT_RETRIES : 0,
      retry,
      retryDelay,
    );
  }
}

const baseHttp = new BaseHttp();

export default baseHttp;
