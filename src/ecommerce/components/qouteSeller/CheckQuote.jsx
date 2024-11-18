import React, { useState, useEffect } from "react";
import { useQuoteService, useBranchService } from "../../../hooks";
import QuoteDetailsModal from "./QuoteDetailsModal"; 

const QuotesComponent = () => {
  const { getQuotesByBranch, deleteQuote } = useQuoteService();
  const {
    branchs,
    loading: branchLoading,
    error: branchError,
    getAllBranchs,
  } = useBranchService();

  const [selectedBranch, setSelectedBranch] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

  const handleBranchChange = async (event) => {
  const branchId = event.target.value;
  setSelectedBranch(branchId);

  if (!branchId) return;

  setLoading(true);
  setError("");
  setQuotes([]); // Limpia cotizaciones previas
  try {
    const quotesData = await getQuotesByBranch(branchId);

    if (quotesData.length === 0) {
      setError("No hay cotizaciones para esta sucursal.");
      return;
    }

    setQuotes(quotesData);
  } catch (err) {
    setError("No hay cotizaciones para esta sucursal, prueba con otra.");
  } finally {
    setLoading(false);
  }
};

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        await getAllBranchs();
      } catch (err) {
      }
    };

    fetchBranches(); // Llama a la función local
  }, []); // Dependencias vacías

const handleDeleteQuote = async (quoteId) => {
  console.log("Eliminando cotización con ID:", quoteId);
  try {
    await deleteQuote(quoteId);
    setQuotes((prevQuotes) =>
      prevQuotes.filter((quote) => quote._id !== quoteId)
    );
  } catch (err) {
    console.error("Error al eliminar la cotización:", err);
    alert("Error al eliminar la cotización.");
  }
};

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="border-4 border-gray-300 rounded-lg p-6 w-full max-w-full bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Cotizaciones</h2>

        {/* Selección de sucursal */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="sucursal" className="font-semibold">
              Seleccione la sucursal:
            </label>
            <select
              id="sucursal"
              className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBranch}
              onChange={handleBranchChange}
            >
              <option value="">Seleccionar</option>
              {branchLoading ? (
                <option>Cargando sucursales...</option>
              ) : branchError ? (
                <option>Error al cargar sucursales</option>
              ) : (
                branchs.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Tabla de cotizaciones */}
        {loading ? (
          <p>Cargando cotizaciones...</p>
        ) : quotes.length === 0 && selectedBranch ? (
          // Mensaje informativo cuando no hay datos
          <p>No hay cotizaciones para esta sucursal, prueba con otra.</p>
        ) : (
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="border-b-2 border-gray-300 text-left text-gray-500">
                <th className="px-4 py-2 font-semibold">Nombre</th>
                <th className="px-4 py-2 font-semibold">Apellido</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">Marca</th>
                <th className="px-4 py-2 font-semibold">Modelo</th>
                <th className="px-4 py-2 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr
                  key={quote._id}
                  className="border-b border-gray-200 text-gray-800 hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{quote.customerFirstName}</td>
                  <td className="px-4 py-2">{quote.customerLastName}</td>
                  <td className="px-4 py-2">{quote.customerEmail}</td>
                  <td className="px-4 py-2">{quote.requestManufacturer}</td>
                  <td className="px-4 py-2">{quote.requestModel}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    {/* Botón para abrir el modal */}
                    <button
                      onClick={() => handleQuoteClick(quote)} // Abre el modal con los detalles
                    >
                      📄 Detalles
                    </button>

                    {/* Botón para eliminar la cotización */}
                    <button
                      onClick={() => handleDeleteQuote(quote._id)} // Elimina la cotización
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal para detalles */}
      <QuoteDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        quote={selectedQuote}
      />
    </div>
  );
};

export default QuotesComponent;
