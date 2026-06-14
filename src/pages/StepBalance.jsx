import { useBalanceStore } from '../store/useBalanceStore'
import { validateAndAdjustBalance } from '../utils/accounting'
import { DEFAULT_ITEMS_BY_DIMENSION } from '../utils/dimension'
import { useToast } from '../components/Toast'
import Switch from '../components/Switch'
import Button from '../components/Button'
import FormField, { Input, Select } from '../components/FormField'

const CATEGORIAS = [
  'Activo No Corriente','Activo Corriente',
  'Patrimonio Neto','Pasivo No Corriente','Pasivo Corriente'
]

export default function StepBalance() {
  const { balanceInput, setBalanceInput, dimension, setComputed, resetComputed, setStep } = useBalanceStore()
  const showToast = useToast()

  const items = balanceInput.lineItems

  const addItem = () => setBalanceInput({
    lineItems: [...items, { nombre: '', importe: 0, categoria: 'Activo Corriente' }]
  })

  const removeItem = (i) => setBalanceInput({
    lineItems: items.filter((_, idx) => idx !== i)
  })

  const updateItem = (i, field, value) => {
    const updated = items.map((item, idx) => idx === i ? { ...item, [field]: value } : item)
    setBalanceInput({ lineItems: updated })
  }

  const toggleDetailed = (val) => {
    if (!val) {
      setBalanceInput({
        useDetailed: false,
        lineItems: DEFAULT_ITEMS_BY_DIMENSION[dimension.resolved] || DEFAULT_ITEMS_BY_DIMENSION.pequena
      })
    } else {
      setBalanceInput({ useDetailed: true })
    }
    resetComputed()
  }

  const handleCalc = () => {
    try {
      const result = validateAndAdjustBalance(items)
      setComputed({ statements: result })
      if (result.adjusted) {
        showToast(`⚠️ ${result.adjustmentMessage}`, 'warn', 7000)
      } else {
        showToast('✔️ Balance cuadrado correctamente.', 'success')
      }
      setTimeout(() => {
        document.getElementById('balance-results')?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } catch (e) {
      showToast(e.message, 'error', 6000)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
      rounded-2xl p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Masas patrimoniales</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          Define las partidas del balance de situación
        </p>
      </div>

      <Switch
        id="detailed-switch"
        label="¿Desea especificar importes detallados?"
        description="Si no, se usarán valores de plantilla según la dimensión de la empresa."
        checked={balanceInput.useDetailed}
        onChange={toggleDetailed}
      />

      {balanceInput.useDetailed && (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_120px_160px_40px] gap-2 items-end">
              <FormField label={i === 0 ? 'Partida' : ''} id={`nombre-${i}`}>
                <Input id={`nombre-${i}`} value={item.nombre} placeholder="Nombre de la partida"
                  onChange={e => updateItem(i, 'nombre', e.target.value)} />
              </FormField>
              <FormField label={i === 0 ? 'Importe (€)' : ''} id={`importe-${i}`}>
                <Input id={`importe-${i}`} type="number" value={item.importe}
                  onChange={e => updateItem(i, 'importe', Number(e.target.value))} />
              </FormField>
              <FormField label={i === 0 ? 'Categoría' : ''} id={`cat-${i}`}>
                <Select id={`cat-${i}`} value={item.categoria}
                  onChange={e => updateItem(i, 'categoria', e.target.value)}>
                  {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                </Select>
              </FormField>
              <div className={i === 0 ? 'pt-6' : ''}>
                <button onClick={() => removeItem(i)}
                  aria-label="Eliminar partida"
                  className="min-w-[40px] h-11 rounded-[14px] text-red-400 hover:text-red-600
                    hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-lg">
                  ×
                </button>
              </div>
            </div>
          ))}
          <Button variant="ghost" onClick={addItem} className="self-start">+ Añadir partida</Button>
        </div>
      )}

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={() => setStep(3)}>← Anterior</Button>
        <Button onClick={handleCalc}>Calcular balance →</Button>
      </div>
    </div>
  )
}
