import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import {
  Home,
  Head,
  Login,
  AuthButton,
  Join,
  Chat,
  PrivateRoute
} from './components';
import fakeAuth from './util/fakeAuth';
import './index.scss';

const App = () => (
  <Router>
    <Head>
      <AuthButton />
    </Head>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/protected" component={Join} />
    <PrivateRoute path="/chat" component={Chat} />
    {/* <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} /> */}
  </Router>
);

export default App;
