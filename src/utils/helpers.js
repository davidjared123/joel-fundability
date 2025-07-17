// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number
export const validatePhone = (phone) => {
  const re = /^[+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/\s/g, ''));
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Get step status
export const getStepStatus = (completed, required = true) => {
  if (completed) return 'completed';
  if (required) return 'required';
  return 'optional';
};

// Format business name
export const formatBusinessName = (name) => {
  return name
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

// Validate EIN format
export const validateEIN = (ein) => {
  const re = /^\d{2}-\d{7}$/;
  return re.test(ein);
};

// Format EIN
export const formatEIN = (ein) => {
  const cleaned = ein.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  }
  return ein;
}; 