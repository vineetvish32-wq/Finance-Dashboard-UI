import { useMemo } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { useApp } from '../context/AppContext'
import { useMonthlyData, useCategoryData } from '../hooks/useFinanceData'
import { MONTHS_LABELS, CATEGORY_COLORS } from '../data/transactions'
import styles from './Insights.module.css'

const fmt = n => '₹' + n.toLocaleString('en-IN')

function chartDefaults(theme) {
  const dark = theme === 'dark'
  return {
    grid:  dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    tick:  dark ? '#9ba3bc' : '#4a5270',
    tooltip: {
      backgroundColor: dark ? '#252d3f' : '#fff',
      titleColor:      dark ? '#e8eaf2' : '#1a1f35',
      bodyColor:       dark ? '#9ba3bc' : '#4a5270',
      borderColor:     dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
      borderWidth: 1,
    },
  }
}

function InsightCard({ label, value, desc, progress, color }) {
  return (
    <div className={styles.insightCard}>
      <div className={styles.insightLabel}>{label}</div>
      <div className={styles.insightValue}>{value}</div>
      <div className={styles.insightDesc}>{desc}</div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${Math.min(Math.max(progress, 0), 100)}%`, background: color }} />
      </div>
    </div>
  )
}

export default function Insights() {
  const { transactions, theme } = useApp()
  const monthly = useMonthlyData()
  const catData = useCategoryData('2026-03')
  const c = chartDefaults(theme)

  // Derived insights
  const insights = useMemo(() => {
    const march  = transactions.filter(t => t.date.startsWith('2026-03'))
    const feb    = transactions.filter(t => t.date.startsWith('2026-02'))
    const expenses = march.filter(t => t.type === 'expense')
    const income   = march.filter(t => t.type === 'income')
    const totalExp = expenses.reduce((a, t) => a + t.amount, 0)
    const totalInc = income.reduce((a, t)   => a + t.amount, 0)
    const febExp   = feb.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0)
    const catMap   = {}
    expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount })
    const topCat   = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0] || ['N/A', 0]
    const expDiff  = febExp > 0 ? Math.round((totalExp - febExp) / febExp * 100) : 0
    const savRate  = totalInc > 0 ? Math.round(((totalInc - totalExp) / totalInc) * 100) : 0
    const avgTxn   = expenses.length > 0 ? Math.round(totalExp / expenses.length) : 0
    return { topCat, expDiff, savRate, avgTxn, totalExp, totalInc, expenses, catMap, totalSaved: totalInc - totalExp }
  }, [transactions])

  const catRows = Object.entries(insights.catMap).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const total   = catRows.reduce((a, [, v]) => a + v, 0)

  // Grouped bar chart: Jan / Feb / Mar per category
  const TOP_CATS = ['Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Utilities']
  const M3 = ['2026-01', '2026-02', '2026-03']
  const M3L = ['Jan', 'Feb', 'Mar']
  const barColors = ['rgba(108,143,255,0.8)', 'rgba(255,107,138,0.8)', 'rgba(183,148,255,0.8)']

  const insightBarData = {
    labels: TOP_CATS,
    datasets: M3.map((m, i) => ({
      label: M3L[i],
      data: TOP_CATS.map(cat =>
        transactions.filter(t => t.date.startsWith(m) && t.category === cat && t.type === 'expense')
          .reduce((a, t) => a + t.amount, 0)
      ),
      backgroundColor: barColors[i],
      borderRadius: 5,
    })),
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: c.tick, font: { family: 'DM Sans' }, boxWidth: 12, padding: 12 },
      },
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

  // Savings line chart
  const savingsData = {
    labels: MONTHS_LABELS,
    datasets: [{
      label: 'Net Savings',
      data: monthly.map(d => d.savings),
      borderColor: '#4fffb0',
      backgroundColor: 'rgba(79,255,176,0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4fffb0',
      pointRadius: 5,
    }],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...c.tooltip,
        callbacks: { label: ctx => `Savings: ${fmt(ctx.parsed.y)}` },
      },
    },
    scales: {
      x: { grid: { color: c.grid }, ticks: { color: c.tick } },
      y: { grid: { color: c.grid }, ticks: { color: c.tick, callback: v => v >= 1000 ? '₹' + (v/1000).toFixed(0) + 'K' : '₹' + v } },
    },
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Insights</h1>
        <p className={styles.sub}>Smart observations from your financial activity — March 2026.</p>
      </div>

      {/* Insight Cards */}
      <div className={styles.insightsGrid}>
        <InsightCard
          label="Top Spending Category"
          value={insights.topCat[0]}
          desc={`${fmt(insights.topCat[1])} spent this month`}
          progress={insights.totalExp > 0 ? Math.round(insights.topCat[1] / insights.totalExp * 100) : 0}
          color="#6c8fff"
        />
        <InsightCard
          label="Monthly Expense Change"
          value={(insights.expDiff >= 0 ? '+' : '') + insights.expDiff + '%'}
          desc={`vs February 2026`}
          progress={Math.min(Math.abs(insights.expDiff), 100)}
          color={insights.expDiff > 0 ? '#ff6b8a' : '#4fffb0'}
        />
        <InsightCard
          label="Savings Rate"
          value={insights.savRate + '%'}
          desc={`${fmt(insights.totalSaved)} saved this month`}
          progress={Math.max(0, insights.savRate)}
          color="#4fffb0"
        />
        <InsightCard
          label="Average Transaction"
          value={fmt(insights.avgTxn)}
          desc={`Over ${insights.expenses.length} expense transactions`}
          progress={Math.min(Math.round(insights.avgTxn / 500), 100)}
          color="#b794ff"
        />
      </div>

      {/* Category Breakdown */}
      <div className={styles.breakdownCard}>
        <div className={styles.chartTitle}>Spending Breakdown — March 2026</div>
        <div className={styles.catRows}>
          {catRows.map(([cat, val]) => (
            <div key={cat} className={styles.catRow}>
              <span className={styles.catLabel}>{cat}</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: total > 0 ? `${Math.round(val / total * 100)}%` : '0%',
                    background: CATEGORY_COLORS[cat] || '#9ba3bc',
                  }}
                />
              </div>
              <span className={styles.catVal}>{fmt(val)}</span>
              <span className={styles.catPct}>{total > 0 ? Math.round(val / total * 100) : 0}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Monthly Spending by Category</div>
          <div className={styles.chartSub}>Jan – Mar 2026 comparison</div>
          <div className={styles.chartWrap}>
            <Bar data={insightBarData} options={barOptions} />
          </div>
        </div>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Net Savings Trend</div>
          <div className={styles.chartSub}>Last 6 months</div>
          <div className={styles.chartWrap}>
            <Line data={savingsData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
