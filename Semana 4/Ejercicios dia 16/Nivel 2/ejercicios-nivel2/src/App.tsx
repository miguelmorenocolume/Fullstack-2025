import FormularioNombre from "./components/FormularioNombre";
import Suma from "./components/Suma";
import ListaTareas from "./components/ListaTareas";
import UsuarioCard from "./components/UsuarioCard";
import "./App.css"

function App() {
  return <><FormularioNombre />
    <Suma a={1} b={7} />
    <ListaTareas />
    <UsuarioCard usuario={{ nombre: "Miguel", edad: 21, activo: true }} />
    <UsuarioCard usuario={{ nombre: "Jose Luis", edad: 25, activo: false }} />
  </>

    ;
}

export default App;
