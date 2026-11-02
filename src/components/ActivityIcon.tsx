import type { ReactElement } from 'react';

const PATHS: Record<string, ReactElement> = {
  wandelen: (
    <>
      <circle cx="13" cy="4.5" r="2" />
      <path d="M13 8.5 10.5 13l-2 7M13 8.5l3 3 3 1M13 8.5 9 11l-2.5 1M10.5 13l3 2.5 1 5.5" />
    </>
  ),
  muziek: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  creatief: (
    <>
      <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3c.5.6.4 1.7-.5 2.2-.6.4-1.3.5-2 .5Z" />
      <circle cx="7.5" cy="11.5" r="1.2" />
      <circle cx="10.5" cy="7.5" r="1.2" />
      <circle cx="15" cy="8" r="1.2" />
    </>
  ),
  sport: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M5.5 9.5c4 2 9 2 13 0M5.5 14.5c4-2 9-2 13 0" />
    </>
  ),
  praten: (
    <>
      <path d="M17 11a5 5 0 0 0-5-5H8a5 5 0 0 0-4 8l-1 4 4-1" />
      <path d="M21 15a4 4 0 0 0-3-6.9" />
      <path d="M21 15a4 4 0 0 1-4 4h-1" />
    </>
  ),
  pauze: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10 10v4M14 10v4" strokeWidth="2.2" />
    </>
  ),
  koken: (
    <>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M8 7c0-1.5 1-1.5 1-3M12.5 7c0-1.5 1-1.5 1-3" />
      <path d="M9 21h6" />
    </>
  ),
  boek: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M20 18v3H6.5A2.5 2.5 0 0 1 4 18.5" />
    </>
  ),
  dier: (
    <>
      <circle cx="7" cy="8" r="1.8" />
      <circle cx="12" cy="5.5" r="1.8" />
      <circle cx="17" cy="8" r="1.8" />
      <path d="M12 11c-3 0-5.5 2.3-5.5 5 0 1.8 1.4 3 3.2 3 1 0 1.6-.5 2.3-.5s1.3.5 2.3.5c1.8 0 3.2-1.2 3.2-3 0-2.7-2.5-5-5.5-5Z" />
    </>
  ),
};

interface Props {
  naam: string;
  className?: string;
}

export function ActivityIcon({ naam, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[naam] ?? PATHS.creatief}
    </svg>
  );
}
