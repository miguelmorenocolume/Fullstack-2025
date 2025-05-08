import './App.css'
import Botón from './components/Botón'
import Tarea from './components/Tareas'
import Avatar from './components/Avatar'
function App() {


  return (
    <>
   <Botón texto="Botón 1" onClick={() => alert('Botón 1')} />
    <Tarea texto="Tarea 1" completada={false} />
    <Tarea texto="Tarea 2" completada={true} />
    <Tarea texto="Tarea 3" completada={false} />
    <Tarea texto="Tarea 4" completada={true} />
    <Tarea texto="Tarea 5" completada={true} />
    <Avatar url="https://ethic.es/wp-content/uploads/2023/03/imagen.jpg" />
    </>
  )
}

export default App
