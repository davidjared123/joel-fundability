import ExpandableItem from '../components/ExpandableItem';
import { FiCreditCard, FiTrendingUp, FiDollarSign, FiCalendar, FiUsers, FiHome, FiTruck, FiBriefcase } from 'react-icons/fi';

const CreditTypes = () => {
  const creditTypes = [
    {
      title: "Trade Vendor Credit",
      description: "Store credit with easy approval and no personal guarantee",
      details: [
        "Store credit",
        "Easy to obtain",
        "No Personal Guarantee (PG) or established credit required"
      ],
      icon: <FiCreditCard size={24} />
    },
    {
      title: "Business Credit Card Stacking Services",
      description: "Views personal credit to obtain business cards",
      details: [
        "Views personal credit to obtain business cards",
        "Quick funding turnaround"
      ],
      icon: <FiTrendingUp size={24} />
    },
    {
      title: "Business Revenue",
      description: "Quick funding with no collateral required",
      details: [
        "Quick funding turnaround",
        "No collateral required",
        "Low credit score",
        "Daily or weekly payments"
      ],
      icon: <FiDollarSign size={24} />
    },
    {
      title: "Term Loan",
      description: "Quick funding with monthly payment options",
      details: [
        "Quick funding turn around",
        "No collateral required",
        "Monthly payments available"
      ],
      icon: <FiCalendar size={24} />
    },
    {
      title: "Line of Credit",
      description: "Access funds that you can draw out from at any time",
      details: [
        "Access funds that you can draw out from at any time",
        "Interest paid only on amount utilized",
        "Monthly repayments"
      ],
      icon: <FiTrendingUp size={24} />
    },
    {
      title: "Account Receivable",
      description: "No revenue requirements, business to business invoices required",
      details: [
        "No revenue requirements",
        "Business to Business invoices required",
        "Fast approvals"
      ],
      icon: <FiUsers size={24} />
    },
    {
      title: "Purchase Order",
      description: "Get access to funds to pay for outstanding purchase orders",
      details: [
        "Get access to funds to pay for outstanding purchase orders",
        "Fulfill a large purchase order versus declining the order",
        "Supplier gets paid directly"
      ],
      icon: <FiBriefcase size={24} />
    },
    {
      title: "Retirement Account",
      description: "Loan backed by the owner's 401k or IRA",
      details: [
        "Loan backed by the owner's 401k or IRA",
        "No tax events",
        "Minimal documents needed"
      ],
      icon: <FiDollarSign size={24} />
    },
    {
      title: "SBA",
      description: "Low interest rates with longer terms",
      details: [
        "Low interest rates",
        "Longer terms",
        "Loan backed by federal government"
      ],
      icon: <FiHome size={24} />
    },
    {
      title: "Securities",
      description: "Flexible variable rate with securities in your name",
      details: [
        "Flexible variable rate",
        "Securities remain in your name"
      ],
      icon: <FiTrendingUp size={24} />
    },
    {
      title: "Book of Business",
      description: "Borrow from your future commissions from your book of business",
      details: [
        "Borrow from your future commissions from your book of business",
        "Commission based loan"
      ],
      icon: <FiUsers size={24} />
    },
    {
      title: "Real Estate",
      description: "Cash out/refinance on your investment property",
      details: [
        "Cash out/refinance on your investment property or purchase a property in your business name",
        "Up to 75% loan to value",
        "Down payment required",
        "Business revenue to support repayment"
      ],
      icon: <FiHome size={24} />
    },
    {
      title: "Equipment",
      description: "Equipment financed will serve as collateral",
      details: [
        "Equipment financed will serve as collateral",
        "Supplier of the equipment gets paid directly"
      ],
      icon: <FiTruck size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Business Credit Types</h1>
          <p className="text-gray-600 mb-6">
            Learn about the different types of business credit available to help fund and grow your business. 
            Each type has unique requirements, benefits, and application processes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Quick Tips:</h3>
              <ul className="text-blue-700 space-y-1">
                <li>• Start with trade vendor credit to build your profile</li>
                <li>• Consider your business needs and timeline</li>
                <li>• Understand the requirements before applying</li>
                <li>• Some types require personal credit checks</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Best Practices:</h3>
              <ul className="text-green-700 space-y-1">
                <li>• Build business credit before personal credit</li>
                <li>• Maintain good payment history</li>
                <li>• Keep business and personal finances separate</li>
                <li>• Monitor your business credit reports regularly</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {creditTypes.map((creditType, index) => (
            <ExpandableItem
              key={index}
              title={creditType.title}
              description={creditType.description}
              details={creditType.details}
              icon={creditType.icon}
            />
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Credit Bureaus</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Dun & Bradstreet (D&B)</li>
                <li>• Experian Business</li>
                <li>• Equifax Business</li>
                <li>• FICO SBSS Score</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Next Steps</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Complete the Fundamentals section</li>
                <li>• Explore vendor options</li>
                <li>• Choose credit types that fit your needs</li>
                <li>• Start with smaller amounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditTypes; 