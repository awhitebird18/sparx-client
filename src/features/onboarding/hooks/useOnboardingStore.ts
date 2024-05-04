import { createContext, useContext } from 'react';
import { OnboardingStore } from '../stores/onboardingStore';

export const OnboardingStoreContext = createContext<OnboardingStore | undefined>(undefined);

export const useOnboardingStore = (): OnboardingStore => {
  const store = useContext(OnboardingStoreContext);
  if (!store) throw new Error('useOnboardingStore must be used within a OnboardingStoreProvider');
  return store;
};
