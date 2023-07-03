import { useContext, createContext } from "react";

interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  toggleTheme: () => console.warn("no theme provider"),
} as IThemeContext);

export const useTheme = () => useContext<IThemeContext>(ThemeContext);
