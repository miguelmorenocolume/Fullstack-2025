import './App.css'
import Tarjeta from './components/Tarjeta'
import Contenedor from './components/Contenedor'
import Alerta from './components/Alerta'

function App() {

  return (
    <Contenedor>
      <Tarjeta>
        <h2>Hola</h2>
        <p>Este es el contenido de la tarjeta.</p>
        <Alerta>¡Atención! Este es un mensaje de alerta.</Alerta>
      </Tarjeta>
    </Contenedor>
  );
};

export default App
