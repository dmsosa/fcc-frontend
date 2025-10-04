import Footer from './components/footer/Footer'
import Header from './components/Header/Header'
import { Outlet } from 'react-router'
import SectionButtons from './components/Widgets/SectionButtons'
import HeroSection from './components/Hero/HeroSection'

function App() {
  return (
    <>
    <Header></Header>
    <div id='app-wrapper' className={`app-wrapper theme-dark scroll-snap`}>
      <main className=''>
        <HeroSection></HeroSection>
        <Outlet></Outlet>
        <section id='beschreibung' className='100vh bg-primary'></section>
      </main>
      <Footer></Footer>
      <SectionButtons></SectionButtons>
    </div>
    </>
    
  )
}

export default App
