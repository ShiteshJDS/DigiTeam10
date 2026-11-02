import { useMemo, useState } from 'react';
import { ActivityIcon } from '@/components/ActivityIcon';
import { DigiSprite } from '@/components/DigiSprite';
import { ACTIVITEITEN, HOBBY_OPTIES } from '@/data/content';
import { cn } from '@/lib/utils';
import type { Profile } from '@/types';

interface Props {
  profile: Profile;
  actiefId: string | null;
  setActiefId: (id: string | null) => void;
}

type Fase = 'lijst' | 'bezig' | 'klaar';

export function Suggesties({ profile, actiefId, setActiefId }: Props) {
  const [filter, setFilter] = useState<string>('alles');
  const [fase, setFase] = useState<Fase>(actiefId ? 'bezig' : 'lijst');

  const activiteit = useMemo(
    () => ACTIVITEITEN.find((a) => a.id === actiefId) ?? null,
    [actiefId],
  );

  const lijst = useMemo(() => {
    if (filter === 'alles') {
      // hobby's van de gebruiker eerst
      return [...ACTIVITEITEN].sort((a, b) => {
        const score = (x: (typeof ACTIVITEITEN)[number]) =>
          x.hobby.filter((h) => profile.hobbies.includes(h)).length;
        return score(b) - score(a);
      });
    }
    return ACTIVITEITEN.filter((a) => a.hobby.includes(filter));
  }, [filter, profile.hobbies]);

  const start = (id: string) => {
    setActiefId(id);
    setFase('bezig');
  };

  const stop = () => {
    setActiefId(null);
    setFase('lijst');
  };

  if (fase === 'bezig' && activiteit) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 pb-28 pt-8 text-center">
        <DigiSprite src="/digi/slaperig.png" className="h-40 w-40" float />
        <h1 className="mt-6 font-display text-2xl text-digi-deep">{activiteit.titel}</h1>
        <p className="mt-3 max-w-xs text-base font-semibold leading-relaxed text-digi-ink/70">
          Lekker bezig! Leg je telefoon nu gerust weg — ik wacht hier. Neem ongeveer{' '}
          <strong className="text-digi-deep">{activiteit.minuten} minuten</strong> de tijd.
        </p>
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <button
            onClick={() => setFase('klaar')}
            className="w-full rounded-2xl bg-digi-mint py-4 font-display text-lg text-digi-ink shadow-[0_5px_0_#4caf7d] transition-transform duration-150 hover:brightness-105 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-mint"
          >
            Klaar!
          </button>
          <button
            onClick={stop}
            className="w-full rounded-2xl bg-white py-3.5 font-display text-base text-digi-deep ring-1 ring-digi-lavdark transition-colors hover:bg-digi-lav focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
          >
            Toch stoppen
          </button>
        </div>
      </div>
    );
  }

  if (fase === 'klaar') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-8 pb-28 pt-8 text-center">
        <DigiSprite src="/digi/opgewonden.png" className="h-44 w-44" bounce />
        <h1 className="mt-6 font-display text-2xl text-digi-deep">Toppie!</h1>
        <p className="mt-3 max-w-xs text-base font-semibold leading-relaxed text-digi-ink/70">
          Je hebt even iets gedaan zonder scherm. Geen punten, geen streak — gewoon fijn voor jou.
          Hoe voelt dat?
        </p>
        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <button
            onClick={() => {
              stop();
            }}
            className="w-full rounded-2xl bg-digi-purple py-4 font-display text-lg text-white shadow-[0_5px_0_#6a5acd] transition-transform duration-150 hover:brightness-105 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
          >
            Nog een idee
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pb-28 pt-8">
      <h1 className="font-display text-2xl text-digi-deep">Iets leuks om te doen</h1>
      <p className="mt-1.5 text-sm font-semibold text-digi-ink/60">
        Allemaal offline. Kies wat bij je past — niet om iets te moeten, maar omdat het lekker is.
      </p>

      <div className="scrollbar-none -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1" role="group" aria-label="Filter op hobby">
        {['alles', ...HOBBY_OPTIES.filter((h) => ACTIVITEITEN.some((a) => a.hobby.includes(h)))].map(
          (h) => (
            <button
              key={h}
              onClick={() => setFilter(h)}
              aria-pressed={filter === h}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm font-bold capitalize transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple',
                filter === h
                  ? 'bg-digi-purple text-white'
                  : 'bg-white text-digi-ink/65 ring-1 ring-digi-lavdark hover:ring-digi-purple/50',
              )}
            >
              {h}
            </button>
          ),
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {lijst.map((a) => {
          const matcht = a.hobby.some((h) => profile.hobbies.includes(h));
          return (
            <article
              key={a.id}
              className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-digi-lavdark"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-digi-lav text-digi-purple">
                  <ActivityIcon naam={a.icoon} className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-base text-digi-deep">{a.titel}</h2>
                    {matcht && (
                      <span className="rounded-full bg-digi-mint/25 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-digi-ink/70">
                        Past bij jou
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-digi-ink/65">
                    {a.beschrijving}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-extrabold text-digi-ink/50">
                  ± {a.minuten} minuten
                </span>
                <button
                  onClick={() => start(a.id)}
                  className="rounded-xl bg-digi-purple px-5 py-2.5 text-sm font-extrabold text-white transition-transform duration-150 hover:brightness-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
                >
                  Laten we gaan!
                </button>
              </div>
            </article>
          );
        })}
        {lijst.length === 0 && (
          <p className="mt-8 text-center text-sm font-semibold text-digi-ink/50">
            Hier heb ik nog geen idee voor — kies een andere hobby.
          </p>
        )}
      </div>
    </div>
  );
}
