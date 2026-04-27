import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Transacciones from './components/Transacciones'
import Clientes from './components/Clientes'

function App() {
  const [pagina, setPagina] = useState('dashboard')
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [transacciones, setTransacciones] = useState(() => {
    const guardadas = localStorage.getItem('transacciones')
    return guardadas ? JSON.parse(guardadas) : []
  })
  const [clientes, setClientes] = useState(() => {
    const guardados = localStorage.getItem('clientes')
    return guardados ? JSON.parse(guardados) : []
  })

  useEffect(() => {
    localStorage.setItem('transacciones', JSON.stringify(transacciones))
  }, [transacciones])

  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes))
  }, [clientes])

  const ingresos = transacciones
    .filter(t => t.tipo === 'ingreso')
    .reduce((acc, t) => acc + t.monto, 0)

  const egresos = transacciones
    .filter(t => t.tipo === 'egreso')
    .reduce((acc, t) => acc + t.monto, 0)

  function limpiar() {
    localStorage.clear()
    window.location.reload()
  }

  function navegarA(pag) {
    setPagina(pag)
    setMenuAbierto(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-blue-600">Serfaty Hub</span>

          {/* Menu desktop */}
          <div className="hidden md:flex gap-4 items-center">
            <button onClick={() => navegarA('dashboard')} className={`px-4 py-2 rounded font-medium ${pagina === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Dashboard</button>
            <button onClick={() => navegarA('transacciones')} className={`px-4 py-2 rounded font-medium ${pagina === 'transacciones' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Transacciones</button>
            <button onClick={() => navegarA('clientes')} className={`px-4 py-2 rounded font-medium ${pagina === 'clientes' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Clientes</button>
            <button onClick={limpiar} className="ml-4 text-red-400 hover:text-red-600 text-sm">🗑 Limpiar</button>
          </div>

          {/* Boton hamburguesa mobile */}
          <button className="md:hidden text-gray-600 text-2xl" onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>

        {/* Menu mobile desplegable */}
        {menuAbierto && (
          <div className="md:hidden flex flex-col gap-2 mt-4">
            <button onClick={() => navegarA('dashboard')} className={`px-4 py-2 rounded font-medium text-left ${pagina === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Dashboard</button>
            <button onClick={() => navegarA('transacciones')} className={`px-4 py-2 rounded font-medium text-left ${pagina === 'transacciones' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Transacciones</button>
            <button onClick={() => navegarA('clientes')} className={`px-4 py-2 rounded font-medium text-left ${pagina === 'clientes' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Clientes</button>
            <button onClick={limpiar} className="text-red-400 text-sm text-left px-4 py-2">🗑 Limpiar datos</button>
          </div>
        )}
      </nav>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {pagina === 'dashboard' && (
          <Dashboard ingresos={ingresos} egresos={egresos} />
        )}
        {pagina === 'transacciones' && (
          <Transacciones
            transacciones={transacciones}
            setTransacciones={setTransacciones}
          />
        )}
        {pagina === 'clientes' && (
          <Clientes
            clientes={clientes}
            setClientes={setClientes}
          />
        )}
      </main>
    </div>
  )
}

export default App