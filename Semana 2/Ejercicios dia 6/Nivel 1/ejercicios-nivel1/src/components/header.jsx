import './header.css'

function Header({ name, menu }) {
    return (
        <header>
            <h2>{name}</h2>
            <nav>
                <ul>
                    {menu.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </nav>
        </header>

    )
}

export default Header
