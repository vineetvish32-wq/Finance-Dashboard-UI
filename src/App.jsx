import { Toaster } from 'react-hot-toast'
import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import styles from './App.module.css'

function Layout() {
  const { page } = useApp()

  return (
    <div className={styles.shell}>
      <Navbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          {page === 'dashboard'    && <Dashboard />}
          {page === 'transactions' && <Transactions />}
          {page === 'insights'     && <Insights />}
        </main>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg2)',
            color: 'var(--text)',
            border: '1px solid var(--border2)',
            fontFamily: 'var(--font)',
            fontSize: '13px',
          },
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  )
}
