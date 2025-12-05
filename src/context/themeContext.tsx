import { createStrictContext } from "./createStrictContext";

export type TTheme = 'light' | 'dark' | 'default';
export const THEME_VALUES: TTheme[] = ['light' ,'dark','default'];
export type TThemeContext = {
    theme: TTheme;
    setThemeToContextAndDocument: (value: TTheme) => void;
    removeTheme: () => void;
    
};

export const [ useThemeContext, ThemeContextProvider ] = createStrictContext<TThemeContext>({ displayName: 'themeContext'});
