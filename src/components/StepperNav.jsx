const STEPS = [
  { n: 1, label: 'Datos generales' },
  { n: 2, label: 'Dimensión' },
  { n: 3, label: 'Contexto' },
  { n: 4, label: 'Masas patrimoniales' }
]

export default function StepperNav({ currentStep }) {
  return (
    <nav aria-label="Pasos del formulario"
      className="flex items-center justify-between gap-1 mb-6 bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700 rounded-2xl p-3 shadow-sm">
      {STEPS.map(({ n, label }, i) => {
        const done    = n < currentStep
        const active  = n === currentStep
        const pending = n > currentStep
        return (
          <div key={n} className="flex-1 flex items-center">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${done    ? 'bg-brand-700 text-white' : ''}
                ${active  ? 'bg-brand-700 text-white ring-4 ring-brand-100 dark:ring-brand-900/40' : ''}
                ${pending ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500' : ''}`}>
                {done ? '✓' : n}
              </div>
              <span className={`text-xs mt-1 text-center leading-tight hidden sm:block
                ${active ? 'font-semibold text-brand-700 dark:text-brand-300' : 'text-slate-400 dark:text-slate-500'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 rounded-full transition-colors
                ${done ? 'bg-brand-700' : 'bg-slate-200 dark:bg-slate-700'}`} />
            )}
          </div>
        )
      })}
    </nav>
  )
}
