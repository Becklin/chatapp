import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import Box from '../Box';
import { StatusContext } from '../../context/status-context';
import AuthService from '../../util/auth';
import './index.scss';

const Login = props => {
  const [status, setStatus] = useContext(StatusContext);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [hasError, setHasError] = useState(false);

  const login = e => {
    e.preventDefault();
    AuthService.login(username, password)
      .then(response => {
        // 以驗證mongodb data以及設定localstorage
        console.log('資料', response);
        setRedirectToReferrer(true);
      })
      .catch(error => {
        console.log('catch', error);
        setStatus('Oops, something went wrong!');
        // setHasError(true);
      });
  };
  // const { from } = props.location.state || { from: { pathname: '/' } };
  if (redirectToReferrer === true) {
    return <Redirect to="join" />;
  }
  const handleNameChange = e => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Box
        title="Login"
        content={
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </Form.Group>
          </Form>
        }
        control={
          <Button onClick={login} variant="primary" type="submit">
            Submit
          </Button>
        }
        // setHasNotification={setHasError}
        // hasNotification={hasError}
        // notificationContent="Oops, something went wrong!"
      />
    </>
  );
};

export default Login;
