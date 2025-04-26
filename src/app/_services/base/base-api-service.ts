import type { RequestConfig, ResponseData } from "./base-api-models";
import baseHttp from "./base-http";

export abstract class BaseApiService {
  protected abstract basePath: string;

  protected get = <TReponseData extends ResponseData<any> = ResponseData<any>>(
    endpoint = "",
    params?: Record<string, any> | null,
    config?: RequestConfig,
  ) => {
    return baseHttp
      .request<TReponseData>("GET", `${this.basePath}${endpoint}`, {
        ...config,
        params,
      })
      .then((res) => res.data);
  };

  protected post = <TReponseData extends ResponseData<any> = ResponseData<any>>(
    endpoint = "",
    data?: Record<string, any> | null,
    config?: RequestConfig,
  ) => {
    return baseHttp
      .request<TReponseData>("POST", `${this.basePath}${endpoint}`, {
        ...config,
        data,
      })
      .then((res) => res.data);
  };

  protected patch = <TReponseData extends ResponseData<any> = ResponseData<any>>(
    endpoint = "",
    data?: Record<string, any> | null,
    config?: RequestConfig,
  ) => {
    return baseHttp
      .request<TReponseData>("PATCH", `${this.basePath}${endpoint}`, {
        ...config,
        data,
      })
      .then((res) => res.data);
  };

  protected put = <TReponseData extends ResponseData<any> = ResponseData<any>>(
    endpoint = "",
    data?: Record<string, any> | null,
    config?: RequestConfig,
  ) => {
    return baseHttp
      .request<TReponseData>("PUT", `${this.basePath}${endpoint}`, {
        ...config,
        data,
      })
      .then((res) => res.data);
  };

  protected delete = (endpoint = "", config?: RequestConfig) => {
    return baseHttp.request<null>("DELETE", `${this.basePath}${endpoint}`, config);
  };
}
