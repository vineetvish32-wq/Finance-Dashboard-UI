import { useState, useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, ArcElement, Tooltip, Legend, Filler,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useApp } from '../context/AppContext'
import { useMonthStats, useMonthlyData, useCategoryData } from '../hooks/useFinanceData'
import { MONTHS_LABELS, CATEGORY_COLORS } from '../data/transactions'
import StatCard from '../components/StatCard'
import TransactionTable from '../components/TransactionTable'
import TransactionModal from '../components/TransactionModal'
import styles from './Dashboard.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler)

const fmt = n => '₹' + n.toLocaleString('en-IN')

function chartDefaults(theme) {
  const dark = theme === 'dark'
  return {
    grid:   dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    tick:   dark ? '#9ba3bc' : '#4a5270',
    tooltip: {
      backgroundColor: dark ? '#252d3f' : '#fff',
      titleColor:      dark ? '#e8eaf2' : '#1a1f35',
      bodyColor:       dark ? '#9ba3bc' : '#4a5270',
      borderColor:     dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
      borderWidth: 1,
    },
  }
}

export default function Dashboard() {
  const { role, theme } = useApp()
  const stats    = useMonthStats('2026-03')
  const monthly  = useMonthlyData()
  const catData  = useCategoryData('2026-03')
  const { transactions } = useApp()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing,   setEditing]   = useState(null)

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  const c = chartDefaults(theme)

  const trendData = {
    labels: MONTHS_LABELS,
    datasets: [
      {
        label: 'Income',
        data: monthly.map(d => d.income),
        backgroundColor: 'rgba(108,143,255,0.75)',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Expenses',
        data: monthly.map(d => d.expense),
        backgroundColor: 'rgba(255,107,138,0.75)',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...c.tooltip,
        callbacks: { label: ctx => `${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` },
      },
    },
    scales: {
      x: { grid: { color: c.grid }, ticks: { color: c.tick } },
      y: { grid: { color: c.grid }, ticks: { color: c.tick, callback: v => v >= 1000 ? '₹' + (v/1000).toFixed(0) + 'K' : '₹' + v } },
    },
  }

  const donutColors = catData.map(([cat]) => CATEGORY_COLORS[cat] || '#9ba3bc')
  const donutData = {
    labels: catData.map(([cat]) => cat),
    datasets: [{
      data: catData.map(([, v]) => v),
      backgroundColor: donutColors,
      borderWidth: 2,
      borderColor: theme === 'dark' ? '#161b27' : '#ffffff',
    }],
  }
  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        ...c.tooltip,
        callbacks: { label: ctx => `${ctx.label}: ${fmt(ctx.parsed)}` },
      },
    },
  }

  const total = catData.reduce((a, [, v]) => a + v, 0)

  const openAdd  = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (t) => { setEditing(t);   setModalOpen(true) }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Welcome back! Here's your financial summary for March 2026.</p>
        </div>
        {role === 'admin' && (
          <button className={styles.addBtn} onClick={openAdd}>+ Add Transaction</button>
        )}
      </div>

      {/* Stat Cards */}
      <div className={styles.statsGrid}>
        <StatCard variant="balance" label="Total Balance"  value={fmt(stats.balance)}     icon="💰" change="12.4% vs last month" changeType="up" />
        <StatCard variant="income"  label="Total Income"   value={fmt(stats.income)}      icon="📈" change="8.2% vs last month"  changeType="up" />
        <StatCard variant="expense" label="Total Expenses" value={fmt(stats.expense)}     icon="📉" change="3.1% vs last month"  changeType="down" />
        <StatCard variant="savings" label="Savings Rate"   value={stats.savingsRate + '%'} icon="🏦" change="5.0% vs last month"  changeType="up" />
      </div>

      {/* Charts */}
      <div className={styles.chartsGrid}>
        {/* Trend */}
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Balance Trend</div>
          <div className={styles.chartSub}>Monthly income vs expenses — last 6 months</div>
          <div className={styles.chartWrap}>
            <Bar data={trendData} options={trendOptions} />
          </div>
          <div className={styles.legend}>
            <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: '#6c8fff' }} />Income</div>
            <div className={styles.legendItem}><span className={styles.legendDot} style={{ background: '#ff6b8a' }} />Expenses</div>
          </div>
        </div>

        {/* Donut */}
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Spending by Category</div>
          <div className={styles.chartSub}>This month's breakdown</div>
          <div className={styles.donutWrap}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>
          <div className={styles.legend}>
            {catData.slice(0, 5).map(([cat, val]) => (
              <div key={cat} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: CATEGORY_COLORS[cat] || '#9ba3bc' }} />
                {cat} {total > 0 ? Math.round(val / total * 100) : 0}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Recent Transactions</span>
      </div>
      <TransactionTable transactions={recent} showActions={true} onEdit={openEdit} />

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
      />
    </div>
  )
}
