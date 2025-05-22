import './App.css'
import { UserProvider } from './components/context/UserProvider';
import MostrarUsuario from './components/MostrarUsuario';
import { CounterProvider } from './components/context/CounterProvider';
import Contador from './components/Contador';
import { ThemeProvider } from './components/context/ThemeProvider';
import CambiarTema from './components/CambiarTema';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <CounterProvider>
            <CambiarTema />
            <MostrarUsuario />
            <Contador />
          </CounterProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
};

export default App;