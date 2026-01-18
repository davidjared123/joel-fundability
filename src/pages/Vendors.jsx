import { useState } from 'react';
import VendorCard from '../components/VendorCard';
import { FiFilter, FiSearch, FiCheckCircle } from 'react-icons/fi';
import Navbar from "@/components/Navbar";
import { vendors } from '../data/vendors';
import { useUserVendors } from '../hooks/useUserVendors';

const Vendors = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Hook para manejar vendors del usuario
  const { userVendors, loading, toggleVendor, getBureauCounts } = useUserVendors();

  const categories = ['all', ...new Set(vendors.map(v => v.category))];

  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calcular conteos de burós
  const bureauCounts = getBureauCounts(vendors);
  const selectedCount = Object.keys(userVendors).length;

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Business Credit Vendors</h1>
          <p className="text-gray-600 mb-6">
            Explore our curated network of vendors and suppliers that report to business credit bureaus.
            Mark the vendors where you already have an account to track your bureau coverage.
          </p>

          {/* Resumen de Burós */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600">Experian</p>
              <p className="text-xl font-bold text-blue-700">{bureauCounts.Experian} cuentas</p>
            </div>
            <div className="text-center border-x border-gray-200">
              <p className="text-sm text-gray-600">Equifax</p>
              <p className="text-xl font-bold text-green-700">{bureauCounts.Equifax} cuentas</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">D&B</p>
              <p className="text-xl font-bold text-purple-700">{bureauCounts['D&B']} cuentas</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border text-black bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Showing {filteredVendors.length} of {vendors.length} vendors</span>
            <span className="flex items-center text-green-600">
              <FiCheckCircle className="mr-1" />
              {selectedCount} vendors marcados
            </span>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, index) => (
            <VendorCard
              key={index}
              vendor={vendor}
              isSelected={!!userVendors[vendor.name]}
              onToggle={toggleVendor}
              loading={loading}
            />
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No vendors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors; 