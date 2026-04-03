import styles from './StatCard.module.css'

export default function StatCard({ label, value, change, changeType = 'up', icon, variant }) {
  return (
    <div className={`${styles.card} ${styles[variant] || ''}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {change && (
        <div className={`${styles.change} ${styles[changeType]}`}>
          {changeType === 'up' ? '↑' : '↓'} {change}
        </div>
      )}
      {icon && <div className={styles.icon}>{icon}</div>}
    </div>
  )
}
