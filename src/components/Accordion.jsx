import { useState } from 'react'

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5
          bg-white dark:bg-slate-800 text-left
          hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        aria-expanded={open}>
        <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{title}</span>
        <span className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-4 py-4 bg-slate-50 dark:bg-slate-900/40 border-t
          border-slate-100 dark:border-slate-700/50">
          {children}
        </div>
      )}
    </div>
  )
}
