import { useApp } from '../context/AppContext'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { key: 'dashboard',    icon: '📊', label: 'Dashboard'    },
  { key: 'transactions', icon: '💳', label: 'Transactions' },
  { key: 'insights',     icon: '💡', label: 'Insights'     },
]

export default function Sidebar() {
  const { page, setPage, role } = useApp()

  return (
    <aside className={styles.aside}>
      <div className={styles.section}>Menu</div>
      {NAV_ITEMS.map(item => (
        <button
          key={item.key}
          className={`${styles.navItem} ${page === item.key ? styles.active : ''}`}
          onClick={() => setPage(item.key)}
        >
          <span className={styles.icon}>{item.icon}</span>
          {item.label}
        </button>
      ))}

      <div className={styles.section} style={{ marginTop: 'auto' }}>Account</div>
      <div className={styles.navItem}>
        <span className={styles.icon}>👤</span>
        <span style={{ textTransform: 'capitalize' }}>{role}</span>
      </div>
    </aside>
  )
}
