import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Outlet } from 'react-router'
import { createStrictContext } from './context/createStrictContext'
import { useEffect, useState, type SetStateAction } from 'react';
import CookieHelper from './helpers/cookies';

export type TTheme = 'light' | 'dark';
export type TThemeContext = {
  theme: TTheme;
  setTheme: React.Dispatch<SetStateAction<TTheme>>;
}
export const [ useThemeContext, ThemeContextProvider ] = createStrictContext<TThemeContext>();

import SectionButtons from './components/Widgets/SectionButtons'
import HeroSection from './components/Hero/HeroSection'

function App() {
  const isDarkMode = window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
  const [ theme, setTheme ] = useState<TTheme>(isDarkMode ? 'dark' : 'dark');
  useEffect(() => {
    const preferredTheme = CookieHelper.get('theme') as TTheme | null;
    if (preferredTheme) {
      setTheme(preferredTheme);
    };
    document.body.classList.add(`theme-${theme}`);
    return () => {
      document.body.classList.remove(`theme-${theme}`);
    }
  }, [theme])
  return (
    <ThemeContextProvider value={{ theme, setTheme }}>
    <div id='app-wrapper' className='app-wrapper'>
      <Header></Header>
      <main>
        <HeroSection></HeroSection>
        <Outlet></Outlet>
        <section id='beschreibung' className='100vh bg-primary'></section>
      </main>
      <Footer></Footer>
      <SectionButtons></SectionButtons>
    </div>
    </ThemeContextProvider>
  )
}

export default App;
