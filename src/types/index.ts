export type Screen =
  | 'onboarding'
  | 'home'
  | 'mood'
  | 'suggesties'
  | 'chat'
  | 'hulp'
  | 'profiel';

export type MoodId =
  | 'blij'
  | 'nieuwsgierig'
  | 'rustig'
  | 'opgewonden'
  | 'verdrietig'
  | 'boos'
  | 'bang'
  | 'slaperig';

export interface Mood {
  id: MoodId;
  label: string;
  sprite: string;
  kleur: string;
  reactie: string;
  vervolg: string;
}

export interface Activity {
  id: string;
  titel: string;
  beschrijving: string;
  minuten: number;
  hobby: string[];
  moods: MoodId[];
  icoon: string;
}

export interface HelpResource {
  naam: string;
  omschrijving: string;
  detail: string;
  actie: { label: string; href: string };
  kleur: string;
}

export interface ChatMessage {
  van: 'digi' | 'jij' | 'systeem';
  tekst: string;
}

export interface Profile {
  naam: string;
  hobbies: string[];
  heeftAccount: boolean;
}
