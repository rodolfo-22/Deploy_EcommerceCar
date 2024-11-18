import React, { useState, useEffect, useCallback } from "react";
import { useBranchService, useQuoteService } from "../../../hooks";

const CheckQuote = () => {
  const {
    branchs, // Obtiene todas las sucursales
    loading: branchLoading,
    error: branchError,
  } = useBranchService();

  const { getAllQuotes } = useQuoteService(); // Obtiene todas las cotizaciones

  const [selectedBranch, setSelectedBranch] = useState(""); // Sucursal seleccionada
  const [quotes, setQuotes] = useState([]); // Todas las cotizaciones
  const [filteredQuotes, setFilteredQuotes] = useState([]); // Cotizaciones filtradas
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState(null);

  // Obtiene todas las cotizaciones
  const fetchQuotes = useCallback(async () => {
    setQuoteLoading(true);
    try {
      const data = await getAllQuotes();
      setQuotes(data); // Almacena las cotizaciones
      setQuoteError(null);
    } catch (error) {
      setQuoteError("Error al obtener las cotizaciones");
      setQuotes([]);
    } finally {
      setQuoteLoading(false);
    }
  }, [getAllQuotes]);

  // Filtra cotizaciones según la sucursal seleccionada
  useEffect(() => {
    if (selectedBranch) {
      const filtered = quotes.filter(
        (quote) => quote.salesStore === selectedBranch // Compara salesStore con selectedBranch
      );
      setFilteredQuotes(filtered); // Almacena las cotizaciones filtradas
    } else {
      setFilteredQuotes([]); // Limpia las cotizaciones si no hay sucursal seleccionada
    }
  }, [selectedBranch, quotes]);

  // Obtiene cotizaciones al cargar el componente
  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value); // Cambia la sucursal seleccionada
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
                  <option key={branch._id} value={branch.name}>
                    {branch.name}{" "}
                    {/* Usa el campo `name` para la comparación */}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Tabla de cotizaciones */}
        {quoteLoading ? (
          <p>Cargando cotizaciones...</p>
        ) : quoteError ? (
          <p className="text-red-500">{quoteError}</p>
        ) : filteredQuotes.length === 0 && selectedBranch ? (
          <p>No hay cotizaciones para esta sucursal, prueba con otra.</p>
        ) : (
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="border-b-2 border-gray-300 text-left text-gray-500">
                <th className="px-4 py-2 font-semibold">Nombre</th>
                <th className="px-4 py-2 font-semibold">Apellido</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">Teléfono</th>
                <th className="px-4 py-2 font-semibold">Marca</th>
                <th className="px-4 py-2 font-semibold">Modelo</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr
                  key={quote._id}
                  className="border-b border-gray-200 text-gray-800"
                >
                  <td className="px-4 py-2">{quote.customerFirstName}</td>
                  <td className="px-4 py-2">{quote.customerLastName}</td>
                  <td className="px-4 py-2">{quote.customerEmail}</td>
                  <td className="px-4 py-2">{quote.customerPhoneNumber}</td>
                  <td className="px-4 py-2">{quote.requestManufacturer}</td>
                  <td className="px-4 py-2">{quote.requestModel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CheckQuote;
