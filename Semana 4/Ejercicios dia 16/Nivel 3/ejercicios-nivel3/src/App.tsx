import ListaUsuarios from "./components/ListaUsuarios";
import BotonToggle from "./components/BotonToggle";
import "./App.css"

const usuarios = [
  { id: 1, nombre: "Ana", edad: 25 },
  { id: 2, nombre: "Juan", edad: 30 },
  { id: 3, nombre: "Lucía", edad: 22 },
];

function App() {
  return <> 
  <ListaUsuarios usuarios={usuarios} />
  <BotonToggle />
  </>;
}

export default App;