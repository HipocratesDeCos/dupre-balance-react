# DUPRE Balance PGC

> Generador de Balance de Situación basado en el Plan General de Contabilidad español.

## Método DUPRE finanzas

Aplicación web-móvil (SPA) para generar balances de situación con:

- 📊 Formulario en 4 pasos (stepper)
- ⚖️ Validación contable automática (Activo = Pasivo + PN)
- 📝 Generación de narrativa estratégica (Ansoff, Porter, PESTEL)
- 📄 Exportación a PDF profesional formato A4
- 🌙 Modo oscuro / claro

## Tecnologías

- React 18 + Zustand
- Vite + Tailwind CSS
- jsPDF + html2canvas
- GitHub Pages (deploy automático)

## Desarrollo local

```bash
npm install
npm run dev
```

## Despliegue

Cada push a `main` lanza automáticamente el workflow de GitHub Actions que publica en GitHub Pages.

**URL de producción:** `https://hipocratesdecos.github.io/dupre-balance-react/`
