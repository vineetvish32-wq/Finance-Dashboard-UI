import { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { useCategories, useMonthOptions } from '../hooks/useFinanceData'
import TransactionTable from '../components/TransactionTable'
import TransactionModal from '../components/TransactionModal'
import styles from './Transactions.module.css'

export default function Transactions() {
  const { transactions, role } = useApp()
  const categories   = useCategories()
  const monthOptions = useMonthOptions()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing,   setEditing]   = useState(null)
  const [search,    setSearch]    = useState('')
  const [typeFilter, setType]     = useState('')
  const [catFilter,  setCat]      = useState('')
  const [monthFilter, setMonth]   = useState('')

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (search && !t.description.toLowerCase().includes(search.toLowerCase()) &&
          !t.category.toLowerCase().includes(search.toLowerCase())) return false
      if (typeFilter  && t.type     !== typeFilter)               return false
      if (catFilter   && t.category !== catFilter)                return false
      if (monthFilter && !t.date.startsWith(monthFilter))        return false
      return true
    })
  }, [transactions, search, typeFilter, catFilter, monthFilter])

  const openAdd  = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (t) => { setEditing(t);   setModalOpen(true) }

  const fmtMonth = m => {
    const d = new Date(m + '-01')
    return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Transactions</h1>
          <p className={styles.sub}>Browse, filter, sort and manage all your transactions.</p>
        </div>
        {role === 'admin' && (
          <button className={styles.addBtn} onClick={openAdd}>+ Add Transaction</button>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="🔍  Search description or category…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ minWidth: 220 }}
        />
        <select className={styles.filterInput} value={typeFilter} onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className={styles.filterInput} value={catFilter} onChange={e => setCat(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className={styles.filterInput} value={monthFilter} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {monthOptions.map(m => <option key={m} value={m}>{fmtMonth(m)}</option>)}
        </select>
        {(search || typeFilter || catFilter || monthFilter) && (
          <button className={styles.clearBtn} onClick={() => { setSearch(''); setType(''); setCat(''); setMonth('') }}>
            ✕ Clear
          </button>
        )}
      </div>

      <TransactionTable transactions={filtered} showActions={true} onEdit={openEdit} />

      <div className={styles.count}>
        Showing <strong>{filtered.length}</strong> of <strong>{transactions.length}</strong> transactions
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
      />
    </div>
  )
}
