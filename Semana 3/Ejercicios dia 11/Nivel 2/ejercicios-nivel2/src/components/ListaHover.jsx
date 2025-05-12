import './ListaHover.css';

function ListaHover() {
  const elementos = ['Elemento A', 'Elemento B', 'Elemento C'];

  return (
    <ul className="lista-hover">
      {elementos.map((texto, index) => (
        <li key={index} className="item-hover">
          {texto}
        </li>
      ))}
    </ul>
  );
}

export default ListaHover;
