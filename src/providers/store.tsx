import { storeContext, stores } from "@/stores/stores";

type AppProviderProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: AppProviderProps) => {
  return (
    <storeContext.Provider value={stores}>{children}</storeContext.Provider>
  );
};
