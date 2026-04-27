import { useState } from 'react'

function Clientes({ clientes, setClientes }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')

  function agregar() {
    if (!nombre) return
    const nuevo = { nombre, email, telefono }
    setClientes([...clientes, nuevo])
    setNombre('')
    setEmail('')
    setTelefono('')
  }

  function eliminar(i) {
    setClientes(clientes.filter((_, index) => index !== i))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Clientes</h2>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Nuevo cliente</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:flex-1"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:flex-1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-36"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <button
            onClick={agregar}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow">
        {clientes.length === 0 && (
          <p className="text-gray-400 text-center py-8">Sin clientes aún</p>
        )}
        {clientes.map((c, i) => (
          <div key={i} className="flex items-center justify-between px-4 md:px-6 py-4 border-b last:border-0">
            <div>
              <p className="font-medium text-gray-800">{c.nombre}</p>
              <p className="text-sm text-gray-400">
                {c.email} {c.telefono && `· ${c.telefono}`}
              </p>
            </div>
            <button onClick={() => eliminar(i)} className="text-gray-300 hover:text-red-400">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clientes