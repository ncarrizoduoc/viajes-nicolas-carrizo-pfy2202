import { Link, useParams, useSearchParams } from "react-router";
import { OBTENER_DESTINO } from "../graphql/operaciones";
import { useQuery } from "@apollo/client/react";
import Spinner from "../components/Spinner";
import BotonLink from "../components/BotonLink";
import ErrorCarga from "../components/ErrorCarga";
import Carrusel from "../components/Carrusel";
import VueloCard from "../components/VueloCard";
import HotelCard from "../components/HotelCard";

function DestinoDetalle() {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const simularError = searchParams.get("error") === "graphql";

    const { data, loading, error, refetch } = useQuery(OBTENER_DESTINO, {
        variables: { id, simularError }
    })

    const destino = data?.destino;

    return (
        <section className="flex flex-col gap-6 p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
                <BotonLink texto="Volver a Destinos" link="/destinos" />
                <button
                    onClick={() => {
                        setSearchParams({});
                        refetch({ id, simularError: false });
                    }}
                    disabled={loading}
                    className="inline-flex items-center rounded bg-gray-200 px-3 py-2 text-gray-900 font-semibold hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                    Volver a cargar
                </button>
                <button
                    onClick={() => setSearchParams({ error: "graphql" })}
                    disabled={loading}
                    className="inline-flex items-center rounded bg-gray-200 px-3 py-2 text-gray-900 font-semibold hover:bg-red-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                    Simular error GraphQL
                </button>
            </div>

            {loading && (
                <div role="status" className="flex flex-col items-center gap-3 text-center">
                    <p>Cargando datos del destino...</p>
                    <Spinner />
                </div>
            )}

            {!loading && error && (
                <ErrorCarga
                    textoPrimario={"Error al cargar destino. Intente más tarde"}
                    textoSecundario={`Causa del error: ${error.message}`}
                />
            )}

            {!loading && !error && !destino && (
                <ErrorCarga
                    textoPrimario={"Error al cargar destino. Intente más tarde"}
                    textoSecundario={`Causa del error: No existe un destino con el ID ingresado`}
                />
            )}

            {!loading && !error && destino && (
                <div className="mx-auto w-full max-w-5xl px-6">
                    <h1>Viaja a {destino.ciudad}, {destino.pais}</h1>
                    <Carrusel
                        imagenes={destino.imgCarrusel}
                        alt={`Hotel en ${destino.ciudad}`}
                    />
                    <div className="flex flex-col text-start my-6 gap-4">
                        <div>
                            <h2>Opciones de viaje</h2>
                            <p>Elige tu forma de viajar preferida, al mejor precio</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {destino.vuelos.map((vuelo) => (
                                <VueloCard key={vuelo.nombre} vuelo={vuelo} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col text-start my-6 gap-4">
                        <div>
                            <h2>Alojamiento</h2>
                            <p>Explora nuestras opciones de alojamiento en {destino.ciudad}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {destino.hoteles.map((hotel) => (
                                <HotelCard key={hotel.nombre} hotel={hotel} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default DestinoDetalle;