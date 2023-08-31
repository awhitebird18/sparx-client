import { storeContext, stores } from '@/stores/RootStore';

type AppProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: AppProviderProps) => {
  return <storeContext.Provider value={stores}>{children}</storeContext.Provider>;
};
