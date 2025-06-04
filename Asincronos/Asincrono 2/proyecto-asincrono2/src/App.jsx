import { useState } from 'react'
import FakeStore from "./components/FakeStore";
import RandomUser from "./components/RandomUser";
import PokeList from "./components/PokeList";
import './styles/App.css'

function App() {
  return (
    <div>
      <h1>Asíncrono 2 - Miguel Moreno Columé</h1>
      <FakeStore />
      <RandomUser />
      <PokeList />
    </div>
  );
}

export default App;