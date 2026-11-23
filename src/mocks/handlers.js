import { http, graphql, HttpResponse, delay } from 'msw';
import destinosJson from '../data/destinos.json';
import { GRAPHQL_ENDPOINT } from '../graphql/endpoint';

const apiGraphql = graphql.link(GRAPHQL_ENDPOINT);

export const handlers = [
    // Endpoint para obtener los destinos de viaje
    http.get('/api/destinos', async ({ request }) => {
        await delay(1000); // Esperar 1 segundo para simular espera
        const url = new URL(request.url);
        const error = url.searchParams.get('error');

        if (error === "404") {
            return HttpResponse.json({ message: "Not found" }, { status: 404 })

        } else if (error === "500") {
            return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 })
        }

        const destinos = destinosJson;

        return HttpResponse.json(destinos);
    }),

    apiGraphql.query("ObtenerDestino", async ({ variables }) => {
        await delay(1000);

        if (variables?.simularError) {
            return HttpResponse.json({
                errors: [
                    {
                        message: "No se pudo obtener información del destino buscado.",
                        extensions: { code: "ERROR_SIMULADO" },
                    },
                ],
            }, { status: 404 });
        }

        const destino = destinosJson.find(
            (item) => String(item.id) === String(variables?.id)
        );

        return HttpResponse.json({
            data: {
                destino: destino ?? null,
            },
        });
    })
]