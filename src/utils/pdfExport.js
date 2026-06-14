/**
 * utils/pdfExport.js
 * Exporta el nodo #pdf-report a un PDF A4 usando html2canvas + jsPDF.
 */
export async function exportBalancePdf(nodeId, filename = 'informe-balance') {
  const { default: jsPDF } = await import('jspdf')
  const { default: html2canvas } = await import('html2canvas')

  const node = document.getElementById(nodeId)
  if (!node) throw new Error('No se encontró el nodo del informe.')

  node.classList.remove('hidden')
  node.style.display = 'block'

  try {
    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const pdfW = pdf.internal.pageSize.getWidth()
    const pdfH = pdf.internal.pageSize.getHeight()
    const imgH = (canvas.height * pdfW) / canvas.width

    let heightLeft = imgH
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH)
    heightLeft -= pdfH

    while (heightLeft > 0) {
      position -= pdfH
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pdfW, imgH)
      heightLeft -= pdfH
    }

    pdf.save(`${filename}.pdf`)
  } finally {
    node.classList.add('hidden')
    node.style.display = ''
  }
}
