import { createContext, useContext, useState, useCallback } from 'react'

const ToastCtx = createContext(null)
export const useToast = () => useContext(ToastCtx)

const COLORS = {
  info:    'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200',
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-200',
  warn:    'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-200',
  error:   'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200'
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const showToast = useCallback((message, type = 'info', duration = 4500) => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
  }, [])

  return (
    <ToastCtx.Provider value={showToast}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(({ id, message, type }) => (
          <div key={id}
            className={`pointer-events-auto border rounded-2xl px-4 py-3 text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-2 ${COLORS[type]}`}
            role="alert">
            {message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}
