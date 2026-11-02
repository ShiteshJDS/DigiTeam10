import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';
import type { Screen } from '@/types';

const ITEMS: { id: Screen; label: string; icoon: ReactElement }[] = [
  {
    id: 'home',
    label: 'Home',
    icoon: (
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z" />
    ),
  },
  {
    id: 'mood',
    label: 'Mood',
    icoon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 14.5s1 1.5 3.5 1.5 3.5-1.5 3.5-1.5" />
        <path d="M9 9.5h.01M15 9.5h.01" strokeWidth="2.4" />
      </>
    ),
  },
  {
    id: 'chat',
    label: 'Praat',
    icoon: (
      <path d="M21 12a8 8 0 0 1-8 8H4l2.2-3.1A8 8 0 1 1 21 12Z" />
    ),
  },
  {
    id: 'suggesties',
    label: 'Doen',
    icoon: (
      <>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <circle cx="12" cy="12" r="4.5" />
      </>
    ),
  },
  {
    id: 'hulp',
    label: 'Hulp',
    icoon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.3a2.6 2.6 0 0 1 5.1.8c0 1.7-2.6 2.2-2.6 3.9" />
        <path d="M12 17.2h.01" strokeWidth="2.4" />
      </>
    ),
  },
];

interface Props {
  actief: Screen;
  gaNaar: (s: Screen) => void;
}

export function BottomNav({ actief, gaNaar }: Props) {
  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-digi-lavdark bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <div className="flex items-stretch justify-around px-2">
        {ITEMS.map((item) => {
          const isActief = actief === item.id;
          return (
            <button
              key={item.id}
              onClick={() => gaNaar(item.id)}
              aria-current={isActief ? 'page' : undefined}
              className={cn(
                'flex min-h-[56px] min-w-[56px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 pt-1.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple',
                isActief ? 'text-digi-purple' : 'text-digi-ink/45 hover:text-digi-deep',
              )}
            >
              <svg
                viewBox="0 0 24 24"
                className={cn('h-6 w-6 transition-transform duration-200', isActief && 'scale-110')}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icoon}
              </svg>
              <span className={cn('text-[11px] font-bold', isActief ? 'opacity-100' : 'opacity-70')}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
