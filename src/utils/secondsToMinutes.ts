import { zeroLeft } from './zeroLeft';

export function SecondsToMinutes(seconds: number): string {
  const minutes = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${minutes}:${sec}`;
}
