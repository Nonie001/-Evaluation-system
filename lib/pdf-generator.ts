import { EvaluationData } from './types';

export async function generatePDF(data: EvaluationData): Promise<void> {
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the PDF blob from the response
    const pdfBlob = await response.blob();
    
    // Create a download link
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evaluation-${data.employeeName}-${data.evaluationMonth}-${data.evaluationYear}.pdf`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}
