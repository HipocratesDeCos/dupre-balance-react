import Button from '../components/Button'
import PdfReport from '../components/PdfReport'
import { useBalanceStore } from '../store/useBalanceStore'
import { useToast } from '../components/Toast'
import { generateStory } from '../utils/storytelling'
import { exportBalancePdf } from '../utils/pdfExport'
import { euro } from '../utils/accounting'

export default function BalanceResults() {
  const { computed, setComputed, company, dimension, context } = useBalanceStore()
  const showToast = useToast()

  if (!computed.statements) return null
  const { grouped, totals, adjusted } = computed.statements

  const handleStory = () => {
    const story = generateStory({ company, dimension, context })
    setComputed({ story })
    showToast('Crónica de negocio generada.', 'success')
    setTimeout(() => document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' }), 120)
  }

  const handlePdf = async () => {
    if (!computed.story) {
      showToast('Primero pulsa “Descubrir la historia” para incluir la crónica en el PDF.', 'warn')
      return
    }
    try {
      showToast('Generando PDF...', 'info')
      await exportBalancePdf('pdf-report',
        `informe-balance-${(company.nombre || 'empresa').replace(/\s+/g, '-').toLowerCase()}`)
    } catch (e) {
      showToast('Error al generar el PDF: ' + e.message, 'error')
    }
  }

  return (
    <>
      <div id="balance-results"
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
          rounded-2xl p-5 shadow-sm mt-4">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Balance de situación cuadrado</h2>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold
              ${adjusted
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'}`}>
              {adjusted ? '⚠ Cuadrado con ajuste automático' : '✓ Cuadrado sin ajustes'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[['Activo total', totals.totalActivo], ['PN + Pasivo', totals.totalFinanciacion], ['Patrimonio neto', totals.pn]]
            .map(([label, val]) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-1">{label}</p>
                <strong className="text-slate-800 dark:text-slate-100 font-mono text-base">{euro(val)}</strong>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceTable title="Activo" items={grouped.activo} totalLabel="Total Activo" total={totals.totalActivo} />
          <BalanceTable title="Pasivo + Patrimonio Neto" items={grouped.financiacion} totalLabel="Total PN + Pasivo" total={totals.totalFinanciacion} />
        </div>

        <div className="flex gap-3 flex-wrap mt-6">
          <Button variant="ghost" onClick={handleStory}>Descubrir la historia de la empresa</Button>
          {computed.story && <Button onClick={handlePdf}>Descargar Informe Completo (PDF)</Button>}
        </div>
      </div>

      {computed.story && (
        <div id="story-section"
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
            rounded-2xl p-5 shadow-sm mt-4">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Crónica de negocio</h2>
            <Button onClick={handlePdf}>Descargar Informe PDF</Button>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm">
            {computed.story}
          </p>
        </div>
      )}

      <PdfReport />
    </>
  )
}

function BalanceTable({ title, items, totalLabel, total }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wide">{title}</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 text-slate-400 dark:text-slate-500 font-medium">Partida</th>
            <th className="text-right py-2 text-slate-400 dark:text-slate-500 font-medium">Importe</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-700/40">
              <td className="py-2 pr-2">
                <span className="text-slate-700 dark:text-slate-200 font-medium">{item.nombre}</span><br/>
                <span className="text-xs text-slate-400">{item.categoria}</span>
              </td>
              <td className="text-right py-2 font-mono text-slate-700 dark:text-slate-200 whitespace-nowrap">{euro(item.importe)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-slate-300 dark:border-slate-600">
            <td className="pt-3 font-extrabold text-slate-800 dark:text-slate-100">{totalLabel}</td>
            <td className="text-right pt-3 font-extrabold font-mono text-[#0f4c81] dark:text-[#6fa8d6] whitespace-nowrap">{euro(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
