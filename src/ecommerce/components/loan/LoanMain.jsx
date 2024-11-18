import React, { useState } from "react";
import LoanModal from "./LoanForm";
import { useLoanService } from "../../../hooks"; 

const LoanMain = () => {
  const { calculateAmortization, loading, error, amortizationData } =
    useLoanService(); // Hook para manejar la lógica
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAmortizationSubmit = async (formData) => {
     console.log(formData);
    await calculateAmortization(formData);
    setIsModalOpen(false); // Cierra el modal después de la llamada
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Tabla de Amortización
        </h2>

        {/* Sección de agregar amortización */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800"
          >
            + Crear amortización
          </button>
        </div>

        {/* Tabla de amortización */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="border-b-2 border-gray-300 text-left text-gray-500">
                <th className="px-4 py-2 font-semibold">Cuota</th>
                <th className="px-4 py-2 font-semibold">Saldo Inicial</th>
                <th className="px-4 py-2 font-semibold">Intereses</th>
                <th className="px-4 py-2 font-semibold">Amortización</th>
                <th className="px-4 py-2 font-semibold">Seguro</th>
                <th className="px-4 py-2 font-semibold">Pago Total</th>
                <th className="px-4 py-2 font-semibold">Saldo Final</th>
                <th className="px-4 py-2 font-semibold">Fecha Pago</th>
              </tr>
            </thead>
            <tbody>
              {amortizationData.map((cuota, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 text-gray-800"
                >
                  <td className="px-4 py-2">{cuota.cuota || "N/A"}</td>
                  <td className="px-4 py-2">
                    {cuota.saldoInicial
                      ? Number(cuota.saldoInicial).toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {cuota.intereses
                      ? Number(cuota.intereses).toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {cuota.amortizacion
                      ? Number(cuota.amortizacion).toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {cuota.seguro ? Number(cuota.seguro).toFixed(2) : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {cuota.pagoTotal
                      ? Number(cuota.pagoTotal).toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {cuota.saldoFinal
                      ? Number(cuota.saldoFinal).toFixed(2)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">
                    {cuota.fechaPago
                      ? new Date(cuota.fechaPago).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal para crear amortización */}
      <LoanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAmortizationSubmit}
      />
    </div>
  );
};

export default LoanMain;
