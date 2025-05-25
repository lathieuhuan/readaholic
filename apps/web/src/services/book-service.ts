import { GetBooksRequest, GetBooksResponse } from "@readaholic/service";
import { http, RequestConfig } from "./base/http";

export function getBooks(params: GetBooksRequest, config?: RequestConfig) {
  return http.request<GetBooksResponse>("GET", "/books", {
    params,
    ...config,
  });
}

