import { Outlet } from "react-router"
import Footer from "./components/Footer"
import Header from "./components/Header/Header"

function App() {

  return (
    <div id="app-wrapper" className="app-wrapper theme-dark">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
