import { useApp } from '../context/AppContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { role, setRole, theme, toggleTheme } = useApp()

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>F</div>
        <span>Fin<span className={styles.brandAccent}>Flow</span></span>
      </div>

      <div className={styles.right}>
        <div className={styles.roleWrapper}>
          <span className={styles.roleLabel}>Role:</span>
          <select
            className={styles.roleSelect}
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <span className={`${styles.roleBadge} ${styles[role]}`}>
            {role === 'admin' ? '⚙ Admin' : '👁 Viewer'}
          </span>
        </div>

        <button className={styles.themeBtn} onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
