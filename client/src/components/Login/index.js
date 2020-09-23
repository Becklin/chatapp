import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import fakeAuth from '../../util/fakeAuth';
import './index.scss';

const Login = props => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true);
    });
  };
  console.log(props);
  const { from } = props.location.state || { from: { pathname: '/' } };

  if (redirectToReferrer === true) {
    console.log('from', from);
    return <Redirect to={from} />;
  }

  return (
    <Form>
      <Form.Control type="text" placeholder="Normal text" />
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button onClick={login} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
