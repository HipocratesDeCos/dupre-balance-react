import { create } from 'zustand'

const DEFAULT_ITEMS = [
  { nombre: 'Inmovilizado material', importe: 50000, categoria: 'Activo No Corriente' },
  { nombre: 'Existencias', importe: 15000, categoria: 'Activo Corriente' },
  { nombre: 'Clientes', importe: 12000, categoria: 'Activo Corriente' },
  { nombre: 'Bancos', importe: 8000, categoria: 'Activo Corriente' },
  { nombre: 'Capital social', importe: 30000, categoria: 'Patrimonio Neto' },
  { nombre: 'Resultado del ejercicio', importe: 15000, categoria: 'Patrimonio Neto' },
  { nombre: 'Deudas a largo plazo', importe: 25000, categoria: 'Pasivo No Corriente' },
  { nombre: 'Proveedores', importe: 10000, categoria: 'Pasivo Corriente' },
  { nombre: 'Deudas a corto plazo', importe: 5000, categoria: 'Pasivo Corriente' }
]

export const useBalanceStore = create((set) => ({
  currentStep: 1,

  company: {
    nombre: '',
    razonSocial: '',
    socios: 1,
    capital: 3000,
    forma: 'sl'
  },

  dimension: {
    mode: 'nempleados',
    nempleados: 8,
    volumen: 480000,
    rango: 'pequena',
    resolved: 'pequena'
  },

  context: {
    sector: 'Comercio',
    geografico: 'Local',
    finalidad: 'Lucrativa',
    propiedad: 'Privada'
  },

  balanceInput: {
    useDetailed: false,
    lineItems: DEFAULT_ITEMS
  },

  computed: {
    statements: null,
    adjusted: false,
    adjustmentMessage: '',
    story: ''
  },

  setStep: (step) => set({ currentStep: step }),
  setCompany: (data) => set((s) => ({ company: { ...s.company, ...data } })),
  setDimension: (data) => set((s) => ({ dimension: { ...s.dimension, ...data } })),
  setContext: (data) => set((s) => ({ context: { ...s.context, ...data } })),
  setBalanceInput: (data) => set((s) => ({ balanceInput: { ...s.balanceInput, ...data } })),
  setComputed: (data) => set((s) => ({ computed: { ...s.computed, ...data } })),
  resetComputed: () => set((s) => ({ computed: { statements: null, adjusted: false, adjustmentMessage: '', story: '' } }))
}))
