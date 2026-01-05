import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import './assets/css/main.css';
import TodoApp from './routes/TodoApp.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import Home from './routes/Home.tsx';
import PomodoroApp from './routes/PomodoroApp.tsx';
import CalculatorApp from './routes/PomodoroApp.tsx';
import RandomQuotes from './routes/RandomQuotes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename='fcc-frontend'>
    <Provider store={store}>
      <Routes>
        <Route element={<App/>}>
                  <Route path='/' index element={<Home/>}></Route>
                  <Route path='/todos' element={<TodoApp/>}></Route>
                  <Route path='/quotes'  element={<RandomQuotes/>}></Route>
                  {/* <Route path='/quotes/:id' element={<QuotePage/>}></Route> */}
                  <Route path='/calculator'  element={<CalculatorApp/>}></Route>
                  <Route path='/pomodoro'  element={<PomodoroApp/>}></Route>
                  <Route path='/drum'  element={<TodoApp/>}></Route>
        </Route>
      </Routes>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
