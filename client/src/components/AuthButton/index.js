import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  ArrowLeftCircle,
  PeopleFill,
  BoxArrowLeft,
} from 'react-bootstrap-icons';
import './index.scss';
import AuthService from '../../util/auth';

/**
 * withRouter will pass updated match, location,
 * and history props to the wrapped component whenever it renders.
 */
const AuthButton = withRouter(
  ({ history }) =>
    AuthService.getCurrentUser() && (
      <BoxArrowLeft
        size="30"
        color="#fff"
        onClick={() => {
          AuthService.logout();
          history.push('/');
        }}
      >
        Sign out
      </BoxArrowLeft>
    )
);

export default AuthButton;
