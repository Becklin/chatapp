import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../util/auth';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  console.log("location", location);
  return (
  <Route
    {...rest}
    render={(props) =>
      AuthService.getCurrentUser() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
)};

PrivateRoute.propTypes = {
  component: PropTypes.Component,
  location: PropTypes.string,
}


export default PrivateRoute;
