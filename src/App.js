
import { NextUIProvider } from '@nextui-org/react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'tailwindcss/tailwind.css';
import './index.css';
import LoginForm from './components/userauthen';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import HomePage from './components/homepage';

function App() {


  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class">
         <Router>
            <Routes>
                <Route path='/' element={ <LoginForm /> } />
                <Route path='/homepage' element={ <HomePage /> } />
            </Routes>
        </Router>
      </NextThemesProvider>     
    </NextUIProvider>
  );
}

export default App;
