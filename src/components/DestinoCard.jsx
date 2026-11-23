import { Link } from 'react-router'
import precioMinimoVuelo from '../util/precioMinimoVuelo.js'
import formatoMoneda from "../util/formatoMoneda";
import precioMinimoHotel from '../util/precioMinimoHotel.js';

function DestinoCard({ destino }) {
    const { ciudad, pais, img, actividades, vuelos, hoteles } = destino
    const precioMinVuelo = precioMinimoVuelo(vuelos)
    const precioMinHotel = precioMinimoHotel(hoteles)

    return (
        <>
            <div className="flex h-full w-full max-w-sm flex-col overflow-hidden rounded-lg border-2 border-gray-300 shadow-lg">
                <img
                    className="h-[200px] w-full object-cover"
                    src={img}
                    alt={`Imagen de ${ciudad}, ${pais}`}
                />
                <div className="flex flex-1 flex-col px-6 pb-4">
                    <div className="py-4 text-start">
                        <p className="font-semibold">{pais}</p>
                        <div className="font-bold text-3xl mb-2">{ciudad}</div>
                        <p className="text-start text-gray-700 mb-2">
                            {precioMinVuelo !== null
                                ? `Vuelos desde: ${formatoMoneda.format(precioMinVuelo)}`
                                : "No hay vuelos disponibles"}
                        </p>
                        <p className="text-start text-gray-700">
                            {precioMinHotel !== null
                                ? `Alojamiento desde: ${formatoMoneda.format(precioMinHotel)}/noche`
                                : "No hay hoteles disponibles"}
                        </p>
                    </div>
                    <div className="mt-auto flex flex-col gap-3 pt-4 items-start">
                        <div className="w-full text-left">
                            {actividades.map((act, index) => (
                                <span
                                    key={`${ciudad}-${act}-${index}`}
                                    className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                                >
                                    {act}
                                </span>
                            ))}
                        </div>
                    </div>
                    <Link to={`/destinos/${destino.id}`} className="mt-3 block w-fit rounded bg-gray-700 px-4 py-2 text-center font-bold text-white hover:bg-black">
                        Más información
                    </Link>
                </div>
            </div>
        </>
    )

}

export default DestinoCard