const EmployeesMain = () => {

    return (
        <div>
            <div className="m-10 font-bold flex justify-center">
                <p className="text-3xl">Administrar empleados</p>
            </div>
            <div className="flex flex-row justify-between">
                <div className="m-10 flex items-center">
                    <p className="text-black text-xl">Seleccione una sucursal de venta:</p>
                </div>
                <div className="m-10">
                    <select className="p-4 rounded-lg w-96">
                        <option value="1">Sucursal 1</option>
                        <option value="2">Sucursal 2</option>
                        <option value="3">Sucursal 3</option>
                    </select>
                </div>
                <div className="m-10">
                    <button className="bg-gray-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-96">Agregar empleado</button>
                </div>
            </div>
            <div>
                {/* Tabla de empleados */}
                

            </div>
        </div>
    )
};

export default EmployeesMain;