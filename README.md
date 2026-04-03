# FinFlow — Finance Dashboard

A clean, interactive finance dashboard built with **React + Vite** as a Frontend Developer Intern assignment for Zorvyn FinTech.

---

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | React 18                            |
| Build Tool    | Vite 5                              |
| Charts        | Chart.js 4 + react-chartjs-2        |
| State         | React Context API + useReducer      |
| Styling       | CSS Modules + CSS Custom Properties |
| Notifications | react-hot-toast                     |
| Fonts         | DM Sans + DM Mono (Google Fonts)    |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Visit `http://localhost:5173` after running `npm run dev`.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .module.css         # Top navigation bar
│   ├── Sidebar.jsx / .module.css        # Left navigation sidebar
│   ├── StatCard.jsx / .module.css       # Summary stat cards
│   ├── TransactionTable.jsx / .module.css  # Sortable transactions table
│   └── TransactionModal.jsx / .module.css  # Add / Edit modal
├── context/
│   └── AppContext.jsx                   # Global state (Context + useReducer)
├── data/
│   └── transactions.js                  # Mock data & constants
├── hooks/
│   └── useFinanceData.js                # Custom hooks for derived data
├── pages/
│   ├── Dashboard.jsx / .module.css      # Main overview page
│   ├── Transactions.jsx / .module.css   # Full transactions list
│   └── Insights.jsx / .module.css       # Analytics & insights
├── App.jsx / App.module.css             # Root layout + page routing
├── main.jsx                             # React entry point
└── index.css                            # Global CSS variables & reset
```

---

## Features

### Dashboard Overview
- Summary cards: Total Balance, Income, Expenses, Savings Rate
- Bar chart: 6-month income vs expense trend
- Doughnut chart: Spending breakdown by category
- Recent transactions table (last 5)

### Transactions
- Full list of all transactions
- **Search** by description or category
- **Filter** by type (Income/Expense), category, and month
- **Sort** by any column (click column headers)
- Clear all filters with one button
- Add, Edit, Delete (Admin only)

### Insights
- Top spending category with progress bar
- Month-over-month expense change
- Savings rate with visual indicator
- Average transaction value
- Full category breakdown with bar chart
- Grouped bar chart: Jan–Mar category comparison
- Net savings trend line chart

### Role-Based UI (RBAC)
Switch roles via the top-right dropdown:

| Feature              | Admin | Viewer |
|----------------------|-------|--------|
| View all data        | ✅    | ✅     |
| Add transactions     | ✅    | ❌     |
| Edit transactions    | ✅    | ❌     |
| Delete transactions  | ✅    | ❌     |

### State Management
- Single `AppContext` with `useReducer` handles all transaction mutations
- Custom hooks (`useMonthStats`, `useMonthlyData`, `useCategoryData`) derive computed values reactively
- All filters and UI state are local component state

### UX Details
- Dark / Light theme toggle (persists via CSS variables on `<html>`)
- Smooth page transitions with CSS animations
- Modal with keyboard-friendly overlay dismiss
- Toast notifications for all actions
- Empty state for filtered results
- Fully responsive — works on mobile, tablet, desktop

---

## Assumptions

- Data is mock/static (no backend); state resets on page refresh
- "Month" defaults to March 2026 for stats and insights
- Role switching is frontend-only for demonstration purposes

---

## Optional Enhancements Implemented
- ✅ Dark / Light mode
- ✅ Edit transactions (not just add/delete)
- ✅ Animated page transitions
- ✅ Toast notifications
- ✅ Responsive layout
