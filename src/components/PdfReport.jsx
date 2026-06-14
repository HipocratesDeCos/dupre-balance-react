import { useBalanceStore } from '../store/useBalanceStore'
import { euro } from '../utils/accounting'
import { dimensionLabel } from '../utils/dimension'

export default function PdfReport() {
  const { computed, company, dimension, context } = useBalanceStore()
  if (!computed.statements) return null
  const { grouped, totals } = computed.statements

  const metaFields = [
    ['Empresa',    company.nombre || '-'],
    ['Razón social', company.razonSocial || '-'],
    ['Dimensión',  dimensionLabel[dimension.resolved]],
    ['Sector',     context.sector],
    ['Ámbito',     context.geografico],
    ['Socios',     company.socios],
    ['Capital',    euro(company.capital)],
    ['Finalidad',  context.finalidad]
  ]

  return (
    <div id="pdf-report" className="hidden" style={{
      background: 'white', color: '#172235',
      fontFamily: 'Arial, Helvetica, sans-serif',
      width: '794px', minHeight: '1123px', padding: '48px', fontSize: '12px'
    }}>
      <div style={{ borderBottom: '2px solid #0f4c81', paddingBottom: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: 0, color: '#0f4c81', fontSize: '20px', fontWeight: 800 }}>
              {company.nombre || 'Informe financiero corporativo'}
            </h1>
            <p style={{ margin: '4px 0 0', color: '#5f6f87', fontSize: '13px' }}>
              {company.razonSocial} · Balance de situación PGC
            </p>
          </div>
          <div style={{ textAlign: 'right', color: '#95a2b5', fontSize: '11px' }}>
            <div style={{ fontWeight: 700 }}>Método DUPRE finanzas</div>
            <div>{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '16px' }}>
          {metaFields.map(([k, v]) => (
            <div key={k} style={{ background: '#f4f7fb', borderRadius: '8px', padding: '8px' }}>
              <div style={{ fontSize: '10px', color: '#95a2b5', marginBottom: '3px' }}>{k}</div>
              <strong style={{ fontSize: '12px', color: '#172235' }}>{v}</strong>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px', pageBreakInside: 'avoid' }}>
        <PdfCol title="ACTIVO" items={grouped.activo} totalLabel="Total Activo" total={totals.totalActivo} />
        <PdfCol title="PASIVO + PATRIMONIO NETO" items={grouped.financiacion} totalLabel="Total PN + Pasivo" total={totals.totalFinanciacion} />
      </div>

      {computed.story && (
        <div style={{ borderTop: '1px solid #d7e0ea', paddingTop: '18px', pageBreakInside: 'avoid' }}>
          <h3 style={{ color: '#0f4c81', marginBottom: '10px', fontSize: '14px' }}>Crónica de negocio</h3>
          <p style={{ lineHeight: 1.75, textAlign: 'justify', color: '#2d3a4a', whiteSpace: 'pre-line', margin: 0 }}>
            {computed.story}
          </p>
        </div>
      )}
    </div>
  )
}

function PdfCol({ title, items, totalLabel, total }) {
  return (
    <div>
      <div style={{ background: '#0f4c81', color: 'white', padding: '6px 10px', borderRadius: '6px', fontWeight: 700, marginBottom: '10px', fontSize: '11px' }}>
        {title}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eef3f9' }}>
              <td style={{ padding: '5px 4px', color: '#2d3a4a' }}>
                {item.nombre}<br/>
                <span style={{ color: '#95a2b5', fontSize: '10px' }}>{item.categoria}</span>
              </td>
              <td style={{ padding: '5px 4px', textAlign: 'right', fontWeight: 600 }}>{euro(item.importe)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid #0f4c81' }}>
            <td style={{ paddingTop: '8px', fontWeight: 800 }}>{totalLabel}</td>
            <td style={{ paddingTop: '8px', textAlign: 'right', fontWeight: 800, color: '#0f4c81' }}>{euro(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
