import React from 'react';
import { observer } from 'mobx-react-lite';
import { OnboardingStore } from '../stores/onboardingStore';
import { OnboardingStoreContext } from '../hooks/useOnboardingStore';

type Props = {
  children: React.ReactNode;
};

export const OnboardingStoreProvider: React.FC<Props> = observer(({ children }) => {
  const assistantStore = new OnboardingStore();

  return (
    <OnboardingStoreContext.Provider value={assistantStore}>
      {children}
    </OnboardingStoreContext.Provider>
  );
});
