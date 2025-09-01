import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import './assets/css/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='fcc-frontend'>
      <Routes>
        <Route element={<App/>}>
        <Route path='/' index element={<div>hey</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
