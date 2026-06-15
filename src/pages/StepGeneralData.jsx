import { useState } from 'react'
import { useBalanceStore } from '../store/useBalanceStore'
import Button from '../components/Button'
import FormField, { Input, Select } from '../components/FormField'

const FORMAS = [
  { value: 'sl',             label: 'Sociedad de Responsabilidad Limitada (SRL)' },
  { value: 'sa',             label: 'Sociedad Anónima (SA)' },
  { value: 'coop',           label: 'Sociedad Cooperativa' },
  { value: 'autonomo',       label: 'Empresario Individual (Autónomo)' },
  { value: 'sl_unipersonal', label: 'SL Unipersonal' }
]

const CAPITAL_MIN = { sl: 3000, sa: 60000, coop: 1, autonomo: 0, sl_unipersonal: 3000 }

export default function StepGeneralData() {
  const { company, setCompany, setStep } = useBalanceStore()

  // Estado local para evitar re-renders de Zustand que roban el foco
  const [local, setLocal] = useState({
    nombre: company.nombre,
    razonSocial: company.razonSocial,
    socios: company.socios,
    capital: company.capital,
    forma: company.forma
  })

  const update = (field, val) => setLocal(prev => ({ ...prev, [field]: val }))

  const handleNext = () => {
    if (!local.nombre.trim()) return
    setCompany(local)  // Sincroniza con Zustand solo al avanzar
    setStep(2)
  }

  const capitalMin = CAPITAL_MIN[local.forma] ?? 0

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
      rounded-2xl p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Datos generales</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          Información básica de la empresa
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Nombre comercial" id="nombre">
          <Input
            id="nombre"
            value={local.nombre}
            onChange={e => update('nombre', e.target.value)}
            placeholder="Ej. Comercial Mediterráneo"
          />
        </FormField>

        <FormField label="Razón social" id="razon">
          <Input
            id="razon"
            value={local.razonSocial}
            onChange={e => update('razonSocial', e.target.value)}
            placeholder="Ej. Comercial Mediterráneo SL"
          />
        </FormField>

        <FormField label="Forma jurídica" id="forma">
          <Select
            id="forma"
            value={local.forma}
            onChange={e => update('forma', e.target.value)}>
            {FORMAS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </Select>
        </FormField>

        <FormField label="Número de socios" id="socios">
          <Input
            id="socios"
            type="number"
            min={1}
            value={local.socios}
            onChange={e => update('socios', Number(e.target.value))}
          />
        </FormField>

        <FormField
          label="Capital aportado (€)"
          id="capital"
          hint={`Capital mínimo legal: ${capitalMin.toLocaleString('es-ES')} €`}>
          <Input
            id="capital"
            type="number"
            min={capitalMin}
            step={100}
            value={local.capital}
            onChange={e => update('capital', Number(e.target.value))}
          />
        </FormField>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleNext} disabled={!local.nombre.trim()}>Siguiente →</Button>
      </div>
    </div>
  )
}
