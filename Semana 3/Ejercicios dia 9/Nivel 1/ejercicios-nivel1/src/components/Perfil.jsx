import './Perfil.css'

function Perfil({ nombre, edad }) {



    return (
        <div class="container">
            <h1>Hola {nombre}</h1>
            <h2>Tienes {edad} años</h2>
        </div>
    )
}

export default Perfil
