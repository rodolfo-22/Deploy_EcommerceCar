import React from "react";

const QuoteDetailsModal = ({ isOpen, onClose, quote }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full border-4 border-gray-300">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Detalle de cotización
        </h2>
        <div className="space-y-4">
          <p>
            <strong>Nombre:</strong> {quote?.customerFirstName || "N/A"}
          </p>
          <p>
            <strong>Apellido:</strong> {quote?.customerLastName || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {quote?.customerEmail || "N/A"}
          </p>
          <p>
            <strong>Teléfono:</strong> {quote?.customerPhoneNumber || "N/A"}
          </p>
          <p>
            <strong>Marca:</strong> {quote?.requestManufacturer || "N/A"}
          </p>
          <p>
            <strong>Modelo:</strong> {quote?.requestModel || "N/A"}
          </p>
          <p>
            <strong>Fecha recibida:</strong>{" "}
            {quote?.createdAt
              ? new Date(quote.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailsModal;
