const Button = ({ name, onClick, style }) => {
    return (
        <button
            onClick={onClick}
            className={style}
        >
            {name}
        </button>
    );
}

export default Button