import { http, HttpResponse, delay } from 'msw';
import destinosJson from '../data/destinos.json'

export const handlers = [
    // Endpoint para obtener los destinos de viaje
    http.get('/api/destinos', async ({ request }) => {
        await delay(1000); // Esperar 1 segundo para simular espera
        const url = new URL(request.url);
        const error = url.searchParams.get('error');

        if (error === "404"){
            return HttpResponse.json({message: "Not found"}, {status: 404})

        } else if (error === "500"){
            return HttpResponse.json({message: "Internal Server Error"}, {status: 500})
        }

        const destinos = destinosJson;

        return HttpResponse.json(destinos);
    })
]