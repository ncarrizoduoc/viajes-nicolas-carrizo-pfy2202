function ErrorCarga({
    textoPrimario,
    textoSecundario,
    className = "",
}) {
    return (
        <div
            className={`mx-auto w-full max-w-xl border-l-4 border-orange-500 bg-orange-100 p-4 text-orange-700 ${className}`}
            role="alert"
        >
            <p className="font-bold">{textoPrimario}</p>
            <p>{textoSecundario}</p>
        </div>
    )
}

export default ErrorCarga