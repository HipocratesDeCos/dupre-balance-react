export default function FormField({ label, id, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>}
    </div>
  )
}

export function Input({ id, value, onChange, type = 'text', placeholder, min, max, step }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      autoComplete="off"
      spellCheck={false}
      className="h-11 px-4 rounded-[14px] border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100
        placeholder:text-slate-300 dark:placeholder:text-slate-600
        focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent
        text-sm transition-all w-full"
    />
  )
}

export function Select({ id, value, onChange, children }) {
  return (
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="h-11 px-4 rounded-[14px] border border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100
        focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent
        text-sm transition-all w-full appearance-none cursor-pointer">
      {children}
    </select>
  )
}
