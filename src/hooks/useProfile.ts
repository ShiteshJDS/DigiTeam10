import { useCallback, useEffect, useState } from 'react';
import type { Profile } from '@/types';

const KEY = 'digi-profiel';

const LEEG: Profile = { naam: '', hobbies: [], heeftAccount: false };

function lees(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return LEEG;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      naam: typeof parsed.naam === 'string' ? parsed.naam : '',
      hobbies: Array.isArray(parsed.hobbies) ? parsed.hobbies : [],
      heeftAccount: Boolean(parsed.heeftAccount),
    };
  } catch {
    return LEEG;
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(lees);

  useEffect(() => {
    if (profile.heeftAccount) {
      localStorage.setItem(KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(KEY);
    }
  }, [profile]);

  const opslaan = useCallback((naam: string, hobbies: string[]) => {
    setProfile({ naam: naam.trim(), hobbies, heeftAccount: true });
  }, []);

  const wissen = useCallback(() => {
    localStorage.removeItem(KEY);
    setProfile(LEEG);
  }, []);

  return { profile, opslaan: opslaan, wissen };
}
