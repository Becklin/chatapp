import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import fakeAuth from '../../util/fakeAuth';
import './index.scss';

class Login extends React.Component {
    state = {
      redirectToReferrer: false
    }
    login = () => {
      fakeAuth.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }
    render() {
        console.log(this.props);
      const { from } = this.props.location.state || { from: { pathname: '/' } }
      const { redirectToReferrer } = this.state
  
      if (redirectToReferrer === true) {
          console.log('from', from);
        return <Redirect to={from} />
      }
  
      return (
        <div>
          <p>You must log in to view the page</p>
          <button onClick={this.login}>Log in</button>
        </div>
      )
    }
  }

  export default Login;