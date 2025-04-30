import Header from './components/header'
import Main from './components/main'
import Footer from './components/footer'
import './App.css'

function App() {

  const menu = ["Inicio", "Productos", "Contacto"]
  return (
    <>
      <Header name="mi Web" menu={menu} />
      <Main message="Bienvenido a mi web" />
      <Footer content="Todos los derechos reservados" />
    </>


  )
}
export default App
