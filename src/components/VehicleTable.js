import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import api from '../utils/axiosConfig'; // Asegúrate de tener configurado axios

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);


  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get('/consultarVehiculos'); // Asegúrate de que esta ruta es correcta
      //console.log(response);
      setVehicles(response.data.vehiculos);
      //console.log(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles', error);
    }
  };

  const deleteVehicle = async (id) => {

    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');
      if (confirmDelete) {
        const response = await api.post('/BorrarVehiculo', { id });
        console.log(response);
      }
       window.location.reload();
    }
    catch (err) {
      console.log(err.message);
    }


  };

  return (
    <div>
      <h2>Lista de Vehículos</h2>
      <Link to={'/CreateVehicle'}>nuevo vehiculo</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>placa</th>
            <th>año</th>
            <th>estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.marca}</td>
              <td>{vehicle.modelo}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.placa}</td>
              <td>{vehicle.año}</td>
              <td>{vehicle.EstatusVehiculo.descripcion}</td>
              <td>
                <Link className="btn btn-primary ml-3" to={`/UpdateVehicle/${vehicle.id}`}>editar vehiculo</Link>
                <Button variant="danger" size="sm" onClick={()=>deleteVehicle(vehicle.id)} >Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VehicleTable;
