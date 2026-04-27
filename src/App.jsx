import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Transacciones from './components/Transacciones'
import Clientes from './components/Clientes'

function App() {
  const [pagina, setPagina] = useState('dashboard')
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

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex gap-4 items-center">
        <span className="font-bold text-xl text-blue-600 mr-4">BizPanel</span>
        <button
          onClick={() => setPagina('dashboard')}
          className={`px-4 py-2 rounded font-medium ${pagina === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setPagina('transacciones')}
          className={`px-4 py-2 rounded font-medium ${pagina === 'transacciones' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Transacciones
        </button>
        <button
          onClick={() => setPagina('clientes')}
          className={`px-4 py-2 rounded font-medium ${pagina === 'clientes' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Clientes
        </button>
        <button
          onClick={limpiar}
          className="ml-auto text-red-400 hover:text-red-600 text-sm"
        >
          🗑 Limpiar datos
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
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