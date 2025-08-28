import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/Home.tsx'
import './assets/css/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/freecodecamp-frontend-challenges'>
    <Routes >
      <Route element={<App></App>}>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/01-fcc' element={<Home/>}></Route>
        <Route path='/02-fcc' element={<Home/>}></Route>
        <Route path='/03-fcc' element={<Home/>}></Route>
        <Route path='/04-fcc' element={<Home/>}></Route>
        <Route path='/05-fcc' element={<Home/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
