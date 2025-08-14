// src/app/patient/prescriptions/download/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const prescriptionId = params.id;

  // Fetch your prescription data (from mock API, DB, or static data)
  const prescription = {
    id: prescriptionId,
    patientName: "John Doe",
    medicines: [
      { name: "Paracetamol", dosage: "500mg", duration: "5 days" },
      { name: "Amoxicillin", dosage: "250mg", duration: "7 days" }
    ],
    notes: "Take medicines after meals."
  };

  // Create PDF
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Prescription", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Patient: ${prescription.patientName}`, 10, 30);

  doc.text("Medicines:", 10, 40);
  prescription.medicines.forEach((med, i) => {
    doc.text(`${i + 1}. ${med.name} - ${med.dosage} - ${med.duration}`, 15, 50 + i * 10);
  });

  doc.text(`Notes: ${prescription.notes}`, 10, 80);

  const pdfBytes = doc.output("arraybuffer");

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=prescription_${prescriptionId}.pdf`
    }
  });
}
