import './App.css';
import { ThemeProvider } from './components/context/ThemeProvider';
import { LanguageProvider } from './components/context/LanguageProvider';
import { AuthProvider } from './components/context/AuthProvider';
import { UserProvider } from './components/context/UserProvider';
import { CounterProvider } from './components/context/CounterProvider';

import CambiarTema from './components/CambiarTema';
import CambiarIdioma from './components/CambiarIdioma';
import BotonAuth from './components/BotonAuth';
import MostrarUsuario from './components/MostrarUsuario';
import Contador from './components/Contador';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <UserProvider>
              <CounterProvider>
                <CambiarTema />
                <CambiarIdioma />
                <BotonAuth />
                <MostrarUsuario />
                <Contador />
              </CounterProvider>
            </UserProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
};

export default App;