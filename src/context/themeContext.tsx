
import { useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks";
import { THEME_VALUES, ThemeCtxProvider, type TTheme } from "./createThemeContext";


export function ThemeReadyContextProvider({ children } : { children: ReactNode | ReactNode[] }) {
    //Use LocalStorage Hook, vorherigen Werte von Local Storage zuruckgibt, fall es schon existiert.
    const [ theme, setTheme, removeTheme ] = useLocalStorage<TTheme>('theme', 'light', { ns: 'fcc-aio-app', ttl: 1 });

    const setThemeToContextAndDocument = (value: TTheme) => {
        const root = document.documentElement;
        if (!root) return;
        // Tailwind needs the class "dark" on html

        //1. Remove any prev value from ClassList
        //2. Set new value
        for (const themeValue of THEME_VALUES ) {
            root.classList.remove(themeValue);
        }
        root.classList.add(value);
        setTheme(value);
    }

    //UseEffect: check vorherigen Werte von CSS Media Queries
    useEffect(() => {
        
        let media = window.matchMedia(`(prefers-color-scheme: )`);
        for (const themeValue of THEME_VALUES ) {
            media = window.matchMedia(`(prefers-color-scheme: ${themeValue})`);

            if (media.matches) {
                setThemeToContextAndDocument(themeValue);
            }
        }

    //Listen to mediaQuerie changes

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    media.addEventListener('change', handleMediaChange );

    return () => {
        media.removeEventListener("change", handleMediaChange);
    }
    }, [theme]);
    return (
        <ThemeCtxProvider value={{theme, setThemeToContextAndDocument, removeTheme}}>
            {children}
        </ThemeCtxProvider>)
}