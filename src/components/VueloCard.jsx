import formatoMoneda from "../util/formatoMoneda";

function VueloCard({ vuelo }) {
    const { nombre, precio, cupos } = vuelo
    return (
        <>
            <div className="flex flex-col gap-2 rounded-xl bg-gray-100 p-4 border-2 border-gray-800">
                <p className="font-semibold">{nombre}</p>
                <p>{formatoMoneda.format(precio)}</p>
                <p className="text-gray-800 font-light">Asientos disponibles: {cupos}</p>
                <button className="w-fit rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-black">
                    Comprar pasaje
                </button>
            </div>
        </>
    )
}

export default VueloCard;