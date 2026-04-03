import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORY_COLORS } from '../data/transactions'
import toast from 'react-hot-toast'
import styles from './TransactionTable.module.css'

const fmt = n => '₹' + n.toLocaleString('en-IN')

function CategoryDot({ category }) {
  return (
    <span
      className={styles.catDot}
      style={{ background: CATEGORY_COLORS[category] || '#9ba3bc' }}
    />
  )
}

export default function TransactionTable({ transactions, showActions = true, onEdit }) {
  const { role, deleteTransaction } = useApp()
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState(-1)

  const handleSort = key => {
    if (sortKey === key) setSortDir(d => d * -1)
    else { setSortKey(key); setSortDir(-1) }
  }

  const sorted = [...transactions].sort((a, b) => {
    const va = sortKey === 'amount' ? a.amount : a[sortKey]
    const vb = sortKey === 'amount' ? b.amount : b[sortKey]
    if (va < vb) return -sortDir
    if (va > vb) return sortDir
    return 0
  })

  const handleDelete = (id) => {
    deleteTransaction(id)
    toast.error('Transaction deleted')
  }

  if (sorted.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <p>No transactions found</p>
      </div>
    )
  }

  const SortIcon = ({ col }) => (
    <span className={styles.sortIcon}>
      {sortKey === col ? (sortDir === 1 ? '↑' : '↓') : '↕'}
    </span>
  )

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('date')} className={styles.th}>
              Date <SortIcon col="date" />
            </th>
            <th onClick={() => handleSort('description')} className={styles.th}>
              Description <SortIcon col="description" />
            </th>
            <th onClick={() => handleSort('category')} className={styles.th}>
              Category <SortIcon col="category" />
            </th>
            <th onClick={() => handleSort('type')} className={styles.th}>
              Type <SortIcon col="type" />
            </th>
            <th onClick={() => handleSort('amount')} className={`${styles.th} ${styles.right}`}>
              Amount <SortIcon col="amount" />
            </th>
            {showActions && role === 'admin' && <th className={styles.th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map(t => (
            <tr key={t.id} className={styles.row}>
              <td className={`${styles.td} ${styles.mono} ${styles.muted}`}>{t.date}</td>
              <td className={`${styles.td} ${styles.desc}`}>{t.description}</td>
              <td className={styles.td}>
                <span className={styles.catBadge}>
                  <CategoryDot category={t.category} />
                  {t.category}
                </span>
              </td>
              <td className={styles.td}>
                <span className={`${styles.badge} ${styles[t.type]}`}>
                  {t.type === 'income' ? 'Income' : 'Expense'}
                </span>
              </td>
              <td className={`${styles.td} ${styles.right} ${styles.mono} ${styles[t.type + 'Amt']}`}>
                {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
              </td>
              {showActions && role === 'admin' && (
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => onEdit && onEdit(t)}
                      title="Edit"
                    >✏️</button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(t.id)}
                      title="Delete"
                    >✕</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
