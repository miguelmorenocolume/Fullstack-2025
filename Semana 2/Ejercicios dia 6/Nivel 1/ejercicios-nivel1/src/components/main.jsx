import './main.css'
import Calculadora from './calculadora'
import Sections from './sections'

function Main({ message }) {
    return (
        <>
            <div class="main">
                <h1>{message}</h1>


            <Calculadora />
            <Sections />
            </div>
        </>
    )
}

export default Main
