import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import api from '../utils/axiosConfig'; // configuracion axios
import { useParams } from 'react-router-dom';

const VehicleForm = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({
        id: '',
        marca: '',
        modelo: '',
        color: '',
        placa: '',
        año: '',
        ev_id: ''
    });
    const [estatusVehiculo, setEstatusVehiculo] = useState([]);
    // const [marca, setMarca] = useState('');
    // const [modelo, setModelo] = useState('');
    // const [color, setColor] = useState('');
    // const [caracteristicas_adicionales, setCaracteristicas_adicionales] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            const fetchEstatusVehiculo = async () => {
                try {
                    const response = await api.get('/getstatus');
                    setEstatusVehiculo(response.data);
                } catch (error) {
                    console.error('Error fetching vehicle statuses', error);
                }
            };
            fetchEstatusVehiculo();
            // Fetch vehicle data by ID if ID exists (update scenario)
            const fetchVehicle = async () => {
                try {
                    const response = await api.get(`/GetById/${id}`);
                    //console.log(response);
                    setVehicle(response.data);
                } catch (error) {
                    console.error('Error fetching vehicle data', error);
                }
            };

            fetchVehicle();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle((prevVehicle) => ({
            ...prevVehicle,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // console.log(entro if)
                const response = await api.put('/ActualizarVehiculo', vehicle);
                console.log(response)
            }
            else {
                const response = await api.post('/createVehiculo', vehicle);
                console.log(response)
            }
            window.location.href = '/vehicles';
        }
        catch (err) {
            console.log(err.message);
            setError('ocurrio un error de sistema');
        }
    };
    return (
        <div className="login-form">
            <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px', padding: '20px', backgroundColor: 'white' }}>
                <Card.Body>
                    <Card.Title>vehiculos configuracion</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={vehicle.id} onChange={handleChange} />
                        <FormGroup>
                            <FormLabel>marca</FormLabel>
                            <input type="text" className="form-control" id="marca" name="marca" value={vehicle.marca} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>modelo</FormLabel>
                            <input type="text" className="form-control" id="modelo" name="modelo" value={vehicle.modelo} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>color</FormLabel>
                            <input type="text" className="form-control" id="color" name="color" value={vehicle.color} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>placa</FormLabel>
                            <input type="text" className="form-control" id="placa" name="placa" value={vehicle.placa} onChange={handleChange} required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>año</FormLabel>
                            <input type="number" className="form-control" id="año" name="año" value={vehicle.año} onChange={handleChange} required />
                        </FormGroup>
                        {id && (
                            <div className="form-group">
                                <label>Estatus de Registro:</label>
                                <select
                                    className="form-control"
                                    name="ev_id"
                                    value={vehicle.ev_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione un estatus</option>
                                    {estatusVehiculo.map((estatus) => (
                                        <option key={estatus.id} value={estatus.id}>
                                            {estatus.descripcion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <Button variant='primary' type='submit' style={{ marginTop: '10px' }}> Guardar</Button>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};
export default VehicleForm;