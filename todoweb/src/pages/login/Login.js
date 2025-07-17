import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../context/authcontext/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  });

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/public/login', loginData, {
        headers: { 'Content-Type': 'application/json' }
      });
      setToken(response.data);
      navigate('/');
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Invalid name or password");
    }


  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: '400px', padding: '20px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={loginData.userName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
