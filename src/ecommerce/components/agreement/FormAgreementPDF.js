import { jsPDF } from "jspdf";

export const generateContractPDF = (data) => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(24);
  doc.setFont("Helvetica", "bold");
  doc.text("CARCONNECT", 105, 15, { align: "center" });
  doc.setFontSize(18);
  doc.text("CONTRATO APERTURA DE CRÉDITO NO REVOLVENTE", 105, 25, { align: "center" });

  // Separador
  doc.setDrawColor(0);
  doc.line(10, 30, 200, 30);

  // Datos del Comprador
  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Datos del Comprador:", 10, 40);
  doc.setFont("Helvetica", "normal");
  doc.text(`Nombre Completo: ${data.buyerName}`, 10, 45);
  doc.text(`Estado Civil: ${data.maritalStatus}`, 10, 50);
  doc.text(`Profesión: ${data.profession}`, 10, 55);
  doc.text(`Nacionalidad: ${data.nationality}`, 10, 60);
  doc.text(`Número de Identificación: ${data.identification}`, 10, 65);
  doc.text(`Teléfono Celular: ${data.phone}`, 10, 70);

  // Detalles del Vehículo
  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Detalles del Vehículo:", 10, 80);
  doc.setFont("Helvetica", "normal");
  doc.text(`Marca: ${data.carBrand}`, 10, 85);
  doc.text(`Modelo: ${data.carModel}`, 10, 90);
  doc.text(`Tipo: ${data.carType}`, 10, 95);
  doc.text(`Año: ${data.carYear}`, 10, 100);
  doc.text(`Color: ${data.carColor}`, 10, 105);

  // Condiciones del Contrato
  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Condiciones del Contrato:", 10, 115);
  doc.setFont("Helvetica", "normal");
  doc.text(`Valor a Pagar: ${data.contractValue} ${data.currency}`, 10, 120);
  doc.text(`Tasa de Interés: ${data.interestRate}%`, 10, 125);
  doc.text(`Fecha de Firma: ${data.signDate}`, 10, 130);
  doc.text(`Fecha del Primer Pago: ${data.firstPaymentDate}`, 10, 135);
  doc.text(`Día de Pago Mensual: ${data.monthlyPaymentDay}`, 10, 140);
  doc.text(`Comisiones Aplicables: ${data.applicableFees}%`, 10, 145);

 // Agregar espacio antes del texto adicional
  const additionalTextStartY = 150; // Ajusta este valor para agregar espacio
  
  // Texto adicional
  doc.setFontSize(12);
  const additionalText = [
    "EL ACREDITADO deja constancia de que ha leído y que acepta todas y cada una de",
    "los títulos, apartados, cláusulas, documentos anexos y accesorios en este Contrato,",
    "los cuales regirán el manejo de los productos o servicios que apertura EL ACREDITADO",
    "con CARCONNECT, e igualmente declara que es cierta la información general suministrada,",
    "la cual sirvió de base para la apertura de las Cuentas, prestación de los servicios",
    "correspondientes y para contraer las obligaciones derivadas del crédito en este Contrato.",
    "",
  ];
  doc.text(additionalText, 10, additionalTextStartY, { maxWidth: 190, align: "justify" });

  // Firmas
  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Firmas", 105, 190, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.text("Firma del Acreditado:", 10, 200);
  doc.line(50, 200, 200, 200); // Línea de la firma
  doc.text(`Nombre completo: ${data.buyerName}`, 10, 210);
  doc.text("Número de Identificación: <IDENTIFICACION>", 10, 215);
  doc.text("Si es Pasaporte, nombrar país que lo otorga", 10, 220);
  doc.text("Número de Registro Tributario Nacional (RTN): <RTN>", 10, 225);

  doc.text("Firma de CARCONNECT:", 10, 240);
  doc.line(50, 240, 200, 240); // Línea de la firma
  doc.text("Nombre del Contador: Jose Miguel Fajardo Ulloa", 10, 250);
  doc.text("Cargo: Contador General de CARCONNECT", 10, 255);
  doc.text("Número de Registro Tributario Nacional (RTN): <RTN>", 10, 260);

  // Descargar el archivo PDF
  const sanitizedBuyerName = data.buyerName.replace(/[^a-zA-Z0-9 ]/g, "_");
  doc.save(`${sanitizedBuyerName}_CARCONNECT.pdf`);
};
