import { DigiSprite } from '@/components/DigiSprite';
import { ActivityIcon } from '@/components/ActivityIcon';
import { suggestiesVoor } from '@/data/content';
import type { Profile, Screen } from '@/types';

interface Props {
  profile: Profile;
  gaNaar: (s: Screen) => void;
  startSuggestie: (id: string) => void;
}

function begroeting(): string {
  const uur = new Date().getHours();
  if (uur < 6) return 'Nog wakker';
  if (uur < 12) return 'Goedemorgen';
  if (uur < 18) return 'Goedemiddag';
  return 'Goedenavond';
}

const ACTIES: { id: Screen; titel: string; sub: string; sprite: string; kleur: string }[] = [
  {
    id: 'mood',
    titel: 'Hoe voel je je?',
    sub: 'Doe de mood-check',
    sprite: '/digi/nieuwsgierig.png',
    kleur: 'bg-digi-blue/20',
  },
  {
    id: 'chat',
    titel: 'Praat met Digi',
    sub: 'Digi luistert, zonder oordeel',
    sprite: '/digi/pose_koptelefoon.png',
    kleur: 'bg-digi-pink/20',
  },
  {
    id: 'suggesties',
    titel: 'Iets leuks doen',
    sub: 'Offline ideeën voor jou',
    sprite: '/digi/pose_spring.png',
    kleur: 'bg-digi-mint/20',
  },
  {
    id: 'hulp',
    titel: 'Hulp zoeken',
    sub: 'Mensen die er voor je zijn',
    sprite: '/digi/pose_pet.png',
    kleur: 'bg-digi-amber/20',
  },
];

export function Home({ profile, gaNaar, startSuggestie }: Props) {
  const tip = suggestiesVoor('rustig', profile.hobbies, 1)[0];
  const naam = profile.heeftAccount && profile.naam ? `, ${profile.naam}` : '';

  return (
    <div className="px-5 pb-28 pt-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-digi-ink/50">
            {begroeting()}{naam}
          </p>
          <h1 className="font-display text-2xl text-digi-deep">Fijn dat je er bent</h1>
        </div>
        <button
          onClick={() => gaNaar('profiel')}
          aria-label="Naar je profiel"
          className="rounded-full bg-white p-1.5 shadow-sm ring-1 ring-digi-lavdark transition-transform duration-150 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
        >
          <img src="/digi/pose_neutraal.png" alt="" className="h-11 w-11 object-contain" />
        </button>
      </header>

      <section className="relative mt-6 overflow-hidden rounded-3xl bg-digi-purple px-6 pb-6 pt-5 text-white">
        <p className="relative z-10 max-w-[62%] text-lg font-bold leading-snug">
          Zin om even een korte pauze te nemen van je telefoon?
        </p>
        <p className="relative z-10 mt-1.5 max-w-[62%] text-sm font-medium text-white/85">
          Ik heb een paar leuke ideeën voor je.
        </p>
        <button
          onClick={() => gaNaar('mood')}
          className="relative z-10 mt-4 rounded-xl bg-white px-5 py-2.5 text-sm font-extrabold text-digi-deep transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          Doe de mood-check
        </button>
        <DigiSprite
          src="/digi/blij.png"
          className="absolute -bottom-3 -right-2 z-0 h-40 w-36"
          float
        />
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3">
        {ACTIES.map((a) => (
          <button
            key={a.id}
            onClick={() => gaNaar(a.id)}
            className="group rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-digi-lavdark transition-transform duration-150 hover:-translate-y-1 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
          >
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${a.kleur}`}>
              <img
                src={a.sprite}
                alt=""
                className="h-14 w-14 object-contain transition-transform duration-200 group-hover:scale-110"
              />
            </div>
            <span className="mt-3 block font-display text-base text-digi-deep">{a.titel}</span>
            <span className="mt-0.5 block text-xs font-semibold text-digi-ink/55">{a.sub}</span>
          </button>
        ))}
      </section>

      {tip && (
        <button
          onClick={() => startSuggestie(tip.id)}
          className="mt-6 flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-digi-lavdark transition-transform duration-150 hover:-translate-y-1 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-digi-lav text-digi-purple">
            <ActivityIcon naam={tip.icoon} className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-xs font-extrabold uppercase tracking-wide text-digi-purple">
              Tip van Digi
            </span>
            <span className="block truncate font-display text-base text-digi-deep">{tip.titel}</span>
            <span className="block text-xs font-semibold text-digi-ink/55">± {tip.minuten} minuten</span>
          </div>
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-digi-ink/40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
