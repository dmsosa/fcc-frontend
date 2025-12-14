import { createStrictContext } from "./createStrictContext";

export type TTheme = 'light' | 'dark' | 'omega';
export const THEME_VALUES: TTheme[] = ['light' ,'dark','omega'];
export type TThemeContext = {
    theme: TTheme;
    setTheme: (val: TTheme | ((prev: TTheme) => TTheme), setLocally?: boolean) => void;
    removeTheme: () => void;
    
};

export const [ useThemeContext, ThemeContextProvider ] = createStrictContext<TThemeContext>({ displayName: 'themeContext'});
