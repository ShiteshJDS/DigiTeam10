import { useState } from 'react';
import { DigiSprite } from '@/components/DigiSprite';
import { HOBBY_OPTIES } from '@/data/content';
import { cn } from '@/lib/utils';
import type { Profile } from '@/types';

interface Props {
  profile: Profile;
  opslaan: (naam: string, hobbies: string[]) => void;
  wissen: () => void;
}

export function Profiel({ profile, opslaan, wissen }: Props) {
  const [bewerken, setBewerken] = useState(false);
  const [naam, setNaam] = useState(profile.naam);
  const [hobbies, setHobbies] = useState<string[]>(profile.hobbies);
  const [bevestigWis, setBevestigWis] = useState(false);

  const toggleHobby = (h: string) =>
    setHobbies((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]));

  return (
    <div className="px-5 pb-28 pt-8">
      <div className="flex flex-col items-center text-center">
        <DigiSprite src="/digi/pose_neutraal.png" className="h-32 w-32" wiggle />
        <h1 className="mt-3 font-display text-2xl text-digi-deep">
          {profile.heeftAccount ? `Hoi, ${profile.naam}!` : 'Anonieme gast'}
        </h1>
        <p className="mt-1 text-sm font-semibold text-digi-ink/55">
          {profile.heeftAccount
            ? 'Jouw gegevens staan alleen op deze telefoon.'
            : 'Je gebruikt Digi zonder account. Er wordt niets bewaard.'}
        </p>
      </div>

      {!bewerken ? (
        <>
          {profile.heeftAccount && profile.hobbies.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-digi-ink/50">
                Jouw hobby's
              </h2>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {profile.hobbies.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-digi-deep ring-1 ring-digi-lavdark"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                setNaam(profile.naam);
                setHobbies(profile.hobbies);
                setBewerken(true);
              }}
              className="w-full rounded-2xl bg-digi-purple py-3.5 font-display text-base text-white shadow-[0_4px_0_#6a5acd] transition-transform duration-150 hover:brightness-105 active:translate-y-0.5 active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
            >
              {profile.heeftAccount ? 'Profiel aanpassen' : 'Toch een profiel maken'}
            </button>
            {profile.heeftAccount &&
              (bevestigWis ? (
                <div className="rounded-2xl bg-white p-4 ring-2 ring-digi-pink">
                  <p className="text-sm font-bold text-digi-ink">
                    Zeker weten? Je naam en hobby's worden gewist.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        wissen();
                        setBevestigWis(false);
                      }}
                      className="flex-1 rounded-xl bg-digi-pink py-2.5 text-sm font-extrabold text-white transition-transform active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-pink"
                    >
                      Ja, wis alles
                    </button>
                    <button
                      onClick={() => setBevestigWis(false)}
                      className="flex-1 rounded-xl bg-digi-lav py-2.5 text-sm font-extrabold text-digi-deep transition-colors hover:bg-digi-lavdark focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
                    >
                      Annuleren
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setBevestigWis(true)}
                  className="w-full rounded-2xl bg-white py-3.5 font-display text-base text-digi-deep ring-1 ring-digi-lavdark transition-colors hover:bg-digi-lav focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
                >
                  Wis mijn gegevens
                </button>
              ))}
          </div>
        </>
      ) : (
        <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-digi-lavdark">
          <label htmlFor="profiel-naam" className="block text-sm font-bold text-digi-ink">
            Naam
          </label>
          <input
            id="profiel-naam"
            type="text"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            maxLength={20}
            className="mt-2 w-full rounded-2xl border-2 border-digi-lavdark bg-white px-4 py-3 text-base font-semibold text-digi-ink focus:border-digi-purple focus:outline-none"
          />
          <span className="mt-5 block text-sm font-bold text-digi-ink">Hobby's</span>
          <div className="mt-2.5 flex flex-wrap gap-2">
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
                      : 'bg-digi-lav text-digi-ink/70 hover:bg-digi-lavdark',
                  )}
                >
                  {h}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex gap-2.5">
            <button
              onClick={() => {
                opslaan(naam || 'vriend', hobbies);
                setBewerken(false);
              }}
              disabled={!naam.trim()}
              className="flex-1 rounded-2xl bg-digi-purple py-3 font-display text-base text-white transition-all duration-150 enabled:hover:brightness-105 enabled:active:scale-95 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
            >
              Opslaan
            </button>
            <button
              onClick={() => setBewerken(false)}
              className="flex-1 rounded-2xl bg-digi-lav py-3 font-display text-base text-digi-deep transition-colors hover:bg-digi-lavdark focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-digi-ink/50">
          Wat Digi wel en niet doet
        </h2>
        <ul className="mt-3 flex flex-col gap-2.5">
          {[
            ['#7fd9a8', 'Luistert zonder oordeel en denkt met je mee'],
            ['#7fd9a8', 'Geeft offline suggesties die passen bij jouw dag'],
            ['#7fd9a8', 'Verwijst door naar echte hulp als dat nodig is'],
            ['#f48fb1', 'Vervangt nooit een echt persoon of hulpverlener'],
            ['#f48fb1', 'Verzamelt geen gegevens zonder dat jij het weet'],
            ['#f48fb1', 'Houdt je niet langer online dan nodig — geen streaks, geen meldingen'],
          ].map(([kleur, tekst]) => (
            <li key={tekst} className="flex items-start gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-digi-lavdark">
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: kleur }} />
              <span className="text-sm font-semibold leading-relaxed text-digi-ink/80">{tekst}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
