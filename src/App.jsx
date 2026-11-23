import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Destinos from './pages/Destinos'
import DestinoDetalle from './pages/DestinoDetalle'
import { Routes, Route } from 'react-router'


function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path='/' element={<Inicio />}/>
          <Route path='/destinos' element={<Destinos />}/>
          <Route path='/destinos/:id' element={<DestinoDetalle />}/>
        </Routes>
      </main>
      
      <Footer />
    </>
  )
}

export default App
