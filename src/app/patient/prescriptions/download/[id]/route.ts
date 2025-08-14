import { NextResponse } from "next/server";
import jsPDF from "jspdf";

// The context type is now passed like this:
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    // Example: Generate a simple PDF
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`Prescription ID: ${id}`, 10, 20);
    doc.text("This is a sample prescription.", 10, 40);

    const pdfBytes = doc.output("arraybuffer");

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="prescription-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
