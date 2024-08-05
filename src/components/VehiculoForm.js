import React, { useState } from 'react';
import { Form, Button, Alert, Card, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import api from '../utils/axiosConfig'; // configuracion axios

const VehicleForm=() => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [caracteristicas_adicionales, setCaracteristicas_adicionales] = useState('');
    const [error,setError]=useState('');
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
        const response= await api.post('/createVehiculo',{marca,modelo,color,caracteristicas_adicionales});
        console.log(response)
        window.location.href='/vehicles';
        }
        catch(err){
            console.log(err.message);
            setError('ocurrio un error de sistema');
        }
    };
return(
    <div className="login-form">
    <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px', padding: '20px',backgroundColor:'white' }}>
      <Card.Body>
        <Card.Title>vehiculos configuracion</Card.Title>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <FormLabel>marca</FormLabel>
                <FormControl type='text' value={marca} onChange={(e)=> setMarca(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>modelo</FormLabel>
                <FormControl type='text' value={modelo} onChange={(e)=> setModelo(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>color</FormLabel>
                <FormControl type='text' value={color} onChange={(e)=> setColor(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>caracteristicas_adicionales</FormLabel>
                <FormControl as='textarea' rows={3} value={caracteristicas_adicionales} onChange={(e)=> setCaracteristicas_adicionales(e.target.value)}></FormControl>
            </FormGroup>
            <Button variant='primary' type='submit' style={{ marginTop: '10px' }}> Guardar</Button>
            {error && <Alert variant="danger">{error}</Alert>}
            </Form>
            </Card.Body>
            </Card>
            </div>
);
};
export default VehicleForm;