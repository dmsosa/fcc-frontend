import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import './assets/css/main.css';
import TodoApp from './routes/TodoApp.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import Home from './routes/Home.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='fcc-frontend'>
    <Provider store={store}>
      <Routes>
        <Route element={<App/>}>
                  <Route path='/' index element={<Home/>}></Route>
                  <Route path='/01' element={<TodoApp/>}></Route>
                  <Route path='/02'  element={<TodoApp/>}></Route>
                  <Route path='/03' element={<TodoApp/>}></Route>
                  <Route path='/04'  element={<TodoApp/>}></Route>
                  <Route path='/05'  element={<TodoApp/>}></Route>
                  <Route path='/06'  element={<TodoApp/>}></Route>
        </Route>
      </Routes>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
