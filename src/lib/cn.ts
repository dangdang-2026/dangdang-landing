import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** 조건부 클래스를 합치고, 겹치는 Tailwind 클래스는 뒤에 온 것만 남긴다 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
