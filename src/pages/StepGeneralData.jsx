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

  const handleNext = () => {
    if (!company.nombre.trim()) return
    setStep(2)
  }

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
          <Input id="nombre" value={company.nombre}
            onChange={e => setCompany({ nombre: e.target.value })}
            placeholder="Ej. Comercial Mediterráneo" />
        </FormField>

        <FormField label="Razón social" id="razon">
          <Input id="razon" value={company.razonSocial}
            onChange={e => setCompany({ razonSocial: e.target.value })}
            placeholder="Ej. Comercial Mediterráneo SL" />
        </FormField>

        <FormField label="Forma jurídica" id="forma">
          <Select id="forma" value={company.forma}
            onChange={e => setCompany({ forma: e.target.value, capital: CAPITAL_MIN[e.target.value] || 0 })}>
            {FORMAS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </Select>
        </FormField>

        <FormField label="Número de socios" id="socios">
          <Input id="socios" type="number" min={1} value={company.socios}
            onChange={e => setCompany({ socios: Number(e.target.value) })} />
        </FormField>

        <FormField
          label="Capital aportado (€)"
          id="capital"
          hint={`Capital mínimo legal: ${CAPITAL_MIN[company.forma]?.toLocaleString('es-ES')} €`}>
          <Input id="capital" type="number" min={CAPITAL_MIN[company.forma] || 0} step={100}
            value={company.capital}
            onChange={e => setCompany({ capital: Number(e.target.value) })} />
        </FormField>
      </div>

      <div className="flex justify-end pt-2">
        <Button onClick={handleNext} disabled={!company.nombre.trim()}>Siguiente →</Button>
      </div>
    </div>
  )
}
