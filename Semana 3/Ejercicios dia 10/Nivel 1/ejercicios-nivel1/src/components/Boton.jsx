import { useState } from 'react'

function Boton() {
    const [isOn, setIsOn] = useState(false)

    return (
        <>
            <div className="card">
                <button onClick={() => setIsOn((prevState) => !prevState)}>
                    {isOn ? "Encendido" : "Apagado"}
                </button>
            </div>
        </>
    )
}

export default Boton
