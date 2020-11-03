import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import Box from '../Box';
import { NotificationContext } from '../../context/notification-context';
import AuthService from '../../util/auth';
import './index.scss';

const Login = (props) => {
  const [notification, setNotification] = useContext(NotificationContext);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = (e) => {
    e.preventDefault();
    AuthService.login(username, password)
      .then((response) => {
        // 以驗證mongodb data以及設定localstorage
        setRedirectToReferrer(true);
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
  // const { from } = props.location.state || { from: { pathname: '/' } };
  if (redirectToReferrer === true) {
    return <Redirect to="join" />;
  }
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
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
