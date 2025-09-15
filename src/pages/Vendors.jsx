import { useState } from 'react';
import VendorCard from '../components/VendorCard';
import { FiFilter, FiSearch } from 'react-icons/fi';
import Navbar from "@/components/Navbar";

const Vendors = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    {
      name: "Murphy USA",
      category: "Gas/Fleet Card",
      description: "Gas station chain offering fleet cards for business fuel purchases.",
      website: "https://www.murphyusa.com",
      benefits: ["Easy approval", "No personal guarantee", "Reports to business credit"],
      requirements: ["Business license", "EIN", "Business address"]
    },
    {
      name: "Grainger",
      category: "Industrial Supplies",
      description: "Industrial supply company offering business credit for equipment and supplies.",
      website: "https://www.grainger.com",
      benefits: ["Net 30 terms", "Large product selection", "Business credit reporting"],
      requirements: ["Business license", "EIN", "Business phone"]
    },
    {
      name: "Pilot Flying J",
      category: "Gas Card",
      description: "Truck stop chain offering fuel cards for commercial vehicles.",
      website: "https://www.pilotflyingj.com",
      benefits: ["Nationwide locations", "Fleet management", "Credit reporting"],
      requirements: ["Business license", "EIN", "Commercial vehicle"]
    },
    {
      name: "Maverick Office Supplies",
      category: "Office Supplies",
      description: "Office supply company with business credit options.",
      website: "https://www.maverickofficesupplies.com",
      benefits: ["Net 30 terms", "Office essentials", "Credit building"],
      requirements: ["Business license", "EIN", "Business address"]
    },
    {
      name: "eCredable",
      category: "Reports Utility Payments",
      description: "Service that reports utility payments to business credit bureaus.",
      website: "https://www.ecredable.com",
      benefits: ["Utility payment reporting", "Credit building", "Easy setup"],
      requirements: ["Utility accounts", "Business name", "EIN"]
    },
    {
      name: "Phillips 66 / Conoco / 76",
      category: "Gas/Fleet Cards",
      description: "Major oil company offering fleet fuel cards.",
      website: "https://www.phillips66.com",
      benefits: ["Major brand", "Fleet management", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Credit Strong",
      category: "Financial Services",
      description: "Financial services company helping build business credit.",
      website: "https://www.creditstrong.com",
      benefits: ["Credit building", "Financial education", "Credit monitoring"],
      requirements: ["Business license", "EIN", "Business bank account"]
    },
    {
      name: "KeyBank",
      category: "Business Credit Card",
      description: "Traditional bank offering business credit cards.",
      website: "https://www.keybank.com",
      benefits: ["Traditional banking", "Credit cards", "Business services"],
      requirements: ["Good credit", "Business license", "EIN", "Business bank account"]
    },
    {
      name: "7-eleven",
      category: "Fleet/Gas Card",
      description: "Convenience store chain with fleet fuel cards.",
      website: "https://www.7-eleven.com",
      benefits: ["Convenient locations", "Fleet cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Circle K",
      category: "Fleet/Gas Card",
      description: "Convenience store chain offering fleet fuel cards.",
      website: "https://www.circlek.com",
      benefits: ["Nationwide locations", "Fleet management", "Credit building"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Sunoco",
      category: "Fleet/Gas Cards",
      description: "Gas station chain with fleet fuel programs.",
      website: "https://www.sunoco.com",
      benefits: ["Major brand", "Fleet cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Shell",
      category: "Fleet/Gas Card",
      description: "International oil company with fleet fuel cards.",
      website: "https://www.shell.com",
      benefits: ["Global brand", "Fleet management", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Wex",
      category: "Gas/Fleet",
      description: "Fleet fuel card provider with comprehensive solutions.",
      website: "https://www.wexinc.com",
      benefits: ["Fleet management", "Fuel cards", "Credit building"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Marathon",
      category: "Fleet/Gas Card",
      description: "Gas station chain with fleet fuel programs.",
      website: "https://www.marathonpetroleum.com",
      benefits: ["Major brand", "Fleet cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Uline",
      category: "Office Supplies",
      description: "Industrial supply company with business credit options.",
      website: "https://www.uline.com",
      benefits: ["Net 30 terms", "Large selection", "Credit building"],
      requirements: ["Business license", "EIN", "Business address"]
    },
    {
      name: "Brex Net Account",
      category: "Corporate Credit Card",
      description: "Modern corporate credit card provider for startups and businesses.",
      website: "https://www.brex.com",
      benefits: ["No personal guarantee", "High limits", "Modern platform"],
      requirements: ["Business license", "EIN", "Business bank account"]
    },
    {
      name: "Office Garner",
      category: "Office Supplies",
      description: "Office supply company with business credit options.",
      website: "https://www.officegarner.com",
      benefits: ["Net 30 terms", "Office supplies", "Credit building"],
      requirements: ["Business license", "EIN", "Business address"]
    },
    {
      name: "Kum & Go",
      category: "Gas/Fleet Card",
      description: "Convenience store chain with fleet fuel cards.",
      website: "https://www.kumandgo.com",
      benefits: ["Convenient locations", "Fleet cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "The CEO Creative",
      category: "Office supplies & custom printing",
      description: "Office supply and custom printing company with business credit.",
      website: "https://www.theceocreative.com",
      benefits: ["Custom printing", "Office supplies", "Credit building"],
      requirements: ["Business license", "EIN", "Business address"]
    },
    {
      name: "Fulton Bank",
      category: "Financial Services",
      description: "Traditional bank offering business banking and credit services.",
      website: "https://www.fultonbank.com",
      benefits: ["Traditional banking", "Business loans", "Credit cards"],
      requirements: ["Good credit", "Business license", "EIN", "Business bank account"]
    },
    {
      name: "General Motors",
      category: "Business Credit Card",
      description: "Automotive company offering business credit cards.",
      website: "https://www.gm.com",
      benefits: ["Automotive focus", "Business cards", "Credit building"],
      requirements: ["Business license", "EIN", "Good credit"]
    },
    {
      name: "Gulf Fleet",
      category: "Gas/Fleet Card",
      description: "Gas station chain with fleet fuel programs.",
      website: "https://www.gulf.com",
      benefits: ["Fleet management", "Fuel cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Zoro",
      category: "Equipment and Supplies",
      description: "Industrial equipment and supply company with business credit.",
      website: "https://www.zoro.com",
      benefits: ["Large selection", "Net 30 terms", "Credit building"],
      requirements: ["Business license", "EIN", "Business address"]
    },
    {
      name: "ExxonMobil",
      category: "Gas Card",
      description: "Major oil company with business fuel cards.",
      website: "https://www.exxonmobil.com",
      benefits: ["Major brand", "Fleet cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Valero",
      category: "Gas/Fleet Card",
      description: "Gas station chain with fleet fuel programs.",
      website: "https://www.valero.com",
      benefits: ["Fleet management", "Fuel cards", "Credit building"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "Holiday",
      category: "Gas/Fleet Card",
      description: "Convenience store chain with fleet fuel cards.",
      website: "https://www.holidaystationstores.com",
      benefits: ["Convenient locations", "Fleet cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    },
    {
      name: "JJ Gold",
      category: "Gift Supply Store",
      description: "Gift and supply store with business credit options.",
      website: "https://www.jjgold.com",
      benefits: ["Gift supplies", "Net 30 terms", "Credit building"],
      requirements: ["Business license", "EIN", "Business address"]
    },
    {
      name: "Wawa",
      category: "Fleet/Gas Card",
      description: "Convenience store chain with fleet fuel cards.",
      website: "https://www.wawa.com",
      benefits: ["Convenient locations", "Fleet cards", "Credit reporting"],
      requirements: ["Business license", "EIN", "Fleet vehicles"]
    }
  ];

  const categories = ['all', ...new Set(vendors.map(v => v.category))];

  const filteredVendors = vendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar /> 
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Business Credit Vendors</h1>
          <p className="text-gray-600 mb-6">
            Explore our curated network of vendors and suppliers that report to business credit bureaus. 
            These vendors can help you build your business credit profile.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredVendors.length} of {vendors.length} vendors
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, index) => (
            <VendorCard key={index} vendor={vendor} />
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