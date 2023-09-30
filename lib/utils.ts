 import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// absoluteUrl() - Stripe requires absolute URLs for webhooks and redirect URLs, and this function can be used to generate those URLs by concatenating the path parameter with the NEXT_PUBLIC_APP_URL environment variable.