import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import { ArrowLeftCircle, PeopleFill } from 'react-bootstrap-icons';
import './index.scss';
import auth from '../../util/auth';

/**
 * withRouter will pass updated match, location,
 * and history props to the wrapped component whenever it renders.
 */
const AuthButton = withRouter(({ history }) =>
  auth.isAuthenticated ? (
    <Button
      onClick={() => {
        auth.signout(() => history.push('/'));
      }}
    >
      Sign out
    </Button>
  ) : (
    <p>You are not logged in.</p>
  )
);

export default AuthButton;
