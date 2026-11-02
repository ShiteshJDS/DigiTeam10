import { useState } from 'react';
import { DigiSprite } from '@/components/DigiSprite';
import { MOODS, moodById, suggestiesVoor } from '@/data/content';
import { cn } from '@/lib/utils';
import type { MoodId, Profile, Screen } from '@/types';

interface Props {
  profile: Profile;
  gaNaar: (s: Screen) => void;
  startSuggestie: (id: string) => void;
}

export function Mood({ profile, gaNaar, startSuggestie }: Props) {
  const [gekozen, setGekozen] = useState<MoodId | null>(null);
  const mood = gekozen ? moodById(gekozen) : null;
  const tips = gekozen ? suggestiesVoor(gekozen, profile.hobbies, 2) : [];

  if (!mood) {
    return (
      <div className="px-5 pb-28 pt-8">
        <h1 className="text-center font-display text-2xl text-digi-deep">Hoe voel je je nu?</h1>
        <p className="mx-auto mt-2 max-w-xs text-center text-sm font-semibold text-digi-ink/60">
          Er is geen goed of fout antwoord. Kies wat het dichtstbij ligt.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {MOODS.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setGekozen(m.id)}
              className="group flex flex-col items-center rounded-3xl bg-white px-3 pb-4 pt-5 shadow-sm ring-1 ring-digi-lavdark transition-transform duration-150 hover:-translate-y-1 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <img
                src={m.sprite}
                alt=""
                className="h-20 w-20 object-contain transition-transform duration-200 group-hover:scale-110"
              />
              <span className="mt-2 font-display text-base text-digi-deep">{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pb-28 pt-8">
      <button
        onClick={() => setGekozen(null)}
        className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-digi-ink/70 shadow-sm ring-1 ring-digi-lavdark transition-colors hover:text-digi-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 6-6 6 6 6" />
        </svg>
        Andere mood
      </button>

      <div className="flex flex-col items-center text-center">
        <DigiSprite src={mood.sprite} className="h-36 w-36" bounce />
        <span
          className="mt-3 rounded-full px-4 py-1.5 text-sm font-extrabold text-white"
          style={{ backgroundColor: mood.kleur }}
        >
          {mood.label}
        </span>
      </div>

      <div className="relative mt-5 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-digi-lavdark">
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
        <p className="text-base font-bold leading-relaxed text-digi-ink">{mood.reactie}</p>
        <p className="mt-1.5 text-sm font-semibold leading-relaxed text-digi-ink/65">{mood.vervolg}</p>
      </div>

      {tips.length > 0 && (
        <div className="mt-5">
          <h2 className="font-display text-lg text-digi-deep">Dit past bij je mood</h2>
          <div className="mt-3 flex flex-col gap-3">
            {tips.map((t) => (
              <button
                key={t.id}
                onClick={() => startSuggestie(t.id)}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-digi-lavdark transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
              >
                <div className="min-w-0">
                  <span className="block font-display text-base text-digi-deep">{t.titel}</span>
                  <span className="mt-0.5 block text-xs font-semibold text-digi-ink/55">
                    ± {t.minuten} min · zonder scherm
                  </span>
                </div>
                <span className="shrink-0 rounded-xl bg-digi-lav px-3 py-2 text-xs font-extrabold text-digi-purple">
                  Start
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => gaNaar('chat')}
          className="flex-1 rounded-2xl bg-digi-purple py-3.5 font-display text-base text-white shadow-[0_4px_0_#6a5acd] transition-transform duration-150 hover:brightness-105 active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
        >
          Praat met Digi
        </button>
        <button
          onClick={() => gaNaar('hulp')}
          className={cn(
            'flex-1 rounded-2xl bg-white py-3.5 font-display text-base text-digi-deep ring-1 ring-digi-lavdark transition-colors hover:bg-digi-lav',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple',
          )}
        >
          Ik zoek hulp
        </button>
      </div>
    </div>
  );
}
