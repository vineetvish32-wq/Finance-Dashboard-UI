import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { MONTHS_KEYS } from '../data/transactions'

// Summary stats for a given month prefix e.g. '2026-03'
export function useMonthStats(monthKey = '2026-03') {
  const { transactions } = useApp()
  return useMemo(() => {
    const month = transactions.filter(t => t.date.startsWith(monthKey))
    const income  = month.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0)
    const expense = month.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0)
    const balance = income - expense
    const savingsRate = income > 0 ? Math.round((balance / income) * 100) : 0
    return { income, expense, balance, savingsRate }
  }, [transactions, monthKey])
}

// Monthly breakdown for last 6 months (for charts)
export function useMonthlyData() {
  const { transactions } = useApp()
  return useMemo(() => {
    return MONTHS_KEYS.map(m => {
      const income  = transactions.filter(t => t.date.startsWith(m) && t.type === 'income').reduce((a, t) => a + t.amount, 0)
      const expense = transactions.filter(t => t.date.startsWith(m) && t.type === 'expense').reduce((a, t) => a + t.amount, 0)
      return { month: m, income, expense, savings: income - expense }
    })
  }, [transactions])
}

// Category breakdown for a given month (expenses only)
export function useCategoryData(monthKey = '2026-03') {
  const { transactions } = useApp()
  return useMemo(() => {
    const expenses = transactions.filter(t => t.date.startsWith(monthKey) && t.type === 'expense')
    const map = {}
    expenses.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [transactions, monthKey])
}

// All unique categories from transactions
export function useCategories() {
  const { transactions } = useApp()
  return useMemo(() => [...new Set(transactions.map(t => t.category))].sort(), [transactions])
}

// All unique year-month strings e.g. ['2026-03', '2026-02', ...]
export function useMonthOptions() {
  const { transactions } = useApp()
  return useMemo(() => [...new Set(transactions.map(t => t.date.slice(0, 7)))].sort().reverse(), [transactions])
}
