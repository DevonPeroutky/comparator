import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mapRange = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number => {
  const normalizedValue = (Math.log(value) - Math.log(start1)) / (Math.log(stop1) - Math.log(start1));
  return Math.exp(Math.log(start2) + normalizedValue * (Math.log(stop2) - Math.log(start2)));
}

export function generateSteppedArray(start: number, end: number, steps: number): number[] {
  const stepSize = (end - start) / (steps - 1);
  const roundToNearestMillion = (x: number) => Math.round(x / 1000000) * 1000000;
  return Array.from({ length: steps }, (_, i) => start + i * stepSize).map(roundToNearestMillion);
}

