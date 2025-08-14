import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  // Example PDF creation
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { height } = page.getSize();
  page.drawText(`Prescription ID: ${id}`, {
    x: 50,
    y: height - 50,
    size: 20,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();

  return new Response(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="prescription_${id}.pdf"`,
    },
  });
}
