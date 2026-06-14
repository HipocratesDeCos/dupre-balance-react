/**
 * utils/accounting.js
 * Validación contable y ajuste automático de descuadres.
 * Ecuación: Activo = Pasivo + Patrimonio Neto
 */

export function euro(val) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Number(val) || 0)
}

export function validateAndAdjustBalance(items) {
  if (!items || items.length === 0) throw new Error('No hay partidas patrimoniales definidas.')

  const cloned = items.map(i => ({ ...i, importe: Number(i.importe) }))

  for (const item of cloned) {
    if (!item.nombre?.trim()) throw new Error('Todas las partidas deben tener nombre.')
    if (!item.categoria) throw new Error(`La partida "${item.nombre}" no tiene categoría.`)
    if (Number.isNaN(item.importe)) throw new Error(`El importe de "${item.nombre}" no es válido.`)
  }

  const sum = (cat) => cloned.filter(i => i.categoria === cat).reduce((a, b) => a + b.importe, 0)

  const anc = sum('Activo No Corriente')
  const ac  = sum('Activo Corriente')
  const pnc = sum('Pasivo No Corriente')
  const pc  = sum('Pasivo Corriente')
  const pn  = sum('Patrimonio Neto')

  const totalActivo      = anc + ac
  const totalFinanciacion = pnc + pc + pn
  const diff = Number((totalActivo - totalFinanciacion).toFixed(2))

  let adjusted = false
  let adjustmentMessage = ''

  if (diff !== 0) {
    let target = cloned.find(i =>
      i.nombre.toLowerCase().includes('resultado') && i.categoria === 'Patrimonio Neto')
    if (!target) target = cloned.find(i =>
      i.nombre.toLowerCase().includes('reserva') && i.categoria === 'Patrimonio Neto')
    if (!target) {
      target = { nombre: 'Resultado del ejercicio', importe: 0, categoria: 'Patrimonio Neto' }
      cloned.push(target)
    }
    const prev = target.importe
    target.importe = Number((target.importe + diff).toFixed(2))
    if (target.importe < -totalActivo * 0.5) {
      throw new Error('El descuadre es demasiado grande para ajustarse automáticamente. Revisa los importes.')
    }
    adjusted = true
    adjustmentMessage = `Ajuste automático de ${euro(diff)} en "${target.nombre}" (${euro(prev)} → ${euro(target.importe)}) para cuadrar el balance.`
  }

  const newPn  = sum('Patrimonio Neto') + (adjusted ? diff : 0)
  const newPnc = sum('Pasivo No Corriente')
  const newPc  = sum('Pasivo Corriente')
  const newAnc = sum('Activo No Corriente')
  const newAc  = sum('Activo Corriente')

  const grouped = {
    activo: cloned.filter(i => i.categoria === 'Activo No Corriente' || i.categoria === 'Activo Corriente'),
    financiacion: cloned.filter(i => i.categoria === 'Patrimonio Neto' || i.categoria === 'Pasivo No Corriente' || i.categoria === 'Pasivo Corriente')
  }

  return {
    adjusted,
    adjustmentMessage,
    items: cloned,
    grouped,
    totals: {
      anc: newAnc, ac: newAc,
      pn: cloned.filter(i => i.categoria === 'Patrimonio Neto').reduce((a, b) => a + b.importe, 0),
      pnc: newPnc, pc: newPc,
      totalActivo: newAnc + newAc,
      totalFinanciacion: cloned.filter(i => i.categoria !== 'Activo No Corriente' && i.categoria !== 'Activo Corriente').reduce((a, b) => a + b.importe, 0)
    }
  }
}
