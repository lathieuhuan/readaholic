import { Url } from 'next/dist/shared/lib/router/router';

export type ConstructableUrl = Url | (string | undefined | null)[];

export function constructUrl(constructableUrl: ConstructableUrl): Url {
  return Array.isArray(constructableUrl)
    ? constructableUrl.filter(Boolean).join('/')
    : constructableUrl;
}
