import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'
import SectionButtons from './components/Widgets/SectionButtons'
import Sidebar from './components/Sidebar/Sidebar'
import { useEffect,  useState } from 'react'
import { type TTheme } from './context/themeContext'
import { useLocalStorage } from './hooks'
import Header from './components/AppHeader/Header'
import { ThemeContextProvider } from './context/themeContext'



function App() {
  //Sidebar
  const [ sidebarExpanded, setSidebarExpanded ] = useState<boolean>(window.innerWidth >= 768 ? true : false);
  const [ theme, setTheme, removeTheme ] = useLocalStorage<TTheme>('theme', 'light', { ns: 'fcc-aio-app', ttl: 2000 });
    //UseEffect: check vorherigen Werte von CSS Media Queries
    useEffect(() => {
        const body = document.body;
        if (!body) return;
        body.dataset.bsTheme = theme;
        // body immer starts als theme an
        const media: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');      
    //Listen to mediaQuerie changes, aber ls?
    //ja, wenn du themesets. useLS hook wurde sich noch einmal render

    const handleMediaChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");   
      };

    media.addEventListener('change', handleMediaChange );

    return () => {
        media.removeEventListener("change", handleMediaChange);
    }
    }, [theme]);
    
  return (
    <ThemeContextProvider value={{theme, setTheme, removeTheme}}>
      <div id='app-wrapper' className="app-wrapper">
        <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}></Sidebar>
        <div id='app-content' className="app-content">
          <Header></Header>
          <main className='main-content scroll-snap-wrapper'>
            <Outlet></Outlet>
          </main>
          <Footer></Footer>
          <SectionButtons></SectionButtons>
        </div>
      </div>
    </ThemeContextProvider>
    
        
  )
}

export default App;
