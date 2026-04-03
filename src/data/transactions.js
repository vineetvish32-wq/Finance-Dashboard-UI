export const INITIAL_TRANSACTIONS = [
  { id: 1,  date: '2026-03-28', description: 'Monthly Salary',       category: 'Salary',         type: 'income',  amount: 85000 },
  { id: 2,  date: '2026-03-27', description: 'Zomato Order',         category: 'Food & Dining',  type: 'expense', amount: 450   },
  { id: 3,  date: '2026-03-26', description: 'Ola Cab',              category: 'Transport',      type: 'expense', amount: 280   },
  { id: 4,  date: '2026-03-25', description: 'Netflix',              category: 'Entertainment',  type: 'expense', amount: 649   },
  { id: 5,  date: '2026-03-24', description: 'Amazon Shopping',      category: 'Shopping',       type: 'expense', amount: 3200  },
  { id: 6,  date: '2026-03-22', description: 'Freelance Project',    category: 'Freelance',      type: 'income',  amount: 22000 },
  { id: 7,  date: '2026-03-20', description: 'Electricity Bill',     category: 'Utilities',      type: 'expense', amount: 1850  },
  { id: 8,  date: '2026-03-18', description: 'Doctor Visit',         category: 'Healthcare',     type: 'expense', amount: 900   },
  { id: 9,  date: '2026-03-15', description: 'Swiggy Order',         category: 'Food & Dining',  type: 'expense', amount: 380   },
  { id: 10, date: '2026-03-12', description: 'Metro Card Recharge',  category: 'Transport',      type: 'expense', amount: 500   },
  { id: 11, date: '2026-03-10', description: 'SIP Investment',       category: 'Investment',     type: 'expense', amount: 5000  },
  { id: 12, date: '2026-03-08', description: 'Paytm Cashback',       category: 'Other',          type: 'income',  amount: 250   },
  { id: 13, date: '2026-02-28', description: 'Monthly Salary',       category: 'Salary',         type: 'income',  amount: 85000 },
  { id: 14, date: '2026-02-22', description: 'Groceries',            category: 'Food & Dining',  type: 'expense', amount: 2100  },
  { id: 15, date: '2026-02-18', description: 'Freelance Design',     category: 'Freelance',      type: 'income',  amount: 18000 },
  { id: 16, date: '2026-02-15', description: 'Gym Membership',       category: 'Healthcare',     type: 'expense', amount: 2500  },
  { id: 17, date: '2026-02-10', description: 'Phone Bill',           category: 'Utilities',      type: 'expense', amount: 799   },
  { id: 18, date: '2026-01-28', description: 'Monthly Salary',       category: 'Salary',         type: 'income',  amount: 85000 },
  { id: 19, date: '2026-01-20', description: 'Flight Tickets',       category: 'Transport',      type: 'expense', amount: 12000 },
  { id: 20, date: '2026-01-15', description: 'Clothes Shopping',     category: 'Shopping',       type: 'expense', amount: 4500  },
  { id: 21, date: '2025-12-28', description: 'Monthly Salary',       category: 'Salary',         type: 'income',  amount: 80000 },
  { id: 22, date: '2025-12-20', description: 'Christmas Shopping',   category: 'Shopping',       type: 'expense', amount: 6500  },
  { id: 23, date: '2025-12-15', description: 'Restaurant Dinner',    category: 'Food & Dining',  type: 'expense', amount: 1800  },
  { id: 24, date: '2025-11-28', description: 'Monthly Salary',       category: 'Salary',         type: 'income',  amount: 80000 },
  { id: 25, date: '2025-11-10', description: 'Freelance Work',       category: 'Freelance',      type: 'income',  amount: 15000 },
  { id: 26, date: '2025-10-28', description: 'Monthly Salary',       category: 'Salary',         type: 'income',  amount: 80000 },
  { id: 27, date: '2025-10-14', description: 'Diwali Shopping',      category: 'Shopping',       type: 'expense', amount: 8000  },
  { id: 28, date: '2025-10-05', description: 'Medical Checkup',      category: 'Healthcare',     type: 'expense', amount: 1500  },
];

export const CATEGORIES = [
  'Food & Dining', 'Transport', 'Shopping', 'Entertainment',
  'Healthcare', 'Utilities', 'Salary', 'Freelance', 'Investment', 'Other',
];

export const CATEGORY_COLORS = {
  'Food & Dining': '#6c8fff',
  'Transport':     '#4fffb0',
  'Shopping':      '#ff6b8a',
  'Entertainment': '#b794ff',
  'Healthcare':    '#ffa94d',
  'Utilities':     '#5dd4f4',
  'Salary':        '#4fffb0',
  'Freelance':     '#a8ff78',
  'Investment':    '#f7c948',
  'Other':         '#9ba3bc',
};

export const MONTHS_LABELS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
export const MONTHS_KEYS   = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03'];
