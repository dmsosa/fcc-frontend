import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'
import SectionButtons from './components/Widgets/SectionButtons'
import Sidebar from './components/Sidebar/Sidebar'
import { useEffect, useRef, useState } from 'react'
import { SidebarContextProvider } from './context/sidebarContext'
import { THEME_VALUES, type TTheme } from './context/themeContext'
import { useLocalStorage } from './hooks'
import Header from './components/AppHeader/Header'
import { ThemeContextProvider } from './context/themeContext'



function App() {
  //Sidebar Constants
  // const [ width, setWidth ] = useState<number>(250);
  const [ expanded, setExpanded ] = useState<boolean>(true);
  const [ isResizing, setIsResizing ] = useState<boolean>(false);
  const storageKey = "sidebarWidth";
  const initialWidth = 280;
  const minWidth = 96;
  const maxWidth = 680;
  const appWrapperRef = useRef(null);

  const [ widthCheckedInLS , setWidthLS, removeWidthLS ] = useLocalStorage(storageKey, initialWidth);
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
    <ThemeContextProvider value={{theme, setThemeToContextAndDocument, removeTheme}}>
      <SidebarContextProvider value={{ isResizing, setIsResizing, widthCheckedInLS, setWidthLS, removeWidthLS, expanded, setExpanded, initialWidth, minWidth, maxWidth, storageKey, appWrapperRef }}>
      <div id='app-wrapper' className={`app-wrapper theme-${theme}`} ref={appWrapperRef}>
        <Sidebar></Sidebar>
        <div id='main-content' className="main-content">
          <Header></Header>
          <main className='main-content-inner scroll-snap-wrapper'>
            <Outlet></Outlet>
            <section id='beschreibung' className='h-100vh bg1 scroll-snap-child'></section>
            <section id='beschreibung' className='h-100vh bg2 scroll-snap-child'></section>
            <section id='beschreibung' className='h-100vh bg3 scroll-snap-child'></section>
          </main>
          <Footer></Footer>
          <SectionButtons></SectionButtons>
        </div>
      </div>
    </SidebarContextProvider>
    </ThemeContextProvider>
    
        
  )
}

export default App;
