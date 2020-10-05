import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Toast } from 'react-bootstrap';
import Box from '../Box';
import axios from 'axios';
import './index.scss';

const Signup = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasSignup, setHasSignup] = useState(false);
  const [hasError, setHasError] = useState(false);

  const signup = e => {
    e.preventDefault();
    axios
      .post('/api/auth/signup', {
        username,
        email,
        password,
        roles: ['user']
      })
      .then(response => {
        setHasSignup(true);
      })
      .catch(error => {
        console.log('catch', error);
        setHasError(true);
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
  if (hasSignup) return <Redirect to="login" />;
  return (
    <Box
      title="Sign Up"
      content={
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
        </Form>
      }
      control={
        <Button onClick={signup} variant="primary" type="submit">
          Sign Up
        </Button>
      }
      setHasNotification={setHasError}
      hasNotification={hasError}
      notificationContent="Oops, something went wrong!"
    />
  );
};

export default Signup;
