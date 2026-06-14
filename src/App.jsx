import { useEffect } from 'react'
import { ToastProvider } from './components/Toast'
import { useBalanceStore } from './store/useBalanceStore'
import StepperNav from './components/StepperNav'
import StepGeneralData from './pages/StepGeneralData'
import StepDimension from './pages/StepDimension'
import StepContext from './pages/StepContext'
import StepBalance from './pages/StepBalance'
import BalanceResults from './pages/BalanceResults'

function AppLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      aria-label="Logo DUPRE Balance" role="img">
      <rect width="40" height="40" rx="12" fill="#0f4c81"/>
      <path d="M8 12h24M13 12l7-4 7 4M20 8v20M10 18l-3 8h6l-3-8Zm20 0-3 8h6l-3-8ZM7 28h26"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ThemeToggle() {
  const toggle = () => {
    const html = document.documentElement
    html.setAttribute('data-theme',
      html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')
  }
  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema claro/oscuro"
      className="min-w-[44px] min-h-[44px] rounded-[14px] border border-slate-200
        dark:border-slate-700 bg-white dark:bg-slate-800
        text-slate-600 dark:text-slate-300 text-lg
        hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
    >
      ◐
    </button>
  )
}

const STEP_COMPONENTS = {
  1: <StepGeneralData />,
  2: <StepDimension />,
  3: <StepContext />,
  4: <StepBalance />
}

export default function App() {
  const { currentStep } = useBalanceStore()

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
  }, [])

  return (
    <ToastProvider>
      <div className="max-w-[960px] mx-auto px-4 py-5 pb-24">
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <AppLogo />
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                Generador de Balance PGC
              </h1>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Método DUPRE finanzas
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>
        <StepperNav currentStep={currentStep} />
        {STEP_COMPONENTS[currentStep]}
        <BalanceResults />
      </div>
    </ToastProvider>
  )
}
