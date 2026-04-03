import { createContext, useContext, useReducer, useState } from 'react'
import { INITIAL_TRANSACTIONS } from '../data/transactions'

const AppContext = createContext(null)

// ── Reducer ──────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TXN':
      return { ...state, transactions: [action.payload, ...state.transactions], nextId: state.nextId + 1 }
    case 'DELETE_TXN':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) }
    case 'EDIT_TXN':
      return { ...state, transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t) }
    default:
      return state
  }
}

// ── Provider ─────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    transactions: INITIAL_TRANSACTIONS,
    nextId: 29,
  })

  const [role, setRole]   = useState('admin')   // 'admin' | 'viewer'
  const [theme, setTheme] = useState('dark')    // 'dark' | 'light'
  const [page, setPage]   = useState('dashboard')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('light', next === 'light')
  }

  const addTransaction = (data) => {
    dispatch({ type: 'ADD_TXN', payload: { ...data, id: state.nextId } })
  }

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TXN', payload: id })
  }

  const editTransaction = (data) => {
    dispatch({ type: 'EDIT_TXN', payload: data })
  }

  return (
    <AppContext.Provider value={{
      transactions: state.transactions,
      nextId: state.nextId,
      role, setRole,
      theme, toggleTheme,
      page, setPage,
      addTransaction,
      deleteTransaction,
      editTransaction,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
