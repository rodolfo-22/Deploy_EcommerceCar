     import React from "react";
     import { useForm } from "react-hook-form";
     import Swal from "sweetalert2";
     import { generateContractPDF } from "./FormAgreementPDF";

     const ContractForm = () => {
     const {
     register,
     handleSubmit,
     formState: { errors },
     reset,
     } = useForm();

     const onSubmit = (data) => {
     Swal.fire({
          title: "¿Generar contrato?",
          text: "Se generará un PDF con los datos ingresados.",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Generar",
          cancelButtonText: "Cancelar",
     }).then((result) => {
          if (result.isConfirmed) {
          generateContractPDF(data);
          reset();
          }
     });
     };

     return (
       <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-gray-300">
         <h1 className="text-2xl font-bold text-center mb-6">
           Formulario de Contrato
         </h1>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
           {/* Nombre del comprador */}
           <section>
             <h2 className="text-xl font-semibold mb-4">Datos del Comprador</h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Nombre completo
                 </label>
                 <input
                   type="text"
                   {...register("buyerName", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Juan Pérez"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.buyerName && (
                   <span className="text-red-500 text-sm">
                     {errors.buyerName.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Estado civil
                 </label>
                 <input
                   type="text"
                   {...register("maritalStatus", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Soltero/a"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.maritalStatus && (
                   <span className="text-red-500 text-sm">
                     {errors.maritalStatus.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Profesión
                 </label>
                 <input
                   type="text"
                   {...register("profession", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Ingeniero/a"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.profession && (
                   <span className="text-red-500 text-sm">
                     {errors.profession.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Nacionalidad
                 </label>
                 <input
                   type="text"
                   {...register("nationality", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Mexicana"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.nationality && (
                   <span className="text-red-500 text-sm">
                     {errors.nationality.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Número de identificación
                 </label>
                 <input
                   type="text"
                   {...register("identification", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="123456789"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.identification && (
                   <span className="text-red-500 text-sm">
                     {errors.identification.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Teléfono celular
                 </label>
                 <input
                   type="tel"
                   {...register("phone", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="987654321"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.phone && (
                   <span className="text-red-500 text-sm">
                     {errors.phone.message}
                   </span>
                 )}
               </div>
             </div>
           </section>
           {/* Detalles del vehículo */}
           <section>
             <h2 className="text-xl font-semibold mb-4">
               Detalles del Vehículo
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Marca del vehículo
                 </label>
                 <input
                   type="text"
                   {...register("carBrand", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Toyota"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.carBrand && (
                   <span className="text-red-500 text-sm">
                     {errors.carBrand.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Modelo del vehículo
                 </label>
                 <input
                   type="text"
                   {...register("carModel", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Corolla"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.carModel && (
                   <span className="text-red-500 text-sm">
                     {errors.carModel.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Tipo del vehículo
                 </label>
                 <input
                   type="text"
                   {...register("carType", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Sedán"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.carType && (
                   <span className="text-red-500 text-sm">
                     {errors.carType.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Año del vehículo
                 </label>
                 <input
                   type="number"
                   {...register("carYear", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="2023"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.carYear && (
                   <span className="text-red-500 text-sm">
                     {errors.carYear.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Color del vehículo
                 </label>
                 <input
                   type="text"
                   {...register("carColor", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="Rojo"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.carColor && (
                   <span className="text-red-500 text-sm">
                     {errors.carColor.message}
                   </span>
                 )}
               </div>
             </div>
           </section>

           {/* Condiciones del contrato */}
           <section>
             <h2 className="text-xl font-semibold mb-4">
               Condiciones del contrato
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Valor a pagar (numérico)
                 </label>
                 <input
                   type="number"
                   {...register("contractValue", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="50000"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.contractValue && (
                   <span className="text-red-500 text-sm">
                     {errors.contractValue.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Moneda
                 </label>
                 <input
                   type="text"
                   {...register("currency", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="USD"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.currency && (
                   <span className="text-red-500 text-sm">
                     {errors.currency.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Fecha de firma
                 </label>
                 <input
                   type="date"
                   {...register("signDate", {
                     required: "Este campo es obligatorio",
                   })}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.signDate && (
                   <span className="text-red-500 text-sm">
                     {errors.signDate.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Tasa de interés (porcentual)
                 </label>
                 <input
                   type="number"
                   step="0.01"
                   {...register("interestRate", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="5.5"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.interestRate && (
                   <span className="text-red-500 text-sm">
                     {errors.interestRate.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Fecha del primer pago
                 </label>
                 <input
                   type="date"
                   {...register("firstPaymentDate", {
                     required: "Este campo es obligatorio",
                   })}
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.firstPaymentDate && (
                   <span className="text-red-500 text-sm">
                     {errors.firstPaymentDate.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Día de pago mensual
                 </label>
                 <input
                   type="number"
                   {...register("monthlyPaymentDay", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="15"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.monthlyPaymentDay && (
                   <span className="text-red-500 text-sm">
                     {errors.monthlyPaymentDay.message}
                   </span>
                 )}
               </div>

               <div>
                 <label className="block text-sm font-semibold text-gray-600">
                   Comisiones aplicables (porcentual)
                 </label>
                 <input
                   type="number"
                   step="0.01"
                   {...register("applicableFees", {
                     required: "Este campo es obligatorio",
                   })}
                   placeholder="2.5"
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 {errors.applicableFees && (
                   <span className="text-red-500 text-sm">
                     {errors.applicableFees.message}
                   </span>
                 )}
               </div>
             </div>
           </section>

           {/* Botón de envío */}
           <div className="text-center">
             <button
               type="submit"
               className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800"
             >
               Generar Contrato
             </button>
           </div>
         </form>
       </div>
     );
     };

export default ContractForm;
