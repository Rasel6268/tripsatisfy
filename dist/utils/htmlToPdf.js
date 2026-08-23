import jsPDF from 'jspdf';
import 'jspdf-autotable';

function generatePDFFromHTML(htmlContent, outputPath) {
  const doc = new jsPDF();

  // Set the HTML content directly to a DOM element
  const wrapper = document.createElement('div');
  wrapper.innerHTML = htmlContent;

  // Convert HTML to PDF using jspdf-autotable plugin
  doc.autoTable({
    html: '#pdf-area',
    startY: 20,
  });

  // Save the PDF to the specified output path
  doc.save(outputPath);
  console.log('PDF generation successful:', outputPath);
}

export { generatePDFFromHTML };
