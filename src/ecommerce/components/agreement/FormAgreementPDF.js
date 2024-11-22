import { jsPDF } from "jspdf";

export const generateContractPDF = (data) => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(20);
  doc.setFont("Helvetica", "bold");
  doc.text("CARCONNECT", 105, 10, { align: "center" });
  doc.setFontSize(16);
  doc.text("CONTRATO DE COMPRA-VENTA DE VEHÍCULO", 105, 20, { align: "center" });

  // Separador
  doc.setDrawColor(0);
  doc.line(10, 25, 200, 25);

  // Datos del Comprador
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("Datos del Comprador:", 10, 35);
  doc.setFont("Helvetica", "normal");
  doc.text(`Nombre Completo: ${data.buyerName}`, 10, 45);
  doc.text(`Estado Civil: ${data.maritalStatus}`, 10, 50);
  doc.text(`Profesión: ${data.profession}`, 10, 55);
  doc.text(`Nacionalidad: ${data.nationality}`, 10, 60);
  doc.text(`Número de Identificación: ${data.identification}`, 10, 65);
  doc.text(`Teléfono Celular: ${data.phone}`, 10, 70);

  // Detalles del Vehículo
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("Detalles del Vehículo:", 10, 80);
  doc.setFont("Helvetica", "normal");
  doc.text(`Marca: ${data.carBrand}`, 10, 90);
  doc.text(`Modelo: ${data.carModel}`, 10, 95);
  doc.text(`Tipo: ${data.carType}`, 10, 100);
  doc.text(`Año: ${data.carYear}`, 10, 105);
  doc.text(`Color: ${data.carColor}`, 10, 110);

  // Condiciones del Contrato
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("Condiciones del Contrato:", 10, 120);
  doc.setFont("Helvetica", "normal");
  doc.text(`Valor a Pagar: ${data.contractValue} ${data.currency}`, 10, 130);
  doc.text(`Tasa de Interés: ${data.interestRate}%`, 10, 135);
  doc.text(`Fecha de Firma: ${data.signDate}`, 10, 140);
  doc.text(`Fecha del Primer Pago: ${data.firstPaymentDate}`, 10, 145);
  doc.text(`Día de Pago Mensual: ${data.monthlyPaymentDay}`, 10, 150);
  doc.text(`Comisiones Aplicables: ${data.applicableFees}%`, 10, 155);

  // Firmas
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("Firmas:", 10, 170);
  doc.setFont("Helvetica", "normal");
  doc.text("Firma del Comprador: _________________________", 10, 180);
  doc.text("Firma del Representante: _____________________", 10, 190);

  // Texto adicional
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.text(
    "Firmado hoy <FECHA_FIRMA_LETRA> la ciudad de <CIUDAD>.\n\n" +
      "EL ACREDITADO\nFirma: _______________________\nNombre completo: ${data.buyerName},\n" +
      "Número de Identificación: <IDENTIFICACION>\nSi es Pasaporte, nombrar país que lo otorga\n" +
      "Número de Registro Tributario Nacional (RTN): <RTN>\n\n" +
      "CARCONNECT\nFirma: _______________________\n" +
      "Nombre del Contador: Jose Miguel Fajardo Ulloa\n" +
      "Cargo: Contador General de CARCONNECT\n" +
      "Número de Registro Tributario Nacional (RTN): <RTN>",
    10,
    200
  );

  // Descargar el archivo PDF
  doc.save("Contrato_CARCONNECT.pdf");
};
