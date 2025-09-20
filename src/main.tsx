import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import './assets/css/styles.css';
import TodoApp from './routes/TodoApp.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='fcc-frontend'>
      <Routes>
        <Route element={<App/>}>
        <Route path='/' index element={<div>hey</div>}></Route>
        <Route path='/01' element={<div>hey</div>}></Route>
        <Route path='/02'  element={<div>hey</div>}></Route>
        <Route path='/03' element={<div>hey</div>}></Route>
        <Route path='/04'  element={<div>hey</div>}></Route>
        <Route path='/05'  element={<div>hey</div>}></Route>
        <Route path='/06'  element={<TodoApp/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
