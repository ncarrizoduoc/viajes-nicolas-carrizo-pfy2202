import formatoMoneda from "../util/formatoMoneda"

function HotelCard({ hotel }) {
    const {nombre, img, precio, disponibilidad, descripcion} = hotel

    return (
        <>
            <div className="max-w-sm w-full lg:max-w-full lg:flex border-2 border-gray-400 rounded-lg">
                <img
                    src={img}
                    alt={`Imagen de hotel ${nombre}`}
                    className="h-48 w-full flex-none object-cover lg:h-auto lg:w-48"
                />
                <div className="p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            Disponibilidad de reservas: {disponibilidad}
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">{nombre}</div>
                        <p className="text-gray-700 text-base">{descripcion}</p>
                        
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <p className="font-bold text-lg">Precio: {formatoMoneda.format(precio)} / noche</p>
                        <button className="w-fit rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-black">
                            Reservar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelCard