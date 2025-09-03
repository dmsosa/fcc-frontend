import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './routes/Home.tsx'
import './assets/css/styles.css'
import RandomQuotes from './routes/RandomQuotes.tsx'
import MarkdownPreviewer from './routes/MarkdownPreviewer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='/fcc-frontend'>
    <Routes >
      <Route element={<App></App>}>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/01-fcc' element={<RandomQuotes/>}></Route>
        <Route path='/02-fcc' element={<MarkdownPreviewer/>}></Route>
        <Route path='/03-fcc' element={<Home/>}></Route>
        <Route path='/04-fcc' element={<Home/>}></Route>
        <Route path='/05-fcc' element={<Home/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
