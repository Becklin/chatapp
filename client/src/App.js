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
  Signup,
  AuthButton,
  Join,
  Chat,
  PrivateRoute
} from './components';
import './index.scss';

const App = () => (
  <Router>
    <Head>
      <AuthButton />
    </Head>
    <Route path="/" exact component={Home} />
    <Route path="/Signup" component={Signup} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/protected" component={Join} />
    <PrivateRoute path="/chat" component={Chat} />
    {/* <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} /> */}
  </Router>
);

export default App;
