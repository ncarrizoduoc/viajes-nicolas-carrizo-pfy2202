import { gql } from "@apollo/client";

export const OBTENER_DESTINO = gql`
  query ObtenerDestino($id: ID!, $simularError: Boolean = false) {
    destino(id: $id, simularError: $simularError) {
      id
      ciudad
      imgCarrusel
      pais
      actividades
      vuelos
      hoteles
    }
  }
`;