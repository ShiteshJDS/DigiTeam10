import type { Activity, HelpResource, Mood, MoodId } from '@/types';

export const HOBBY_OPTIES = [
  'Gamen',
  'Muziek',
  'Sport',
  'Tekenen',
  'Lezen',
  'Buiten zijn',
  'Koken',
  'Dieren',
  'Films & series',
  'Dansen',
];

export const MOODS: Mood[] = [
  {
    id: 'blij',
    label: 'Blij',
    sprite: '/digi/blij.png',
    kleur: '#7fd9a8',
    reactie: 'Yes, dat is fijn om te horen! Laten we die energie goed gebruiken.',
    vervolg: 'Zin om die goede bui offline te vieren? Ik heb wat ideeën voor je.',
  },
  {
    id: 'nieuwsgierig',
    label: 'Nieuwsgierig',
    sprite: '/digi/nieuwsgierig.png',
    kleur: '#7fb5f5',
    reactie: 'Oeh, nieuwsgierig! Daar word ik zelf ook vrolijk van.',
    vervolg: 'Wil je iets nieuws ontdekken — weg van je scherm? Kijk maar mee.',
  },
  {
    id: 'rustig',
    label: 'Rustig',
    sprite: '/digi/rustig.png',
    kleur: '#7fd9a8',
    reactie: 'Rustig is helemaal oké. Fijn dat je even de tijd neemt.',
    vervolg: 'Wil je die rust vasthouden? Dit past misschien bij je.',
  },
  {
    id: 'opgewonden',
    label: 'Opgewonden',
    sprite: '/digi/opgewonden.png',
    kleur: '#f5c26b',
    reactie: 'Wat een energie! Lekker bezig.',
    vervolg: 'Zullen we die energie ergens in stoppen? Ik denk mee.',
  },
  {
    id: 'verdrietig',
    label: 'Verdrietig',
    sprite: '/digi/verdrietig.png',
    kleur: '#7fb5f5',
    reactie: 'Balen dat je je zo voelt. Je hoeft het niet alleen te dragen, hoor.',
    vervolg: 'Wil je erover praten met mij, of eerst iets doen dat je afleiding geeft?',
  },
  {
    id: 'boos',
    label: 'Boos',
    sprite: '/digi/boos.png',
    kleur: '#f48fb1',
    reactie: 'Boos zijn mag. Ergens boos over zijn betekent dat het je raakt.',
    vervolg: 'Wil je het kwijt in een gesprek, of de spanning eruit bewegen?',
  },
  {
    id: 'bang',
    label: 'Bang',
    sprite: '/digi/bang.png',
    kleur: '#8b7cf6',
    reactie: 'Dapper dat je dit zegt. Bang voelen is niet gek — het is een signaal.',
    vervolg: 'Laten we samen kijken wat jou nu kan helpen. Je bent niet alleen.',
  },
  {
    id: 'slaperig',
    label: 'Slaperig',
    sprite: '/digi/slaperig.png',
    kleur: '#7fb5f5',
    reactie: 'Moe? Dan is je telefoon vast ook al een tijdje aan, hè.',
    vervolg: 'Rust is belangrijk. Dit kan je helpen om echt tot rust te komen.',
  },
];

export const ACTIVITEITEN: Activity[] = [
  {
    id: 'wandeling',
    titel: 'Kleine wandeling',
    beschrijving: 'Even naar buiten, zonder telefoon in je hand. Frisse neus halen werkt echt.',
    minuten: 15,
    hobby: ['Buiten zijn', 'Dieren'],
    moods: ['verdrietig', 'boos', 'bang', 'rustig', 'slaperig'],
    icoon: 'wandelen',
  },
  {
    id: 'muziek',
    titel: 'Muziek luisteren',
    beschrijving: 'Zet je favoriete nummer op en doe even helemaal niets anders. Alleen luisteren.',
    minuten: 10,
    hobby: ['Muziek', 'Dansen'],
    moods: ['blij', 'verdrietig', 'rustig', 'opgewonden'],
    icoon: 'muziek',
  },
  {
    id: 'creatief',
    titel: 'Iets creatiefs doen',
    beschrijving: 'Teken, schrijf of bouw iets. Hoeft niks te worden — het gaat om het maken.',
    minuten: 30,
    hobby: ['Tekenen', 'Lezen'],
    moods: ['nieuwsgierig', 'verdrietig', 'rustig', 'boos'],
    icoon: 'creatief',
  },
  {
    id: 'bewegen',
    titel: 'Even lekker bewegen',
    beschrijving: 'Voetballen, skaten, dansen in je kamer — alles telt. Spanning eruit, energie erin.',
    minuten: 20,
    hobby: ['Sport', 'Dansen'],
    moods: ['boos', 'opgewonden', 'bang'],
    icoon: 'sport',
  },
  {
    id: 'praten',
    titel: 'Even praten met iemand',
    beschrijving: 'Bel of spreek iemand af die je vertrouwt. Offline contact voelt anders — beter.',
    minuten: 15,
    hobby: [],
    moods: ['verdrietig', 'bang', 'boos'],
    icoon: 'praten',
  },
  {
    id: 'game-pauze',
    titel: 'Pauze van het scherm',
    beschrijving: 'Leg je telefoon 20 minuten weg. Kijk hoe dat voelt. Ik wacht hier rustig op je.',
    minuten: 20,
    hobby: ['Gamen', 'Films & series'],
    moods: ['slaperig', 'nieuwsgierig', 'rustig'],
    icoon: 'pauze',
  },
  {
    id: 'koken',
    titel: 'Iets lekkers maken',
    beschrijving: 'Bak iets simpels of maak je favoriete snack. Lekker én je bent even bezig.',
    minuten: 25,
    hobby: ['Koken'],
    moods: ['blij', 'nieuwsgierig', 'verdrietig'],
    icoon: 'koken',
  },
  {
    id: 'lezen',
    titel: 'Boek erbij pakken',
    beschrijving: 'Een paar pagina\'s is genoeg. Even in een andere wereld zonder scrollen.',
    minuten: 20,
    hobby: ['Lezen', 'Films & series'],
    moods: ['rustig', 'slaperig', 'nieuwsgierig'],
    icoon: 'boek',
  },
  {
    id: 'huisdier',
    titel: 'Tijd met je huisdier',
    beschrijving: 'Knuffelen, spelen of samen naar buiten. Dieren zijn de beste afleiding.',
    minuten: 15,
    hobby: ['Dieren'],
    moods: ['verdrietig', 'bang', 'rustig'],
    icoon: 'dier',
  },
];

export const HULP: HelpResource[] = [
  {
    naam: 'De Kindertelefoon',
    omschrijving: 'Voor alles waar je mee zit. Gratis, anoniem en zonder wachttijd aan de lijn.',
    detail: 'Elke dag bereikbaar van 11:00 tot 21:00. Je kunt ook chatten.',
    actie: { label: 'Bel 0800-0432', href: 'tel:08000432' },
    kleur: '#7fd9a8',
  },
  {
    naam: '113 Zelfmoordpreventie',
    omschrijving: 'Als je gedachten hebt over zelfdoding, of je maakt je zorgen om iemand.',
    detail: '24/7 bereikbaar, anoniem en gratis. Praten helpt.',
    actie: { label: 'Bel 0800-0113', href: 'tel:08000113' },
    kleur: '#f48fb1',
  },
  {
    naam: 'De Luisterlijn',
    omschrijving: 'Voor een luisterend oor, dag en nacht. Over grote en kleine dingen.',
    detail: '24/7 bereikbaar via telefoon, chat en e-mail.',
    actie: { label: 'Bel 0900-0767', href: 'tel:09000767' },
    kleur: '#7fb5f5',
  },
  {
    naam: 'Iemand in je omgeving',
    omschrijving: 'Een ouder, mentor, jongerenwerker of de huisarts. Jij kiest wie.',
    detail: 'Digi kan je helpen om het gesprek te oefenen voordat je het voert.',
    actie: { label: 'Oefen met Digi', href: '#chat' },
    kleur: '#f5c26b',
  },
  {
    naam: '112 — acuut gevaar',
    omschrijving: 'Bij direct gevaar voor jou of iemand anders.',
    detail: 'Bel altijd 112 als er acute nood is.',
    actie: { label: 'Bel 112', href: 'tel:112' },
    kleur: '#f48fb1',
  },
];

export function moodById(id: MoodId): Mood {
  return MOODS.find((m) => m.id === id) ?? MOODS[0];
}

export function suggestiesVoor(mood: MoodId, hobbies: string[], aantal = 3): Activity[] {
  const score = (a: Activity) =>
    (a.moods.includes(mood) ? 2 : 0) + a.hobby.filter((h) => hobbies.includes(h)).length;
  return [...ACTIVITEITEN]
    .sort((a, b) => score(b) - score(a))
    .slice(0, aantal);
}

/* ------------------------------ Chat-script ------------------------------ */

export interface ChatIntent {
  match: string[];
  antwoorden: string[];
  sprite?: string;
  ernstig?: boolean;
  vervolgChips?: string[];
}

export const CRISIS_WORDS = [
  'zelfmoord',
  'zelfdoding',
  'dood willen',
  'doodwil',
  'niet meer leven',
  'geen zin meer in leven',
  'eind aan maken',
  'van het leven',
  'zelfbeschadiging',
  'me pijn doen',
  'mezelf pijn',
];

export const INTENTS: ChatIntent[] = [
  {
    match: ['pest', 'gepest', 'uitgesloten', 'gegroepst', 'groepje niet'],
    antwoorden: [
      'Dat klinkt echt niet fijn. Pesten — online of op school — is nooit jouw schuld.',
      'Wil je dat ik alleen luister, of zullen we samen kijken wat je kunt doen?',
    ],
    sprite: '/digi/verdrietig.png',
    vervolgChips: ['Gewoon luisteren', 'Samen kijken wat ik kan doen'],
  },
  {
    match: ['alleen', 'eenzaam', 'niemand', 'vrienden heb ik niet', 'geen vrienden'],
    antwoorden: [
      'Fijn dat je dit zegt. Je alleen voelen is zwaarder dan veel mensen denken.',
      'Ik ben er om te luisteren. En eerlijk: praten met een echt persoon helpt vaak nóg beter. Denk je dat er iemand is die je vertrouwt?',
    ],
    sprite: '/digi/verdrietig.png',
    vervolgChips: ['Ja, er is iemand', 'Nee, niet echt'],
  },
  {
    match: ['stress', 'school', 'cijfer', 'examen', 'toets', 'huiswerk', 'werkstuk'],
    antwoorden: [
      'School kan best veel druk geven. Wat zit er het meest dwars — de hoeveelheid, of de angst dat het niet goed genoeg is?',
      'Klein beginnen helpt: één taak, 20 minuten, daarna pauze. Zal ik een pauze-idee voor je zoeken?',
    ],
    sprite: '/digi/nieuwsgierig.png',
    vervolgChips: ['Ja, pauze-idee', 'Vertel meer'],
  },
  {
    match: ['slaap', 'slapen', 'moe', 'uitgeput', 'wakker'],
    antwoorden: [
      'Wakker liggen van je telefoon herkennen veel jongeren. Je bent niet de enige.',
      'Tip die echt werkt: leg je telefoon een half uur voor het slapen buiten je kamer. Zullen we dat vanavond proberen?',
    ],
    sprite: '/digi/slaperig.png',
    vervolgChips: ['Oké, ik probeer het', 'Dat lukt niet'],
  },
  {
    match: ['tiktok', 'scrollen', 'telefoon', 'scherm', 'social media', 'instagram', 'snapchat', 'fomo', 'missen'],
    antwoorden: [
      'Die apps zijn gemaakt om je vast te houden — dat je er moeilijk mee stopt is dus geen zwakte.',
      'Kleine stappen werken het best. Wat dacht je van een schermvrij momentje vandaag? Ik heb leuke offline ideeën.',
    ],
    sprite: '/digi/nieuwsgierig.png',
    vervolgChips: ['Laat maar zien', 'Liever eerst praten'],
  },
  {
    match: ['ruzie', 'vriend', 'vriendin', 'stel', 'verliefd'],
    antwoorden: [
      'Ruzie met iemand die dichtbij staat doet veel met je. Wil je vertellen wat er gebeurde?',
      'Onthoud: ik ben een digitaal maatje — ik luister graag, maar een echt gesprek met diegene is vaak de oplossing.',
    ],
    sprite: '/digi/rustig.png',
  },
  {
    match: ['bang', 'angst', 'eng', 'paniek'],
    antwoorden: [
      'Dapper dat je dit deelt. Bang zijn is een signaal dat iets belangrijk voor je is.',
      'Adem even met me mee: 4 tellen in, 4 tellen uit. Wil je daarna vertellen waar je bang voor bent?',
    ],
    sprite: '/digi/bang.png',
    vervolgChips: ['Oké, even ademhalen', 'Ik wil erover vertellen'],
  },
  {
    match: ['verdriet', 'huilen', 'down', 'depres', 'somber', 'treurig'],
    antwoorden: [
      'Je mag verdrietig zijn. Gevoelens zijn er om gevoeld te worden, ook de nare.',
      'Als dit gevoel vaker terugkomt of heel zwaar is, dan is het slim om het met iemand te bespreken. De Kindertelefoon (0800-0432) is gratis en anoniem — ook voor dit soort dingen.',
    ],
    sprite: '/digi/verdrietig.png',
    vervolgChips: ['Vertel meer over hulp', 'Ik wil even iets leuks doen'],
  },
  {
    match: ['boos', 'woedend', 'gefrustreerd', 'irriteer', 'irritatie'],
    antwoorden: [
      'Boos zijn mag helemaal. Het zegt dat iets je raakt.',
      'Bewegen helpt om spanning kwijt te raken. Zal ik iets voor je zoeken, of wil je eerst je verhaal kwijt?',
    ],
    sprite: '/digi/boos.png',
    vervolgChips: ['Zoek iets om te doen', 'Ik wil praten'],
  },
];

export const OPENING = {
  tekst:
    'Hoi! Ik ben Digi — jouw digitale maatje. Ik ben geen echt persoon, maar ik luister wél echt. Waar zou je over willen praten?',
  chips: ['Ik zit ergens mee', 'Gewoon even kletsen', 'Ik weet het niet'],
};

export const FALLBACKS = [
  'Ik hoor je. Vertel er gerust meer over — ik luister.',
  'Bedankt dat je dit deelt. Hoe voelt het voor je nu je het opschrijft?',
  'Interessant. En wat zou je het liefst willen veranderen aan die situatie?',
  'Dat kan ik me voorstellen. Wil je dat ik alleen luister, of meedenk over een volgende stap?',
];

export const CRISIS_ANTWOORD = {
  tekst:
    'Het klinkt alsof je het heel zwaar hebt. Dit is te belangrijk om alleen met mij te bespreken — ik ben een digitaal hulpmiddel en kan je niet de hulp geven die je verdient.',
  vervolg:
    'Bel of chat alsjeblieft met 113 Zelfmoordpreventie (0800-0113, 24/7) of de Kindertelefoon (0800-0432). Daar zitten mensen die je écht kunnen helpen. Bij acuut gevaar: bel 112.',
};

export const TRANSPARANTIE_HERINNERING =
  'Kleine reminder: ik ben Digi, een digitaal hulpmiddel — geen echt persoon. Alles wat je hier typt blijft op jouw telefoon.';
