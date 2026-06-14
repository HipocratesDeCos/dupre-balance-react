import { useBalanceStore } from '../store/useBalanceStore'
import { resolveDimension, dimensionLabel } from '../utils/dimension'
import Button from '../components/Button'
import FormField, { Input, Select } from '../components/FormField'

export default function StepDimension() {
  const { dimension, setDimension, setStep } = useBalanceStore()

  const update = (data) => {
    const merged = { ...dimension, ...data }
    setDimension({ ...merged, resolved: resolveDimension(merged) })
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
      rounded-2xl p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Dimensión de la empresa</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Define el tamaño por empleados, volumen de negocio o selección directa</p>
      </div>

      <FormField label="Método de cálculo" id="mode">
        <Select id="mode" value={dimension.mode} onChange={e => update({ mode: e.target.value })}>
          <option value="nempleados">Por número de empleados</option>
          <option value="volumen">Por volumen de negocio (€)</option>
          <option value="rango">Selección directa</option>
        </Select>
      </FormField>

      {dimension.mode === 'nempleados' && (
        <FormField label="Número de empleados" id="nempleados">
          <Input id="nempleados" type="number" min={0} value={dimension.nempleados}
            onChange={e => update({ nempleados: Number(e.target.value) })} />
        </FormField>
      )}
      {dimension.mode === 'volumen' && (
        <FormField label="Volumen de negocio anual (€)" id="volumen">
          <Input id="volumen" type="number" min={0} step={10000} value={dimension.volumen}
            onChange={e => update({ volumen: Number(e.target.value) })} />
        </FormField>
      )}
      {dimension.mode === 'rango' && (
        <FormField label="Tamaño" id="rango">
          <Select id="rango" value={dimension.rango} onChange={e => update({ rango: e.target.value })}>
            {Object.entries(dimensionLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </Select>
        </FormField>
      )}

      <div className="bg-brand-50 dark:bg-slate-900/50 rounded-xl px-4 py-3 text-sm">
        <span className="text-slate-500 dark:text-slate-400">Dimensión calculada: </span>
        <strong className="text-brand-700 dark:text-brand-300">{dimensionLabel[dimension.resolved]}</strong>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={() => setStep(1)}>← Anterior</Button>
        <Button onClick={() => setStep(3)}>Siguiente →</Button>
      </div>
    </div>
  )
}
