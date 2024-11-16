import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarListAdmin from "./CarListAdmin";
import { HeaderLogin } from "../../components";
import { useCarService } from "../../../hooks";
import profileImage from "../../../assets/profile.png";
import EmployeesMain from "../../components/employees/EmployeesMain";

const AdminPage = () => {
  const { cars, loading, error, deleteCarById } = useCarService();

  const deleteCar = async (id) => {
    try {
      await deleteCarById(id);
    } catch (err) {
      console.error("Error al eliminar el vehículo:", err);
    }
  };

  const [selectedComponent, setSelectedComponent] = useState(1);

  const setComponent = (option) => {
    setSelectedComponent(option);
  };

  useEffect(() => {
    console.log("Selected component:", selectedComponent);
  }, [selectedComponent]);

  if (loading) return <div>Cargando vehículos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div className="bg-gray-950 text-white p-4 h-full w-1/6">
        <div className="flex justify-center m-10">
          <img class="h-auto w-auto rounded-lg dark:shadow-gray-800" src={profileImage} alt="image description"></img>
        </div>
        <div className="flex justify-center">
          <p className="text-3xl">Carlos Hernández</p>
        </div>
        <div className="flex justify-center mt-10" onClick={() => setComponent(1)}>
          <Link to="/admin" className="block py-2 text-xl mb-5">Gestionar vehículos</Link>
        </div>
        <div className="flex justify-center" onClick={() => setComponent(2)}>
          <Link to="#" className="block py-2 text-xl mb-5">Administrar empleados</Link>
        </div>
        <div className="flex justify-center" onClick={() => setComponent(3)}>
          <Link to="#" className="block py-2 text-xl mb-5">Sucursales de venta</Link>
        </div>
        <div className="flex justify-center" onClick={() => setComponent(4)}>
          <Link to="#" className="block py-2 text-xl mb-5">Asistir cotizaciones</Link>
        </div>
      </div>

      {/* Content */}
      <div className="w-5/6">

        {/* Vamos a implementar un renderizado condicional en base al estado de selected component */}
        {/* <HeaderLogin /> */}
        {selectedComponent === 1 && <CarListAdmin cars={cars} deleteCar={deleteCar} />}
        {selectedComponent === 2 && <EmployeesMain />}
        {selectedComponent === 3 && <div>Sucursales de venta</div>}
        {selectedComponent === 4 && <div>Asistir cotizaciones</div>}
      </div>
    </div>
  );
};

export default AdminPage;

