import { NextRequest } from "next/server";
import jsPDF from "jspdf";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Create a PDF
  const doc = new jsPDF();
  doc.text(`Prescription for ID: ${id}`, 10, 10);

  const pdfOutput = doc.output("arraybuffer");

  return new Response(pdfOutput, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=prescription-${id}.pdf`
    }
  });
}
