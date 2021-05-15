import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Box from '../Box';
import { NotificationContext } from '../../context/notification-context';
import AuthService from '../../util/auth';
import './index.scss';

const Signup = () => {
  const [notification, setNotification] = useContext(NotificationContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasSignup, setHasSignup] = useState(false);

  const signup = (e) => {
    e.preventDefault();
    AuthService.signup(username, email, password, ['user'])
      .then(() => {
        setHasSignup(true);
      })
      .catch((error) => {
        setNotification({
          status: error.name,
          content: error.message,
        });
        setTimeout(() => {
          setNotification({
            status: null,
            content: null,
          });
        }, 3000);
      });
  };
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  if (hasSignup) return <Redirect to="login" />;
  return (
    <Box
      title="Sign Up"
      notification={notification}
      content={
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Normal text"
              onChange={handleNameChange}
              value={username}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={handleEmailChange}
              value={email}
            />
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
    />
  );
};

export default Signup;
