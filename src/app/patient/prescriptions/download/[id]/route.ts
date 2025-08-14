import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Mock prescription data — replace with DB fetch
  const prescription = {
    id,
    patientName: 'John Doe',
    medicines: 'Paracetamol',
    dosage: '500mg',
    duration: '5 days',
    notes: 'Take after meals',
  };

  // Create PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 600]);
  const { height } = page.getSize();
  const fontSize = 18;

  page.drawText('Prescription', { x: 50, y: height - 50, size: fontSize + 4, color: rgb(0, 0.53, 0.21) });
  page.drawText(`Patient: ${prescription.patientName}`, { x: 50, y: height - 100, size: fontSize });
  page.drawText(`Medicine: ${prescription.medicines}`, { x: 50, y: height - 140, size: fontSize });
  page.drawText(`Dosage: ${prescription.dosage}`, { x: 50, y: height - 180, size: fontSize });
  page.drawText(`Duration: ${prescription.duration}`, { x: 50, y: height - 220, size: fontSize });
  page.drawText(`Notes: ${prescription.notes || '-'}`, { x: 50, y: height - 260, size: fontSize });

  const pdfBytes = await pdfDoc.save();

  // ✅ Fix: Convert Uint8Array to Buffer for Next.js Response
  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=prescription_${id}.pdf`,
    },
  });
}
