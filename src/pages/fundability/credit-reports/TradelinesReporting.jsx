import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { vendors } from '../../../data/vendors';
import { useUserVendors } from '../../../hooks/useUserVendors';
import { FiCheck, FiLoader, FiAlertCircle, FiExternalLink, FiX, FiPlus } from 'react-icons/fi';

export default function TradelinesReporting() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook para manejar vendors del usuario desde la base de datos
  const { userVendors, loading, error, toggleVendor, reload } = useUserVendors();

  // Calcular conteos TOTALES (sin límite de 3)
  const getTotalBureauCounts = () => {
    const counts = {
      Experian: 0,
      Equifax: 0,
      'D&B': 0,
    };

    vendors.forEach(vendor => {
      if (userVendors[vendor.name]) {
        vendor.bureaus?.forEach(bureau => {
          if (counts[bureau] !== undefined) {
            counts[bureau]++;
          }
        });
      }
    });

    return counts;
  };

  const bureauCounts = getTotalBureauCounts();
  const totalAccounts = Object.keys(userVendors).length;

  // Obtener lista de vendors seleccionados con sus datos
  const selectedVendorsList = vendors.filter(v => userVendors[v.name]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Tradelines Reporting</h3>
      <p className="text-sm text-gray-600 mb-4">
        First, you will need to generate your business credit report once each month. Next, you will use the Funding Manager to verify your existing accounts/tradelines line up with what's on your monthly report (and all information is accurate). You will also use the Funding Manager to apply for new accounts. NOTE: Using the Funding Manager ensures that all existing accounts you have, and will apply for, will report your payment activities accurately.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <FiAlertCircle className="mr-2" />
          Error cargando datos: {error}
        </div>
      )}

      {/* Resumen de Tradelines por Buró */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-6 mb-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiCheck className="mr-2 text-green-600" />
          Total de Tradelines Activos
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total General */}
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <p className="text-sm text-gray-500 mb-1">Total Cuentas</p>
            <p className="text-4xl font-bold text-indigo-600">
              {loading ? <FiLoader className="animate-spin inline" /> : totalAccounts}
            </p>
          </div>

          {/* Experian */}
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 mb-1">Experian</p>
            <p className="text-3xl font-bold text-blue-600">
              {loading ? <FiLoader className="animate-spin inline" /> : bureauCounts.Experian}
            </p>
            <p className="text-xs text-gray-400 mt-1">tradelines</p>
          </div>

          {/* Equifax */}
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border-l-4 border-green-500">
            <p className="text-sm text-gray-500 mb-1">Equifax</p>
            <p className="text-3xl font-bold text-green-600">
              {loading ? <FiLoader className="animate-spin inline" /> : bureauCounts.Equifax}
            </p>
            <p className="text-xs text-gray-400 mt-1">tradelines</p>
          </div>

          {/* D&B */}
          <div className="bg-white p-4 rounded-lg shadow-sm text-center border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">D&B</p>
            <p className="text-3xl font-bold text-purple-600">
              {loading ? <FiLoader className="animate-spin inline" /> : bureauCounts['D&B']}
            </p>
            <p className="text-xs text-gray-400 mt-1">tradelines</p>
          </div>
        </div>
      </div>

      {/* Lista de Vendors/Tradelines Activos */}
      {selectedVendorsList.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h4 className="font-semibold text-gray-800">Tus Tradelines Activos</h4>
            <span className="text-sm text-gray-500">{selectedVendorsList.length} cuenta(s)</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {selectedVendorsList.map(vendor => (
              <div key={vendor.name} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{vendor.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {vendor.bureaus.map(bureau => (
                      <span
                        key={bureau}
                        className={`text-xs px-2 py-0.5 rounded ${bureau === 'Experian' ? 'bg-blue-100 text-blue-700' :
                          bureau === 'Equifax' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}
                      >
                        {bureau}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 p-2"
                      title="Visitar sitio web"
                    >
                      <FiExternalLink size={16} />
                    </a>
                  )}
                  <button
                    onClick={() => toggleVendor(vendor.name, vendor.bureaus)}
                    className="text-red-400 hover:text-red-600 p-2"
                    title="Eliminar tradeline"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {selectedVendorsList.length === 0 && !loading && (
        <div className="bg-gray-50 rounded-lg p-8 text-center mb-6">
          <p className="text-gray-600 mb-4">No tienes tradelines registrados aún.</p>
          <p className="text-sm text-gray-500">Agrega vendors para comenzar a construir tu crédito comercial.</p>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/vendors"
          className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <FiPlus className="mr-2" />
          Apply for Accounts
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center bg-gray-200 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Add Existing Accounts
        </button>
      </div>

      {/* Modal para agregar cuentas existentes */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold">Add Existing Accounts</h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Marque todos los vendors donde ya tiene cuentas establecidas. Puede agregar más de 3 cuentas por buró.
            </p>

            {/* Resumen rápido en modal */}
            <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-lg text-center">
              <div>
                <p className="text-xs text-gray-500">Experian</p>
                <p className="font-bold text-blue-600">{bureauCounts.Experian}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Equifax</p>
                <p className="font-bold text-green-600">{bureauCounts.Equifax}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">D&B</p>
                <p className="font-bold text-purple-600">{bureauCounts['D&B']}</p>
              </div>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-4">
                <FiLoader className="animate-spin mr-2" />
                Cargando...
              </div>
            )}

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {vendors.map(vendor => (
                <div
                  key={vendor.name}
                  className={`flex items-center p-3 rounded-lg border transition-colors cursor-pointer ${userVendors[vendor.name] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  onClick={() => toggleVendor(vendor.name, vendor.bureaus)}
                >
                  <input
                    type="checkbox"
                    checked={!!userVendors[vendor.name]}
                    onChange={() => { }}
                    disabled={loading}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-800">{vendor.name}</span>
                    <span className="text-xs text-gray-500 ml-2">({vendor.category})</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vendor.bureaus.map(bureau => (
                        <span
                          key={bureau}
                          className={`text-xs px-2 py-0.5 rounded ${bureau === 'Experian' ? 'bg-blue-100 text-blue-700' :
                            bureau === 'Equifax' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}
                        >
                          {bureau}
                        </span>
                      ))}
                    </div>
                  </div>
                  {userVendors[vendor.name] && (
                    <FiCheck className="text-green-600" size={20} />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className="text-sm text-gray-600">
                {Object.keys(userVendors).length} tradeline(s) seleccionado(s)
              </span>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  reload();
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
