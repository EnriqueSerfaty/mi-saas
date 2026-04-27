import { useState } from 'react'
import { formatearMonto } from '../utils'

function Transacciones({ transacciones, setTransacciones }) {
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState(0)
  const [tipo, setTipo] = useState('ingreso')

  function agregar() {
    if (!descripcion || !monto) return
    const nueva = { descripcion, monto: Number(monto), tipo }
    setTransacciones([...transacciones, nueva])
    setDescripcion('')
    setMonto(0)
  }

  function eliminar(i) {
    setTransacciones(transacciones.filter((_, index) => index !== i))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transacciones</h2>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Nueva transacción</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:flex-1"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-36"
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
          <button
            onClick={agregar}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow">
        {transacciones.length === 0 && (
          <p className="text-gray-400 text-center py-8">Sin transacciones aún</p>
        )}
        {[...transacciones].reverse().map((t, i) => (
          <div key={i} className="flex items-center justify-between px-4 md:px-6 py-4 border-b last:border-0">
            <div>
              <p className="font-medium text-gray-800">{t.descripcion}</p>
              <p className="text-sm text-gray-400">{t.tipo}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-bold text-sm md:text-base ${t.tipo === 'ingreso' ? 'text-green-600' : 'text-red-500'}`}>
                {t.tipo === 'ingreso' ? '+' : '-'}{formatearMonto(t.monto)}
              </span>
              <button onClick={() => eliminar(transacciones.length - 1 - i)} className="text-gray-300 hover:text-red-400">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transacciones