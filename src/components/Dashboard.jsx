import { formatearMonto } from '../utils'

function Dashboard({ ingresos, egresos }) {
  const balance = ingresos - egresos

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Ingresos</p>
          <p className="text-2xl font-bold text-green-600">{formatearMonto(ingresos)}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Egresos</p>
          <p className="text-2xl font-bold text-red-500">{formatearMonto(egresos)}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 mb-1">Balance</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatearMonto(balance)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard