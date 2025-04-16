import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDomain() {
  const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https" : "http";
  const domain = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000";
  return `${protocol}://${domain}`;
}
