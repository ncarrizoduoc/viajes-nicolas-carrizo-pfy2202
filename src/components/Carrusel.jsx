import { useEffect, useRef } from "react";

// Carrusel de imágenes que cambia automáticamente cada 4 segundos
function Carrusel({ imagenes = [], alt = "Imagen del destino" }) {
    const carouselRef = useRef(null);

    useEffect(() => {
        if (imagenes.length === 0) {
            return;
        }

        const interval = setInterval(() => {
            const carousel = carouselRef.current;
            if (!carousel) {
                return;
            }

            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                carousel.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [imagenes]);

    if (imagenes.length === 0) {
        return null;
    }

    return (
        <div className="relative mx-auto w-full overflow-hidden rounded-lg border-2 border-gray-800">
            <div
                ref={carouselRef}
                id="carousel"
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {imagenes.map((src, index) => (
                    <div
                        key={`${src}-${index}`}
                        className="h-64 w-full shrink-0 snap-center"
                    >
                        <img
                            src={src}
                            alt={`${alt} ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carrusel;