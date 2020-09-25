import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import auth from '../../util/auth';
import axios from 'axios';
import './index.scss';

const Login = props => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = e => {
    // auth.authenticate(() => {
    //   setRedirectToReferrer(true);
    // });
    e.preventDefault();
    axios
      .post('http://localhost:5000/afeagresgrtgtr', {
        username,
        password
      })
      .then(response => {
        // auth.authenticate(() => {
        //   setRedirectToReferrer(true);
        // });
      })
      .catch(error => {
        console.log('catch', error);
      });
    // axios
    //   .post('http://localhost:5000/api/auth/signin', {
    //     username,
    //     password
    //   })
    //   .then(response => {
    //     auth.authenticate(() => {
    //       setRedirectToReferrer(true);
    //     });
    //   })
    //   .catch(error => {
    //     console.log('catch', error);
    //   });
  };
  const { from } = props.location.state || { from: { pathname: '/' } };
  if (redirectToReferrer === true) {
    // return <Redirect to={from} />;
    return <Redirect to="join" />;
  }
  const handleNameChange = e => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Username"
        onChange={handleNameChange}
      />
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button onClick={login} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
