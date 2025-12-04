import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'
import SectionButtons from './components/Widgets/SectionButtons'
import Sidebar from './components/Sidebar/Sidebar'
import { useRef, useState } from 'react'
import { SidebarContextProvider } from './context/sidebarContext'
import { ThemeReadyContextProvider } from './context/themeContext'
import { useLocalStorage } from './hooks'
import Header from './components/AppHeader/Header'



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

    //   //Resize logic
    // useEffect(() => {
    //   if (!isRezising) return;
    //   const appWrapper = appWrapperRef.current;
    //   if (!appWrapper) return;
    //   if (!expanded) {
    //     setWidthLS(96);
    //     return;
    //   } 
    //   const onMove = (e: MouseEvent) => {
    //     const newWidth = e.clientX;
    //     const clampedWidth = Math.min(350, Math.max(96, newWidth));
    //     console.log(clampedWidth, appWrapper)
    //     appWrapper.style.setProperty('--sidebar-width', `${clampedWidth}px`);
    //     appWrapper.style.setProperty('--main-content-width', `calc(100% - ${clampedWidth}px)`);
    //     };
    //     const resizeUp = () => {
    //         window.removeEventListener('mousemove', resizeMove);
    //         window.removeEventListener('mouseup', resizeUp);
    //     }
    //     window.addEventListener('mousemove', resizeMove);
    //     window.addEventListener('mouseup', resizeUp);
    //     return () => {
    //       window.removeEventListener('mousemove', onMove);
    //       window.removeEventListener('mouseup', onMouseUp);
    //     }
    // }, [expanded, isRezising])


  
  return (
    <ThemeReadyContextProvider>
      <SidebarContextProvider value={{ isResizing, setIsResizing, widthCheckedInLS, setWidthLS, removeWidthLS, expanded, setExpanded, initialWidth, minWidth, maxWidth, storageKey, appWrapperRef }}>
      <div id='app-wrapper' className={`app-wrapper theme-dark`} ref={appWrapperRef}>
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
    </ThemeReadyContextProvider>
    
        
  )
}

export default App;
