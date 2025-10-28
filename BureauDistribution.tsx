import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Mock Data ---
// In a real application, this data would likely come from an API.
const VENDOR_CATEGORIES = {
  experian: [
    { id: 'exp1', name: 'Creative Analytics' },
    { id: 'exp2', name: 'Strategic Supply Co.' },
    { id'exp3', name: 'Business Innovations Inc.' },
    { id: 'exp4', name: 'Global Office Goods' },
  ],
  equifax: [
    { id: 'eqf1', name: 'Summa Office Supplies' },
    { id: 'eqf2', name: 'Apex Business Credit' },
    { id: 'eqf3', name: 'Dynamic Logistics' },
  ],
  db: [
    { id: 'db1', name: 'Keystone Industrial' },
    { id: 'db2', name: 'Regal Hardware' },
    { id: 'db3', name: 'United Shipping Trust' },
    { id: 'db4', name: 'Pioneer Solutions' },
  ],
};

type Bureau = 'experian' | 'equifax' | 'd&b';
type VendorId = string;

interface BureauCardProps {
  name: string;
  count: number;
  total: number;
}

const BureauCard: React.FC<BureauCardProps> = ({ name, count, total }) => (
  <div className="bureau-card">
    <h3>{name}</h3>
    <p>{count} of {total}</p>
  </div>
);

export const BureauDistribution: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<Record<Bureau, Set<VendorId>>>({
    experian: new Set(),
    equifax: new Set(),
    'd&b': new Set(),
  });

  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/vendors');
  };

  const handleAddAccountsClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (bureau: Bureau, vendorId: VendorId) => {
    setSelectedAccounts(prev => {
      const newSet = new Set(prev[bureau]);
      if (newSet.has(vendorId)) {
        newSet.delete(vendorId);
      } else {
        newSet.add(vendorId);
      }
      return { ...prev, [bureau]: newSet };
    });
  };

  return (
    <div className="bureau-distribution-widget">
      <h2>Business Credit: Bureau Distribution</h2>
      <p>
        Apply for funding or add existing accounts to begin reporting to all 3 business bureaus. 
        Underwriters check different business credit bureaus. Some will only check one, others will check a blend. 
        That is why we strongly encourage all businesses to have a minimum of 3 accounts reporting to each of the 3 bureaus. 
        NOTE: There are many trade vendors that do report to more than one bureau, some only report to one.
      </p>

      <div className="bureau-cards-container">
        <BureauCard name="Experian" count={selectedAccounts.experian.size} total={3} />
        <BureauCard name="Equifax" count={selectedAccounts.equifax.size} total={3} />
        <BureauCard name="D&B" count={selectedAccounts['d&b'].size} total={3} />
      </div>

      <div className="action-buttons">
        <button onClick={handleApplyClick}>Apply for Trade Vendors</button>
        <button onClick={handleAddAccountsClick}>Add Existing Accounts</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Existing Accounts</h2>
            <p>Select the accounts you already have reporting to each bureau.</p>
            
            <div className="vendor-sections">
              <div className="vendor-section">
                <h3>Experian</h3>
                {VENDOR_CATEGORIES.experian.map(vendor => (
                  <div key={vendor.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAccounts.experian.has(vendor.id)}
                        onChange={() => handleCheckboxChange('experian', vendor.id)}
                      />
                      {vendor.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="vendor-section">
                <h3>Equifax</h3>
                {VENDOR_CATEGORIES.equifax.map(vendor => (
                  <div key={vendor.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAccounts.equifax.has(vendor.id)}
                        onChange={() => handleCheckboxChange('equifax', vendor.id)}
                      />
                      {vendor.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="vendor-section">
                <h3>D&B</h3>
                {VENDOR_CATEGORIES.db.map(vendor => (
                  <div key={vendor.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedAccounts['d&b'].has(vendor.id)}
                        onChange={() => handleCheckboxChange('d&b', vendor.id)}
                      />
                      {vendor.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleModalClose}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BureauDistribution;