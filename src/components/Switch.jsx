export default function Switch({ id, label, description, checked, onChange }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700
      bg-white dark:bg-slate-800">
      <div className="flex-1">
        <label htmlFor={id} className="font-medium text-slate-800 dark:text-slate-100 text-sm cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        id={id} role="switch" aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all flex-shrink-0 mt-0.5
          focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2
          ${checked ? 'bg-brand-700' : 'bg-slate-300 dark:bg-slate-600'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
          ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}
