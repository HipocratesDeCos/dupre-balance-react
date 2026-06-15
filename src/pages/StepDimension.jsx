import { useState } from 'react'
import { useBalanceStore } from '../store/useBalanceStore'
import { resolveDimension, dimensionLabel } from '../utils/dimension'
import Button from '../components/Button'
import FormField, { Input, Select } from '../components/FormField'

export default function StepDimension() {
  const { dimension, setDimension, setStep } = useBalanceStore()

  const [local, setLocal] = useState({
    mode: dimension.mode,
    nempleados: dimension.nempleados,
    volumen: dimension.volumen,
    rango: dimension.rango
  })

  const update = (field, val) => setLocal(prev => ({ ...prev, [field]: val }))

  const resolved = resolveDimension(local)

  const handleNext = () => {
    setDimension({ ...local, resolved })
    setStep(3)
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
      rounded-2xl p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Dimensión de la empresa</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          Define el tamaño por empleados, volumen de negocio o selección directa
        </p>
      </div>

      <FormField label="Método de cálculo" id="mode">
        <Select id="mode" value={local.mode} onChange={e => update('mode', e.target.value)}>
          <option value="nempleados">Por número de empleados</option>
          <option value="volumen">Por volumen de negocio (€)</option>
          <option value="rango">Selección directa</option>
        </Select>
      </FormField>

      {local.mode === 'nempleados' && (
        <FormField
          label="Número de empleados"
          id="nempleados"
          hint="Microempresa < 10 • Pequeña 10–49 • Mediana 50–249 • Grande ≥ 250">
          <Input
            id="nempleados"
            type="number"
            min={0}
            value={local.nempleados}
            onChange={e => update('nempleados', Number(e.target.value))}
          />
        </FormField>
      )}

      {local.mode === 'volumen' && (
        <FormField
          label="Volumen de negocio anual (€)"
          id="volumen"
          hint="Microempresa < 2M€ • Pequeña 2–10M€ • Mediana 10–50M€ • Grande ≥ 50M€">
          <Input
            id="volumen"
            type="number"
            min={0}
            step={10000}
            value={local.volumen}
            onChange={e => update('volumen', Number(e.target.value))}
          />
        </FormField>
      )}

      {local.mode === 'rango' && (
        <FormField label="Tamaño de empresa" id="rango">
          <Select id="rango" value={local.rango} onChange={e => update('rango', e.target.value)}>
            {Object.entries(dimensionLabel).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </Select>
        </FormField>
      )}

      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl px-4 py-3 text-sm">
        <span className="text-slate-500 dark:text-slate-400">Dimensión calculada: </span>
        <strong className="text-slate-800 dark:text-slate-100">{dimensionLabel[resolved]}</strong>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={() => setStep(1)}>← Anterior</Button>
        <Button onClick={handleNext}>Siguiente →</Button>
      </div>
    </div>
  )
}
