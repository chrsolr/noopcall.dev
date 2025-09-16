import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function stringToHyphen(str: string) {
  if (!str) {
    return str
  }
  
  return str.replace(/[^\s]/g, "-")
}
