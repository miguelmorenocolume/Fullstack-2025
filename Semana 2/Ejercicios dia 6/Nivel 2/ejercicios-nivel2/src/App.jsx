import { useState } from 'react'
import './App.css'
import Button from './components/button'

function App() {

  return (
    <>
      <Button name="Haz click" onClick={() => alert('¡Botón clickeado!')} />
      <Button name="Enviar" onClick={() => console.log('Formulario enviado')} />
      <Button name="Cancelar" onClick={() => alert('Acción cancelada')} />
      <Button name="Guardar" onClick={() => console.log('Datos guardados')} />
      <Button name="Eliminar" onClick={() => confirm('¿Estás seguro de que deseas eliminar?')} />
    </>
  )
}

export default App
