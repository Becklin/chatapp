import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './index.scss';

const Signup = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/auth/signup', {
        username,
        email
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('catch', error);
      });
  };
  const handleNameChange = e => {
    setUsername(e.target.value);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Normal text"
        onChange={handleNameChange}
        value={username}
      />
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={handleEmailChange}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </Form.Group>
      <Button onClick={signup} variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default Signup;
