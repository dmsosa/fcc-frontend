import Footer from './components/footer/Footer'
import Header from './components/Header/Header'
import { Outlet, useLocation } from 'react-router'
import SectionButtons from './components/Widgets/SectionButtons'
import Sidebar, {  type TIconLink } from './components/Sidebar/Sidebar'
import { FaHome } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { SidebarContextProvider } from './context/sidebarContext'

const icons: TIconLink[] = [
  {
    title: 'Home',
    href: '/home',
    svg: <FaHome></FaHome>
  },
  {
  title: 'Dashboard',
  href: '/dashboard',
  svg: <FaHome></FaHome>
},
{
  title: 'GitHub',
  href: 'https://github.com/dmsosa',
  svg: <FaHome></FaHome>
},
{
  title: 'CV',
  href: '/cv',
  svg: <FaHome></FaHome>
}
]

function App() {
  const location = useLocation();
  const [ expanded, setExpanded ] = useState(true);
  
  useEffect(() => {
    console.log(location);
    console.log(icons);
  }, [])
  return (
    <SidebarContextProvider value={{expanded, setExpanded}}>
      <div id='app-wrapper' className={`app-wrapper theme-dark`}>
        <Sidebar></Sidebar>
        <Header></Header>
        <main className='main-content scroll-snap-wrapper'>
          <Outlet></Outlet>
          <section id='beschreibung' className='h-100vh bg1 scroll-snap-child'></section>
          <section id='beschreibung' className='h-100vh bg2 scroll-snap-child'></section>
          <section id='beschreibung' className='h-100vh bg3 scroll-snap-child'></section>
        </main>
        <Footer></Footer>
        <SectionButtons></SectionButtons>
      </div>
    </SidebarContextProvider>
        
  )
}

export default App;
