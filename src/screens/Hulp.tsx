import { DigiSprite } from '@/components/DigiSprite';
import { HULP } from '@/data/content';
import type { Screen } from '@/types';

interface Props {
  gaNaar: (s: Screen) => void;
}

export function Hulp({ gaNaar }: Props) {
  return (
    <div className="px-5 pb-28 pt-8">
      <div className="flex items-start gap-4">
        <DigiSprite src="/digi/pose_buig.png" className="h-24 w-24 shrink-0" />
        <div>
          <h1 className="font-display text-2xl text-digi-deep">Echte hulp in de buurt</h1>
          <p className="mt-1.5 text-sm font-semibold leading-relaxed text-digi-ink/65">
            Digi is een eerste stap — geen vervanging. Deze mensen staan écht voor je klaar.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {HULP.map((h) => {
          const isIntern = h.actie.href === '#chat';
          return (
            <article key={h.naam} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-digi-lavdark">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: h.kleur }} />
                <h2 className="font-display text-base text-digi-deep">{h.naam}</h2>
              </div>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-digi-ink/75">
                {h.omschrijving}
              </p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-digi-ink/55">{h.detail}</p>
              {isIntern ? (
                <button
                  onClick={() => gaNaar('chat')}
                  className="mt-3.5 rounded-xl px-5 py-2.5 text-sm font-extrabold text-white transition-transform duration-150 hover:brightness-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
                  style={{ backgroundColor: h.kleur === '#f5c26b' ? '#e8a83e' : h.kleur }}
                >
                  {h.actie.label}
                </button>
              ) : (
                <a
                  href={h.actie.href}
                  className="mt-3.5 inline-block rounded-xl px-5 py-2.5 text-sm font-extrabold text-white transition-transform duration-150 hover:brightness-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
                  style={{ backgroundColor: h.kleur === '#f5c26b' ? '#e8a83e' : h.kleur }}
                >
                  {h.actie.label}
                </a>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-6 rounded-2xl bg-digi-lavdark/50 p-4 text-xs font-semibold leading-relaxed text-digi-ink/65">
        Praten over je gevoelens is normaal — en sterk. Twijfel je of jouw probleem "groot genoeg"
        is? Dan is het het waard om te delen.
      </p>
    </div>
  );
}
