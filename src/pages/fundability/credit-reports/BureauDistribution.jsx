import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { vendors } from '../../../data/vendors';

export default function BureauDistribution() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState({});

  const handleCheckboxChange = (vendorName) => {
    setSelectedVendors(prev => ({
      ...prev,
      [vendorName]: !prev[vendorName]
    }));
  };

  const bureauCounts = useMemo(() => {
    const counts = {
      Experian: 0,
      Equifax: 0,
      'D&B': 0,
    };

    vendors.forEach(vendor => {
      if (selectedVendors[vendor.name]) {
        vendor.bureaus.forEach(bureau => {
          if (counts[bureau] < 3) {
            counts[bureau]++;
          }
        });
      }
    });

    return counts;
  }, [selectedVendors]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Distribución de Burós</h3>
      <p className="text-sm text-gray-600 mb-4">
        Solicite financiamiento o agregue cuentas existentes para comenzar a informar a las 3 agencias de crédito comerciales. Los suscriptores consultan diferentes agencias de crédito comerciales. Algunos solo verificarán uno, otros verificarán una combinación. Es por eso que recomendamos encarecidamente a todas las empresas que tengan un mínimo de 3 cuentas que informen a cada una de las 3 agencias. NOTA: Hay muchos proveedores comerciales que informan a más de una agencia, algunos solo informan a una.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h4 className="font-semibold text-gray-800">Experian</h4>
          <p className="text-2xl font-bold text-gray-900">{bureauCounts.Experian} of 3</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h4 className="font-semibold text-gray-800">Equifax</h4>
          <p className="text-2xl font-bold text-gray-900">{bureauCounts.Equifax} of 3</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h4 className="font-semibold text-gray-800">D&B</h4>
          <p className="text-2xl font-bold text-gray-900">{bureauCounts['D&B']} of 3</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Link to="/vendors" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Apply for Trade Vendors
        </Link>
        <button onClick={() => setIsModalOpen(true)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
          Add Existing Accounts
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h4 className="text-xl font-bold mb-4">Add Existing Accounts</h4>
            <div className="space-y-2">
              {vendors.map(vendor => (
                <div key={vendor.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={vendor.name}
                    checked={!!selectedVendors[vendor.name]}
                    onChange={() => handleCheckboxChange(vendor.name)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={vendor.name} className="ml-2 text-gray-700">
                    {vendor.name} ({vendor.bureaus.join(', ')})
                  </label>
                </div>
              ))}
            </div>
            <button onClick={() => setIsModalOpen(false)} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}