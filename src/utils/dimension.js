export const dimensionLabel = {
  micro:   'Microempresa (≤4 empleados)',
  pequena: 'Pequeña empresa (5-49)',
  mediana: 'Mediana empresa (50-249)',
  grande:  'Gran empresa (≥250)'
}

export function resolveDimension({ mode, nempleados, volumen, rango }) {
  if (mode === 'rango') return rango
  if (mode === 'volumen') {
    if (volumen < 100000)  return 'micro'
    if (volumen < 2000000) return 'pequena'
    if (volumen < 50000000) return 'mediana'
    return 'grande'
  }
  const n = Number(nempleados)
  if (n <= 4)   return 'micro'
  if (n <= 49)  return 'pequena'
  if (n <= 249) return 'mediana'
  return 'grande'
}

export const DEFAULT_ITEMS_BY_DIMENSION = {
  micro: [
    { nombre: 'Inmovilizado material', importe: 8000,  categoria: 'Activo No Corriente' },
    { nombre: 'Clientes',              importe: 3000,  categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                importe: 4000,  categoria: 'Activo Corriente' },
    { nombre: 'Capital social',        importe: 3000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio', importe: 5000, categoria: 'Patrimonio Neto' },
    { nombre: 'Proveedores',           importe: 7000,  categoria: 'Pasivo Corriente' }
  ],
  pequena: [
    { nombre: 'Inmovilizado material', importe: 50000, categoria: 'Activo No Corriente' },
    { nombre: 'Existencias',           importe: 15000, categoria: 'Activo Corriente' },
    { nombre: 'Clientes',              importe: 12000, categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                importe: 8000,  categoria: 'Activo Corriente' },
    { nombre: 'Capital social',        importe: 30000, categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio', importe: 15000, categoria: 'Patrimonio Neto' },
    { nombre: 'Deudas a largo plazo',  importe: 25000, categoria: 'Pasivo No Corriente' },
    { nombre: 'Proveedores',           importe: 10000, categoria: 'Pasivo Corriente' },
    { nombre: 'Deudas a corto plazo',  importe: 5000,  categoria: 'Pasivo Corriente' }
  ],
  mediana: [
    { nombre: 'Inmovilizado material', importe: 250000, categoria: 'Activo No Corriente' },
    { nombre: 'Inversiones financieras', importe: 50000, categoria: 'Activo No Corriente' },
    { nombre: 'Existencias',           importe: 80000, categoria: 'Activo Corriente' },
    { nombre: 'Clientes',              importe: 60000, categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                importe: 30000, categoria: 'Activo Corriente' },
    { nombre: 'Capital social',        importe: 120000, categoria: 'Patrimonio Neto' },
    { nombre: 'Reservas',              importe: 80000, categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio', importe: 40000, categoria: 'Patrimonio Neto' },
    { nombre: 'Deudas a largo plazo',  importe: 150000, categoria: 'Pasivo No Corriente' },
    { nombre: 'Proveedores',           importe: 60000, categoria: 'Pasivo Corriente' },
    { nombre: 'Deudas a corto plazo',  importe: 20000, categoria: 'Pasivo Corriente' }
  ],
  grande: [
    { nombre: 'Inmovilizado material', importe: 1200000, categoria: 'Activo No Corriente' },
    { nombre: 'Fondo de comercio',     importe: 200000, categoria: 'Activo No Corriente' },
    { nombre: 'Inversiones financieras', importe: 300000, categoria: 'Activo No Corriente' },
    { nombre: 'Existencias',           importe: 400000, categoria: 'Activo Corriente' },
    { nombre: 'Clientes',              importe: 300000, categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                importe: 150000, categoria: 'Activo Corriente' },
    { nombre: 'Capital social',        importe: 600000, categoria: 'Patrimonio Neto' },
    { nombre: 'Reservas',              importe: 400000, categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio', importe: 200000, categoria: 'Patrimonio Neto' },
    { nombre: 'Obligaciones y bonos',  importe: 600000, categoria: 'Pasivo No Corriente' },
    { nombre: 'Deudas a largo plazo',  importe: 400000, categoria: 'Pasivo No Corriente' },
    { nombre: 'Proveedores',           importe: 250000, categoria: 'Pasivo Corriente' },
    { nombre: 'Deudas a corto plazo',  importe: 100000, categoria: 'Pasivo Corriente' }
  ]
}
