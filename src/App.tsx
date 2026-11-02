import { useCallback, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { useProfile } from '@/hooks/useProfile';
import { Chat } from '@/screens/Chat';
import { Home } from '@/screens/Home';
import { Hulp } from '@/screens/Hulp';
import { Mood } from '@/screens/Mood';
import { Onboarding } from '@/screens/Onboarding';
import { Profiel } from '@/screens/Profiel';
import { Suggesties } from '@/screens/Suggesties';
import type { Screen } from '@/types';

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [onboarded, setOnboarded] = useState(false);
  const [actiefId, setActiefId] = useState<string | null>(null);
  const { profile, opslaan, wissen } = useProfile();

  const gaNaar = useCallback((s: Screen) => setScreen(s), []);

  const startSuggestie = useCallback((id: string) => {
    setActiefId(id);
    setScreen('suggesties');
  }, []);

  const onboardingKlaar = useCallback(
    (naam: string, hobbies: string[], metAccount: boolean) => {
      if (metAccount) opslaan(naam, hobbies);
      setOnboarded(true);
      setScreen('home');
    },
    [opslaan],
  );

  const toonNav = onboarded && screen !== 'onboarding';

  return (
    <div className="min-h-dvh bg-digi-lavdark/40 sm:flex sm:items-center sm:justify-center sm:py-6">
      {/* Telefoon-frame op desktop, fullscreen op mobiel */}
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-digi-lav font-sans text-digi-ink sm:min-h-[min(860px,94dvh)] sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-8 sm:ring-digi-ink/90">
        <main className="relative flex-1">
          {screen === 'onboarding' && <Onboarding klaar={onboardingKlaar} />}
          {screen === 'home' && (
            <Home profile={profile} gaNaar={gaNaar} startSuggestie={startSuggestie} />
          )}
          {screen === 'mood' && (
            <Mood profile={profile} gaNaar={gaNaar} startSuggestie={startSuggestie} />
          )}
          {screen === 'suggesties' && (
            <Suggesties profile={profile} actiefId={actiefId} setActiefId={setActiefId} />
          )}
          {screen === 'chat' && <Chat gaNaar={gaNaar} />}
          {screen === 'hulp' && <Hulp gaNaar={gaNaar} />}
          {screen === 'profiel' && <Profiel profile={profile} opslaan={opslaan} wissen={wissen} />}
        </main>
        {toonNav && <BottomNav actief={screen} gaNaar={gaNaar} />}
      </div>
    </div>
  );
}
