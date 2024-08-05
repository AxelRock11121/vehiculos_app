import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div>
      <h2>Lista de Vehículos</h2>
      <Link to={'/saveVehicle'}>nuevo vehiculo</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
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
              <td>
                <Button variant="warning" size="sm">Editar</Button>{' '}
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VehicleTable;
