export default function precioMinimoHotel(hoteles = []){
    if (!Array.isArray(hoteles) || hoteles.length === 0) {
        return null;
    }

    return Math.min(...hoteles.map((hotel) => hotel.precio))
}