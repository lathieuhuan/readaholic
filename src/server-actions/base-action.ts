'use server';
import type { StandardResponse } from '@/types';

export async function baseAction<T>(
  apiUrl: string,
  request?: RequestInit,
): Promise<StandardResponse<T>> {
  const domain = process.env.__NEXT_PRIVATE_ORIGIN;

  const response = await fetch(`${domain}${apiUrl}`, {
    ...request,
    // headers: {
    //   Authorization: `Basic ${btoa(
    //     `${process.env.CMS_USER_NAME}:${process.env.CMS_USER_PASSWORD}`,
    //   )}`,
    //   ...request.headers,
    // },
  });

  return await response.json();
}
