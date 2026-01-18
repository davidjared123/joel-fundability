import { useState } from 'react';
import VendorCard from '../components/VendorCard';
import { FiFilter, FiSearch, FiCheckCircle } from 'react-icons/fi';
import Navbar from "@/components/Navbar";
import { vendors, reportingVendors, nonReportingVendors } from '../data/vendors';
import { useUserVendors } from '../hooks/useUserVendors';

const Vendors = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReportingType, setSelectedReportingType] = useState('all');
  const [selectedBureau, setSelectedBureau] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Hook para manejar vendors del usuario
  const { userVendors, loading, toggleVendor, getBureauCounts } = useUserVendors();

  const categories = ['all', ...new Set(vendors.map(v => v.category))];

  const filteredVendors = vendors.filter(vendor => {
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;

    // Filter by reporting type
    const matchesReportingType = selectedReportingType === 'all' ||
      (selectedReportingType === 'reporting' && vendor.isReporting) ||
      (selectedReportingType === 'non-reporting' && !vendor.isReporting);

    // Filter by bureau
    const matchesBureau = selectedBureau === 'all' ||
      (vendor.bureaus && vendor.bureaus.includes(selectedBureau));

    // Filter by search term
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesReportingType && matchesBureau && matchesSearch;
  });

  // Calcular conteos de burós (solo de vendors que el usuario tiene)
  const bureauCounts = getBureauCounts(vendors);
  const selectedCount = Object.keys(userVendors).length;

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Business Credit Vendors</h1>
          <p className="text-gray-600 mb-6">
            Explore our curated network of vendors and suppliers. Reporting vendors help build your business credit profile by reporting to credit bureaus.
          </p>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-gray-500">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-800">{vendors.length}</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-xs text-gray-500">Reporting</p>
              <p className="text-2xl font-bold text-green-600">{reportingVendors.length}</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-xs text-gray-500">Experian</p>
              <p className="text-xl font-bold text-blue-700">{bureauCounts.Experian}</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-xs text-gray-500">Equifax</p>
              <p className="text-xl font-bold text-green-700">{bureauCounts.Equifax}</p>
            </div>
            <div className="text-center border-l border-gray-200">
              <p className="text-xs text-gray-500">D&B</p>
              <p className="text-xl font-bold text-purple-700">{bureauCounts['D&B']}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search vendors by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" size={20} />

              {/* Reporting Type Filter */}
              <select
                value={selectedReportingType}
                onChange={(e) => setSelectedReportingType(e.target.value)}
                className="px-3 py-2 border text-black bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Types</option>
                <option value="reporting">✓ Reporting Only</option>
                <option value="non-reporting">Non-Reporting</option>
              </select>

              {/* Bureau Filter */}
              <select
                value={selectedBureau}
                onChange={(e) => setSelectedBureau(e.target.value)}
                className="px-3 py-2 border text-black bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Bureaus</option>
                <option value="Experian">Experian</option>
                <option value="Equifax">Equifax</option>
                <option value="D&B">D&B</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border text-black bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Showing {filteredVendors.length} of {vendors.length} vendors
              {selectedReportingType !== 'all' && (
                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${selectedReportingType === 'reporting' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {selectedReportingType === 'reporting' ? 'Reporting' : 'Non-Reporting'}
                </span>
              )}
              {selectedBureau !== 'all' && (
                <span className="ml-2 px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700">
                  {selectedBureau}
                </span>
              )}
            </span>
            <span className="flex items-center text-green-600">
              <FiCheckCircle className="mr-1" />
              {selectedCount} vendors marked
            </span>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
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
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedReportingType('all');
                setSelectedBureau('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors; 