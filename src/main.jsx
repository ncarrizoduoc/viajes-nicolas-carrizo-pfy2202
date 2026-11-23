import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './graphql/client.js'

async function iniciarAplicacion() {

  const mocksHabilitados =
    import.meta.env.DEV || import.meta.env.VITE_MSW_ENABLED !== "false";

  if (mocksHabilitados) {
    const { worker } = await import('./mocks/browser');

    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        options: { scope: import.meta.env.BASE_URL },
      },
    })

  }

  // BrowserRouter necesita un basename sin la barra final.
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  createRoot(document.getElementById("root")).render(
    <ApolloProvider client={apolloClient}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
}

iniciarAplicacion().catch((error) => {
  console.error("Error al iniciar la aplicación:", error);

  document.getElementById("root").textContent =
    "No se pudo iniciar la aplicación. Revisa la consola del navegador.";
});
