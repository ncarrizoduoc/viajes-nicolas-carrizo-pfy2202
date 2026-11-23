import { Link } from "react-router"
import { useState, useEffect, useCallback, useRef } from 'react'
import DestinoCard from "../components/DestinoCard"
import ErrorCarga from "../components/ErrorCarga"
import Spinner from "../components/Spinner";

async function getDestinos(tipoError = "", signal) {
    const endpoint = tipoError
        ? `/api/destinos?error=${encodeURIComponent(tipoError)}`
        : "/api/destinos";

    try {
        const respuesta = await fetch(endpoint, { signal });

        if (!respuesta.ok) {
            if (respuesta.status === 404) {
                throw new Error("No se han encontrado destinos");
            }

            if (respuesta.status === 500) {
                throw new Error("El servidor no responde");
            }

            throw new Error("Error desconocido");
        }

        return await respuesta.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error("Error al cargar destinos, intente más tarde.", {
                cause: error,
            });
        }

        throw error;
    }
}


function Destinos() {

    const [destinos, setDestinos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const controllerRef = useRef(null);

    const cargarDestinos = useCallback((tipoError = "") => {
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        setCargando(true);
        setError("");

        getDestinos(tipoError, controller.signal)
            .then((data) => {
                if (controllerRef.current === controller) {
                    setDestinos(data);
                }
            })
            .catch((error) => {
                if (
                    controllerRef.current === controller &&
                    error.name !== "AbortError"
                ) {
                    setError(error.message);
                }
            })
            .finally(() => {
                if (controllerRef.current === controller) {
                    setCargando(false);
                }
            });
    }, []);

    useEffect(() => {
        cargarDestinos();

        return () => {
            controllerRef.current?.abort();
            controllerRef.current = null;
        };
    }, [cargarDestinos]);

    return (
        <>
            <section className="flex flex-col gap-6 p-6">
                <div className="flex flex-col items-center">
                    <h1>Nuestros Destinos</h1>
                    <p>Explora nuestro catálogo de viajes. Haz clic en "Más información" para consultar vuelos y hoteles.</p>

                </div>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                    <Link to={"/"} className="inline-flex items-center rounded bg-gray-800 px-3 py-2 text-white font-semibold hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                        Volver al inicio
                    </Link>
                    <button
                        onClick={() => cargarDestinos()}
                        disabled={cargando}
                        className="inline-flex items-center rounded bg-gray-200 px-3 py-2 text-gray-900 font-semibold hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                        Recargar destinos
                    </button>
                    <button
                        onClick={() => cargarDestinos("404")}
                        disabled={cargando}
                        className="inline-flex items-center rounded bg-gray-200 px-3 py-2 text-gray-900 font-semibold hover:bg-red-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                        Simular error 404
                    </button>
                    <button
                        onClick={() => cargarDestinos("500")}
                        disabled={cargando}
                        className="inline-flex items-center rounded bg-gray-200 px-3 py-2 text-gray-900 font-semibold hover:bg-red-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                        Simular error 500
                    </button>
                </div>

                {cargando && !error && (
                    <div role="status" className="flex flex-col items-center gap-3 text-center">
                        <p>Cargando destinos...</p>
                        <Spinner/>
                    </div>
                )}

                {error && (
                    <>
                        <ErrorCarga
                            textoPrimario={"Error al cargar destinos. Intente más tarde"}
                            textoSecundario={`Causa del error: ${error}`}
                        />
                    </>
                )}

                {!cargando && !error && destinos.length === 0 && (
                    <p >No hay destinos para mostrar. Intente nuevamente más tarde.</p>
                )}

                {!cargando && !error && destinos.length > 0 && (
                    <div className="mx-auto grid max-w-6xl grid-cols-1 place-items-stretch gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
                        {destinos.map((destino) => (
                            <DestinoCard
                                key={destino.id}
                                destino={destino}
                            />
                        ))}
                    </div>
                )}
            </section>

        </>
    )

}

export default Destinos