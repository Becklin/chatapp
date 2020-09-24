import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
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
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Signup" component={Signup} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/join" component={Join} />
      <PrivateRoute path="/chat" component={Chat} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default App;
