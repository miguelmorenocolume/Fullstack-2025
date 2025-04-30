import './button.css'

function Button({ name, onClick }) {

    return (
        <>
        <div class="button-container"></div>
            <button className="button" onClick={onClick}>{name}</button>
        </>
    )
}

export default Button
