import Footer from './components/footer/Footer'
import Header from './components/Header/Header'
import { Outlet, useLocation } from 'react-router'
import SectionButtons from './components/Widgets/SectionButtons'
import HeroSection from './components/Hero/HeroSection'
import Sidebar, { IconList, type TIconLink } from './components/Sidebar/Sidebar'
import { FaHome } from 'react-icons/fa'
import { useEffect } from 'react'

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
  useEffect(() => {
    console.log(location);
  }, [])
  return (
    <div id='app-wrapper' className={`app-wrapper theme-dark scroll-snap`}>
      <Sidebar></Sidebar>
      <Header></Header>
      <main className='main-content'>
        <HeroSection></HeroSection>
        <IconList icons={icons}></IconList>
        <Outlet></Outlet>
        <section id='beschreibung' className='100vh bg-primary'></section>
      </main>
      <Footer></Footer>
      <SectionButtons></SectionButtons>
    </div>    
  )
}

export default App
