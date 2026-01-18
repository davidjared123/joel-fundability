import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { vendors } from '../../../data/vendors';
import { useUserVendors } from '../../../hooks/useUserVendors';
import { FiCheck, FiLoader, FiAlertCircle } from 'react-icons/fi';

export default function BureauDistribution() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook para manejar vendors del usuario desde la base de datos
  const { userVendors, loading, error, toggleVendor, getBureauCounts, reload } = useUserVendors();

  const bureauCounts = getBureauCounts(vendors);

  // Función para obtener el color de progreso
  const getProgressColor = (count) => {
    if (count >= 3) return 'bg-green-500';
    if (count >= 2) return 'bg-yellow-500';
    if (count >= 1) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  const getProgressWidth = (count) => {
    return Math.min((count / 3) * 100, 100);
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Distribución de Burós</h3>
      <p className="text-sm text-gray-600 mb-4">
        Solicite financiamiento o agregue cuentas existentes para comenzar a informar a las 3 agencias de crédito comerciales. Los suscriptores consultan diferentes agencias de crédito comerciales. Algunos solo verificarán uno, otros verificarán una combinación. Es por eso que recomendamos encarecidamente a todas las empresas que tengan un mínimo de 3 cuentas que informen a cada una de las 3 agencias. NOTA: Hay muchos proveedores comerciales que informan a más de una agencia, algunos solo informan a una.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <FiAlertCircle className="mr-2" />
          Error cargando datos: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Experian */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center shadow-sm">
          <h4 className="font-semibold text-blue-800">Experian</h4>
          <p className="text-3xl font-bold text-blue-900 my-2">
            {loading ? <FiLoader className="animate-spin inline" /> : bureauCounts.Experian}
            <span className="text-lg font-normal text-blue-600"> of 3</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(bureauCounts.Experian)}`}
              style={{ width: `${getProgressWidth(bureauCounts.Experian)}%` }}
            />
          </div>
          {bureauCounts.Experian >= 3 && (
            <span className="text-green-600 text-sm flex items-center justify-center mt-2">
              <FiCheck className="mr-1" /> Meta alcanzada
            </span>
          )}
        </div>

        {/* Equifax */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center shadow-sm">
          <h4 className="font-semibold text-green-800">Equifax</h4>
          <p className="text-3xl font-bold text-green-900 my-2">
            {loading ? <FiLoader className="animate-spin inline" /> : bureauCounts.Equifax}
            <span className="text-lg font-normal text-green-600"> of 3</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(bureauCounts.Equifax)}`}
              style={{ width: `${getProgressWidth(bureauCounts.Equifax)}%` }}
            />
          </div>
          {bureauCounts.Equifax >= 3 && (
            <span className="text-green-600 text-sm flex items-center justify-center mt-2">
              <FiCheck className="mr-1" /> Meta alcanzada
            </span>
          )}
        </div>

        {/* D&B */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center shadow-sm">
          <h4 className="font-semibold text-purple-800">D&B</h4>
          <p className="text-3xl font-bold text-purple-900 my-2">
            {loading ? <FiLoader className="animate-spin inline" /> : bureauCounts['D&B']}
            <span className="text-lg font-normal text-purple-600"> of 3</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(bureauCounts['D&B'])}`}
              style={{ width: `${getProgressWidth(bureauCounts['D&B'])}%` }}
            />
          </div>
          {bureauCounts['D&B'] >= 3 && (
            <span className="text-green-600 text-sm flex items-center justify-center mt-2">
              <FiCheck className="mr-1" /> Meta alcanzada
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <Link to="/vendors" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Apply for Trade Vendors
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
        >
          Add Existing Accounts
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={() => { setIsModalOpen(false); reload(); }}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-bold mb-2">Add Existing Accounts</h4>
            <p className="text-sm text-gray-600 mb-4">
              Marque los vendors donde ya tiene una cuenta establecida.
            </p>

            {loading && (
              <div className="flex items-center justify-center py-4">
                <FiLoader className="animate-spin mr-2" />
                Cargando...
              </div>
            )}

            <div className="space-y-2">
              {vendors.map(vendor => (
                <div
                  key={vendor.name}
                  className={`flex items-center p-3 rounded-lg border transition-colors ${userVendors[vendor.name] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  <input
                    type="checkbox"
                    id={`modal-${vendor.name}`}
                    checked={!!userVendors[vendor.name]}
                    onChange={() => toggleVendor(vendor.name, vendor.bureaus)}
                    disabled={loading}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                  />
                  <label htmlFor={`modal-${vendor.name}`} className="ml-3 flex-1 cursor-pointer">
                    <span className="font-medium text-gray-800">{vendor.name}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vendor.bureaus.map(bureau => (
                        <span
                          key={bureau}
                          className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded"
                        >
                          {bureau}
                        </span>
                      ))}
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className="text-sm text-gray-600">
                {Object.keys(userVendors).length} vendor(s) seleccionado(s)
              </span>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  reload(); // Recargar datos al cerrar
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}