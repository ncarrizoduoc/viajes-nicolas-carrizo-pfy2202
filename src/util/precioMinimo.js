export function precioMinimo(vuelos = []) {
    if (!Array.isArray(vuelos) || vuelos.length === 0) {
        return null;
    }

    return Math.min(...vuelos.map((vuelo) => vuelo.precio));
}

export default precioMinimo;