import { useState } from 'react';
import { DigiSprite } from '@/components/DigiSprite';
import { HOBBY_OPTIES } from '@/data/content';
import { cn } from '@/lib/utils';

interface Props {
  klaar: (naam: string, hobbies: string[], metAccount: boolean) => void;
}

type Stap = 'welkom' | 'keuze' | 'profiel';

export function Onboarding({ klaar }: Props) {
  const [stap, setStap] = useState<Stap>('welkom');
  const [naam, setNaam] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);

  const toggleHobby = (h: string) =>
    setHobbies((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]));

  return (
    <div className="flex min-h-dvh flex-col bg-digi-lav">
      {stap === 'welkom' && (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <DigiSprite src="/digi/blij.png" className="h-52 w-52" bounce />
          <h1 className="mt-6 font-display text-4xl text-digi-deep">Digi</h1>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-digi-ink">
            Jouw digitale maatje voor een gezondere balans.
          </p>
          <button
            onClick={() => setStap('keuze')}
            className="mt-10 w-full max-w-xs rounded-2xl bg-digi-purple py-4 font-display text-lg text-white shadow-[0_6px_0_#6a5acd] transition-transform duration-150 hover:brightness-105 active:translate-y-1 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
          >
            Laten we gaan!
          </button>
        </div>
      )}

      {stap === 'keuze' && (
        <div className="flex flex-1 flex-col px-6 py-10">
          <DigiSprite src="/digi/pose_zwaai.png" className="mx-auto h-36 w-36" float />
          <h2 className="mt-4 text-center font-display text-2xl text-digi-deep">
            Hoe wil je starten?
          </h2>
          <p className="mx-auto mt-2 max-w-xs text-center text-sm font-medium leading-relaxed text-digi-ink/70">
            Je hoeft geen account te maken. Zonder account bewaart Digi helemaal niets van jou.
          </p>
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-4">
            <button
              onClick={() => klaar('', [], false)}
              className="rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-digi-lavdark transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
            >
              <span className="block font-display text-lg text-digi-deep">Zonder account verder</span>
              <span className="mt-1 block text-sm font-medium text-digi-ink/70">
                Volledig anoniem. Sluit je de app, dan is alles weg.
              </span>
            </button>
            <button
              onClick={() => setStap('profiel')}
              className="rounded-2xl bg-digi-purple p-5 text-left shadow-[0_4px_0_#6a5acd] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
            >
              <span className="block font-display text-lg text-white">Maak een profiel</span>
              <span className="mt-1 block text-sm font-medium text-white/85">
                Alleen een naam en je hobby's — dan kan Digi beter meedenken.
              </span>
            </button>
          </div>
          <p className="mx-auto mt-auto max-w-xs pt-8 text-center text-xs font-medium leading-relaxed text-digi-ink/50">
            Digi is een digitaal hulpmiddel, geen echt persoon. Bij serieuze problemen verwijst Digi je door naar mensen die je echt kunnen helpen.
          </p>
        </div>
      )}

      {stap === 'profiel' && (
        <div className="flex flex-1 flex-col px-6 py-10">
          <DigiSprite src="/digi/nieuwsgierig.png" className="mx-auto h-28 w-28" />
          <h2 className="mt-4 text-center font-display text-2xl text-digi-deep">Leuk je te ontmoeten!</h2>
          <label htmlFor="naam" className="mt-8 block text-sm font-bold text-digi-ink">
            Hoe mag Digi je noemen?
          </label>
          <input
            id="naam"
            type="text"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            placeholder="Bijvoorbeeld: Alex"
            maxLength={20}
            className="mt-2 w-full rounded-2xl border-2 border-digi-lavdark bg-white px-4 py-3.5 text-base font-semibold text-digi-ink placeholder:text-digi-ink/35 focus:border-digi-purple focus:outline-none"
          />
          <span className="mt-6 block text-sm font-bold text-digi-ink">
            Waar word je blij van? <span className="font-medium text-digi-ink/50">(optioneel)</span>
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {HOBBY_OPTIES.map((h) => {
              const aan = hobbies.includes(h);
              return (
                <button
                  key={h}
                  onClick={() => toggleHobby(h)}
                  aria-pressed={aan}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-bold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple',
                    aan
                      ? 'bg-digi-purple text-white'
                      : 'bg-white text-digi-ink/70 ring-1 ring-digi-lavdark hover:ring-digi-purple/50',
                  )}
                >
                  {h}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => klaar(naam || 'vriend', hobbies, true)}
            disabled={!naam.trim()}
            className="mt-8 w-full rounded-2xl bg-digi-purple py-4 font-display text-lg text-white shadow-[0_6px_0_#6a5acd] transition-all duration-150 enabled:hover:brightness-105 enabled:active:translate-y-1 enabled:active:shadow-none disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
          >
            Opslaan en starten
          </button>
          <p className="mt-4 text-center text-xs font-medium leading-relaxed text-digi-ink/50">
            Je gegevens blijven op jouw telefoon. Je kunt ze altijd wissen via je profiel.
          </p>
        </div>
      )}
    </div>
  );
}
