import { Link } from "react-router"

function BotonLink({texto = "Volver al inicio", link = "/"}) {
    return (
        <Link 
            to={link} 
            className="inline-flex items-center rounded bg-gray-800 px-3 py-2 text-white font-semibold hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
            {texto}
        </Link>
    )
}

export default BotonLink