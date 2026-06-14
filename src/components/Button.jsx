export default function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false, className = '' }) {
  const base = 'min-h-[44px] px-5 rounded-[14px] text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-brand-700 hover:bg-brand-500 active:bg-brand-900 text-white shadow-sm focus-visible:ring-brand-700',
    ghost:   'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 focus-visible:ring-brand-700',
    danger:  'bg-red-600 hover:bg-red-500 text-white focus-visible:ring-red-500'
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
