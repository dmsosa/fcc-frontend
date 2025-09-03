import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'

function App() {
  return (
    <div id='app-wrapper' className={`app-wrapper theme-dark`}>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default App
