import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/transactions'
import toast from 'react-hot-toast'
import styles from './TransactionModal.module.css'

const EMPTY = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food & Dining',
  date: new Date().toISOString().slice(0, 10),
}

export default function TransactionModal({ isOpen, onClose, editing = null }) {
  const { addTransaction, editTransaction } = useApp()
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (editing) {
      setForm({ ...editing, amount: String(editing.amount) })
    } else {
      setForm(EMPTY)
    }
  }, [editing, isOpen])

  if (!isOpen) return null

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = () => {
    if (!form.description.trim() || !form.amount || !form.date) {
      toast.error('Please fill all fields')
      return
    }
    const payload = { ...form, amount: parseFloat(form.amount) }
    if (editing) {
      editTransaction(payload)
      toast.success('Transaction updated!')
    } else {
      addTransaction(payload)
      toast.success('Transaction added!')
    }
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{editing ? 'Edit Transaction' : 'Add Transaction'}</h2>

        <div className={styles.group}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.control}
            type="text"
            placeholder="e.g. Netflix Subscription"
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Amount (₹)</label>
            <input
              className={styles.control}
              type="number"
              placeholder="0"
              min="1"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Type</label>
            <select className={styles.control} value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Category</label>
            <select className={styles.control} value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Date</label>
            <input
              className={styles.control}
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSubmit}>
            {editing ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
