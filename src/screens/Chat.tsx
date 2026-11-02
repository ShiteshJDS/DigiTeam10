import { useEffect, useRef, useState } from 'react';
import {
  CRISIS_ANTWOORD,
  CRISIS_WORDS,
  FALLBACKS,
  INTENTS,
  OPENING,
  TRANSPARANTIE_HERINNERING,
} from '@/data/content';
import { cn } from '@/lib/utils';
import type { ChatMessage, Screen } from '@/types';

interface Props {
  gaNaar: (s: Screen) => void;
}

let fallbackIndex = 0;

export function Chat({ gaNaar }: Props) {
  const [berichten, setBerichten] = useState<ChatMessage[]>([
    { van: 'digi', tekst: OPENING.tekst },
  ]);
  const [chips, setChips] = useState<string[]>(OPENING.chips);
  const [sprite, setSprite] = useState('/digi/blij.png');
  const [typing, setTyping] = useState(false);
  const [invoer, setInvoer] = useState('');
  const [crisis, setCrisis] = useState(false);
  const [toonInfo, setToonInfo] = useState(false);
  const teller = useRef(0);
  const bodem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodem.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [berichten, typing]);

  const digiZegt = (teksten: string[], nieuweSprite?: string, nieuweChips?: string[]) => {
    setTyping(true);
    setChips([]);
    let vertraging = 650;
    teksten.forEach((tekst, i) => {
      const wanneer = vertraging;
      setTimeout(() => {
        setBerichten((prev) => [...prev, { van: 'digi', tekst }]);
        if (nieuweSprite) setSprite(nieuweSprite);
        if (i === teksten.length - 1) {
          setTyping(false);
          if (nieuweChips) setChips(nieuweChips);
          // elke 5 berichten van Digi een transparantie-herinnering
          teller.current += 1;
          if (teller.current % 5 === 0) {
            setTimeout(() => {
              setBerichten((prev) => [...prev, { van: 'systeem', tekst: TRANSPARANTIE_HERINNERING }]);
            }, 700);
          }
        }
      }, wanneer);
      vertraging += 750 + Math.min(tekst.length * 8, 1200);
    });
  };

  const beantwoord = (tekst: string) => {
    const schoon = tekst.trim().toLowerCase();
    if (!schoon) return;
    setBerichten((prev) => [...prev, { van: 'jij', tekst: tekst.trim() }]);
    setInvoer('');

    // crisis-signalen eerst
    if (CRISIS_WORDS.some((w) => schoon.includes(w))) {
      setCrisis(true);
      digiZegt([CRISIS_ANTWOORD.tekst, CRISIS_ANTWOORD.vervolg], '/digi/bang.png', [
        'Toon hulplijnen',
      ]);
      return;
    }

    // chip-specifieke antwoorden
    if (schoon === 'toon hulplijnen') {
      setTimeout(() => gaNaar('hulp'), 400);
      digiZegt(['Ik open de hulppagina voor je. Daar vind je mensen die écht voor je klaarstaan.']);
      return;
    }
    if (schoon === 'laat maar zien' || schoon === 'zoek iets om te doen' || schoon === 'ja, pauze-idee' || schoon === 'ik wil even iets leuks doen') {
      setTimeout(() => gaNaar('suggesties'), 500);
      digiZegt(['Leuk! Ik heb een paar offline ideeën voor je op een rij gezet.'], '/digi/opgewonden.png');
      return;
    }
    if (schoon === 'gewoon even kletsen') {
      digiZegt(
        [
          'Gezellig! Vertel eens: wat was het leukste moment van je dag tot nu toe?',
          'En hoe klein ook — een lekker broodje telt ook.',
        ],
        '/digi/blij.png',
      );
      return;
    }
    if (schoon === 'ik zit ergens mee') {
      digiZegt(
        [
          'Fijn dat je het durft te zeggen. Dat is al een grote stap.',
          'Wil je vertellen waar het over gaat? Ik luister zonder oordeel — en alles blijft op jouw telefoon.',
        ],
        '/digi/rustig.png',
      );
      return;
    }
    if (schoon === 'ik weet het niet') {
      digiZegt(
        [
          'Helemaal prima. Soms weet je gewoon niet precies wat er is.',
          'We kunnen klein beginnen: hoe voelde je dag vandaag? Eén woord is genoeg.',
        ],
        '/digi/nieuwsgierig.png',
      );
      return;
    }
    if (schoon === 'gewoon luisteren' || schoon === 'ik wil praten' || schoon === 'ik wil erover vertellen') {
      digiZegt(['Natuurlijk. Vertel maar alles — ik luister.'], '/digi/rustig.png');
      return;
    }
    if (schoon === 'samen kijken wat ik kan doen') {
      digiZegt(
        [
          'Goed plan. Eerst dit: je hoeft dit niet alleen op te lossen.',
          'Is er iemand in je omgeving die je vertrouwt? Een ouder, vriend, mentor of jongerenwerker?',
        ],
        '/digi/nieuwsgierig.png',
        ['Ja, er is iemand', 'Nee, niet echt'],
      );
      return;
    }
    if (schoon === 'ja, er is iemand') {
      digiZegt(
        [
          'Fijn om te horen. Zo\'n gesprek kan spannend zijn, maar het is het waard.',
          'Wil je dat ik je help om het gesprek voor te bereiden? Dan oefenen we samen wat je kunt zeggen.',
        ],
        '/digi/blij.png',
        ['Ja, laten we oefenen', 'Nee, ik red het zelf'],
      );
      return;
    }
    if (schoon === 'nee, niet echt' || schoon === 'nee, ik red het zelf') {
      digiZegt(
        [
          'Oké. Weet dat er altijd anonieme hulp is als je er toch over wilt praten — bijvoorbeeld de Kindertelefoon, gratis en zonder je naam.',
          'Kijk gerust op de hulppagina wanneer je er klaar voor bent.',
        ],
        '/digi/rustig.png',
        ['Toon hulplijnen'],
      );
      return;
    }
    if (schoon === 'ja, laten we oefenen') {
      digiZegt(
        [
          'Leuk! Stel, diegene vraagt: "Hoe gaat het met je?" Wat zou jij dan willen zeggen?',
          'Schrijf het hier rustig uit — niemand kijkt mee.',
        ],
        '/digi/nieuwsgierig.png',
      );
      return;
    }
    if (schoon === 'vertel meer over hulp') {
      setTimeout(() => gaNaar('hulp'), 400);
      digiZegt(['Zeker. Ik laat je zien waar je terechtkunt — anoniem en gratis.']);
      return;
    }
    if (schoon === 'oké, even ademhalen') {
      digiZegt(
        [
          'Samen: in… 2… 3… 4… en uit… 2… 3… 4…',
          'Nog eens: in… en uit… Goed zo. Hoe voel je je nu?',
        ],
        '/digi/rustig.png',
      );
      return;
    }
    if (schoon === 'oké, ik probeer het' || schoon === 'dat lukt niet') {
      digiZegt(
        schoon === 'oké, ik probeer het'
          ? ['Top! Kleine stap, groot verschil. Succes vanavond — ik duim voor je.', 'En morgen mag je me vertellen hoe het ging.']
          : ['Snap ik, verandering is lastig. Wat zou het makkelijker maken?', 'Soms helpt het om heel klein te beginnen — bijvoorbeeld 10 minuten in plaats van een uur.'],
        '/digi/blij.png',
      );
      return;
    }

    // intent-matching op trefwoorden
    const intent = INTENTS.find((i) => i.match.some((m) => schoon.includes(m)));
    if (intent) {
      digiZegt(intent.antwoorden, intent.sprite, intent.vervolgChips);
      return;
    }

    // fallback: reflectief luisteren
    const antwoord = FALLBACKS[fallbackIndex % FALLBACKS.length];
    fallbackIndex += 1;
    digiZegt([antwoord], '/digi/nieuwsgierig.png');
  };

  return (
    <div className="flex h-dvh flex-col pb-16">
      {/* header */}
      <header className="flex items-center gap-3 border-b border-digi-lavdark bg-white px-4 py-3">
        <img src={sprite} alt="" className="h-11 w-11 object-contain" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-base leading-tight text-digi-deep">Digi</p>
          <p className="text-xs font-semibold text-digi-ink/55">Digitaal hulpmiddel · geen echt persoon</p>
        </div>
        <button
          onClick={() => setToonInfo((v) => !v)}
          aria-expanded={toonInfo}
          aria-label="Over privacy in deze chat"
          className="rounded-full bg-digi-lav p-2.5 text-digi-purple transition-colors hover:bg-digi-lavdark focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
            <path d="M12 11v4M12 8h.01" />
          </svg>
        </button>
      </header>

      {toonInfo && (
        <div className="border-b border-digi-lavdark bg-digi-lav px-5 py-3 text-xs font-semibold leading-relaxed text-digi-ink/75">
          Deze chat slaat niets op: sluit je het scherm, dan is het gesprek weg. Digi is een
          eerste luisterend oor en verwijst je door naar echte hulp als dat nodig is.
        </div>
      )}

      {/* berichten */}
      <div className="flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
        <div className="flex flex-col gap-2.5">
          {berichten.map((m, i) =>
            m.van === 'systeem' ? (
              <p
                key={i}
                className="mx-auto max-w-xs rounded-xl bg-digi-lavdark/60 px-3 py-2 text-center text-[11px] font-semibold leading-relaxed text-digi-ink/60"
              >
                {m.tekst}
              </p>
            ) : (
              <div
                key={i}
                className={cn(
                  'max-w-[82%] animate-bubble-in rounded-3xl px-4 py-3 text-[15px] font-semibold leading-relaxed',
                  m.van === 'digi'
                    ? 'self-start rounded-bl-lg bg-white text-digi-ink shadow-sm ring-1 ring-digi-lavdark'
                    : 'self-end rounded-br-lg bg-digi-purple text-white',
                )}
              >
                {m.tekst}
              </div>
            ),
          )}
          {typing && (
            <div className="flex items-center gap-1.5 self-start rounded-3xl rounded-bl-lg bg-white px-4 py-3.5 shadow-sm ring-1 ring-digi-lavdark">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-2 w-2 animate-bounce rounded-full bg-digi-purple/60"
                  style={{ animationDelay: `${d * 150}ms` }}
                />
              ))}
            </div>
          )}
          <div ref={bodem} />
        </div>
      </div>

      {/* crisis-banner */}
      {crisis && (
        <div className="border-t-2 border-digi-pink bg-white px-4 py-3">
          <p className="text-xs font-bold leading-relaxed text-digi-ink">
            Je hoeft dit niet alleen te dragen.{' '}
            <a href="tel:08000113" className="text-digi-pink underline underline-offset-2">
              Bel 113 (0800-0113)
            </a>{' '}
            of{' '}
            <a href="tel:08000432" className="text-digi-pink underline underline-offset-2">
              de Kindertelefoon (0800-0432)
            </a>
            . Bij acuut gevaar: <a href="tel:112" className="text-digi-pink underline underline-offset-2">112</a>.
          </p>
        </div>
      )}

      {/* chips */}
      {chips.length > 0 && !typing && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => beantwoord(c)}
              className="rounded-full bg-white px-4 py-2.5 text-sm font-bold text-digi-deep shadow-sm ring-1 ring-digi-purple/40 transition-all duration-150 hover:bg-digi-lav active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-digi-purple"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* invoer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          beantwoord(invoer);
        }}
        className="flex items-center gap-2 border-t border-digi-lavdark bg-white px-4 py-3"
      >
        <label htmlFor="chat-invoer" className="sr-only">
          Typ een bericht
        </label>
        <input
          id="chat-invoer"
          type="text"
          value={invoer}
          onChange={(e) => setInvoer(e.target.value)}
          placeholder="Typ een bericht…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-full border-2 border-digi-lavdark bg-digi-lav/50 px-4 py-3 text-[15px] font-semibold text-digi-ink placeholder:text-digi-ink/40 focus:border-digi-purple focus:outline-none"
        />
        <button
          type="submit"
          disabled={!invoer.trim()}
          aria-label="Verstuur bericht"
          className="rounded-full bg-digi-purple p-3.5 text-white transition-all duration-150 enabled:hover:brightness-105 enabled:active:scale-90 disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-digi-purple"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
