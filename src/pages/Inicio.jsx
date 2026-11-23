import { Link } from 'react-router'
import { useCallback, useEffect, useState } from 'react'


function Inicio() {

    return (
        <div>
            <header className="mt-4 mb-12">
                <div className="mx-auto mb-4 flex max-w-6xl flex-col items-center justify-center gap-6 px-4 md:flex-row">
                    <div className="w-full text-left md:mr-3">
                        <h1>Bienvenido a ChileViajes</h1>
                        <p>¡La aerolínea más grande de Chile!</p>
                    </div>
                    <article className="grid w-full max-w-[540px] overflow-hidden rounded border-2 border-gray-200 bg-white shadow-sm md:grid-cols-[1fr_2fr]">
                        <img
                            src={"https://picsum.photos/seed/portada/600/600"}
                            className="block h-[180px] w-full object-cover md:h-full md:min-h-[240px]"
                            alt="Imagen de vuelo"
                        />
                        <div className="flex flex-col justify-center items-center bg-gray-50 p-5">
                            <h2 className="text-gray-900">¡Tu próximo viaje te espera!</h2>
                            <p className="mb-3 text-gray-700">
                                ¡Viaja a dónde siempre soñaste, con la mejor calidad de servicio y precios insuperables!
                            </p>
                            <Link to="/destinos" className="inline-flex w-fit items-center rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                                Explorar destinos
                            </Link>
                        </div>
                    </article>
                </div>
            </header>
        </div>
    )

}

export default Inicio