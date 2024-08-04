// src/components/LoginForm.js

import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      const { token } = response.data;
      
      // Almacenar el token en localStorage
      localStorage.setItem('token', token);

      // Redirigir a la página principal o dashboard
      window.location.href = '/';
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-form" style={{backgroundColor:'gray'}}>
      <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px', padding: '20px',backgroundColor:'white' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginForm;
