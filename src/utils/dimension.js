// Rangos segun Recomendacion UE 2003/361 y criterios PGC espanol
// Microempresa: < 10 empleados y volumen < 2M€
// Pequeña:      10-49 empleados y volumen < 10M€
// Mediana:      50-249 empleados y volumen < 50M€
// Grande:       >= 250 empleados o volumen >= 50M€

export const dimensionLabel = {
  micro:   'Microempresa (< 10 empleados)',
  pequena: 'Pequeña empresa (10–49 empleados)',
  mediana: 'Mediana empresa (50–249 empleados)',
  grande:  'Gran empresa (≥ 250 empleados)'
}

export function resolveDimension({ mode, nempleados, volumen, rango }) {
  if (mode === 'rango') return rango

  if (mode === 'volumen') {
    const v = Number(volumen)
    if (v < 2000000)   return 'micro'
    if (v < 10000000)  return 'pequena'
    if (v < 50000000)  return 'mediana'
    return 'grande'
  }

  // Por empleados (criterio principal UE)
  const n = Number(nempleados)
  if (n < 10)  return 'micro'
  if (n < 50)  return 'pequena'
  if (n < 250) return 'mediana'
  return 'grande'
}

export const DEFAULT_ITEMS_BY_DIMENSION = {
  micro: [
    { nombre: 'Inmovilizado material',   importe: 8000,  categoria: 'Activo No Corriente' },
    { nombre: 'Clientes',                importe: 3000,  categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                  importe: 4000,  categoria: 'Activo Corriente' },
    { nombre: 'Capital social',          importe: 3000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio', importe: 5000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Proveedores',             importe: 7000,  categoria: 'Pasivo Corriente' }
  ],
  pequena: [
    { nombre: 'Inmovilizado material',   importe: 50000,  categoria: 'Activo No Corriente' },
    { nombre: 'Existencias',             importe: 15000,  categoria: 'Activo Corriente' },
    { nombre: 'Clientes',                importe: 12000,  categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                  importe: 8000,   categoria: 'Activo Corriente' },
    { nombre: 'Capital social',          importe: 30000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio', importe: 15000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Deudas a largo plazo',    importe: 25000,  categoria: 'Pasivo No Corriente' },
    { nombre: 'Proveedores',             importe: 10000,  categoria: 'Pasivo Corriente' },
    { nombre: 'Deudas a corto plazo',    importe: 5000,   categoria: 'Pasivo Corriente' }
  ],
  mediana: [
    { nombre: 'Inmovilizado material',     importe: 250000, categoria: 'Activo No Corriente' },
    { nombre: 'Inversiones financieras',   importe: 50000,  categoria: 'Activo No Corriente' },
    { nombre: 'Existencias',               importe: 80000,  categoria: 'Activo Corriente' },
    { nombre: 'Clientes',                  importe: 60000,  categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                    importe: 30000,  categoria: 'Activo Corriente' },
    { nombre: 'Capital social',            importe: 120000, categoria: 'Patrimonio Neto' },
    { nombre: 'Reservas',                  importe: 80000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio',   importe: 40000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Deudas a largo plazo',      importe: 150000, categoria: 'Pasivo No Corriente' },
    { nombre: 'Proveedores',               importe: 60000,  categoria: 'Pasivo Corriente' },
    { nombre: 'Deudas a corto plazo',      importe: 20000,  categoria: 'Pasivo Corriente' }
  ],
  grande: [
    { nombre: 'Inmovilizado material',     importe: 1200000, categoria: 'Activo No Corriente' },
    { nombre: 'Fondo de comercio',         importe: 200000,  categoria: 'Activo No Corriente' },
    { nombre: 'Inversiones financieras',   importe: 300000,  categoria: 'Activo No Corriente' },
    { nombre: 'Existencias',               importe: 400000,  categoria: 'Activo Corriente' },
    { nombre: 'Clientes',                  importe: 300000,  categoria: 'Activo Corriente' },
    { nombre: 'Bancos',                    importe: 150000,  categoria: 'Activo Corriente' },
    { nombre: 'Capital social',            importe: 600000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Reservas',                  importe: 400000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Resultado del ejercicio',   importe: 200000,  categoria: 'Patrimonio Neto' },
    { nombre: 'Obligaciones y bonos',      importe: 600000,  categoria: 'Pasivo No Corriente' },
    { nombre: 'Deudas a largo plazo',      importe: 400000,  categoria: 'Pasivo No Corriente' },
    { nombre: 'Proveedores',               importe: 250000,  categoria: 'Pasivo Corriente' },
    { nombre: 'Deudas a corto plazo',      importe: 100000,  categoria: 'Pasivo Corriente' }
  ]
}
