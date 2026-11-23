import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Destinos from './pages/Destinos'
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
        </Routes>
      </main>
      
      <Footer />
    </>
  )
}

export default App
