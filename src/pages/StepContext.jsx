import { useBalanceStore } from '../store/useBalanceStore'
import Button from '../components/Button'
import FormField, { Select } from '../components/FormField'

const SECTORES  = ['Tecnología','Comercio','Industria','Servicios','Hosteleria','Agricultura','Construcción','Educación','Salud','Otro']
const GEOS      = ['Local','Regional','Nacional','Internacional','Global']
const FINALIDADES = ['Lucrativa','Social','Mixta','Sin ánimo de lucro']
const PROPIEDADES = ['Privada','Pública','Mixta','Cooperativa']

export default function StepContext() {
  const { context, setContext, setStep } = useBalanceStore()

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
      rounded-2xl p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Contexto operativo</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Características estratégicas y organizativas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Sector de actividad" id="sector">
          <Select id="sector" value={context.sector} onChange={e => setContext({ sector: e.target.value })}>
            {SECTORES.map(s => <option key={s}>{s}</option>)}
          </Select>
        </FormField>

        <FormField label="Ámbito geográfico" id="geo">
          <Select id="geo" value={context.geografico} onChange={e => setContext({ geografico: e.target.value })}>
            {GEOS.map(g => <option key={g}>{g}</option>)}
          </Select>
        </FormField>

        <FormField label="Finalidad" id="finalidad">
          <Select id="finalidad" value={context.finalidad} onChange={e => setContext({ finalidad: e.target.value })}>
            {FINALIDADES.map(f => <option key={f}>{f}</option>)}
          </Select>
        </FormField>

        <FormField label="Propiedad del capital" id="propiedad">
          <Select id="propiedad" value={context.propiedad} onChange={e => setContext({ propiedad: e.target.value })}>
            {PROPIEDADES.map(p => <option key={p}>{p}</option>)}
          </Select>
        </FormField>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={() => setStep(2)}>← Anterior</Button>
        <Button onClick={() => setStep(4)}>Siguiente →</Button>
      </div>
    </div>
  )
}
