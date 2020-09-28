import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
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
const NotFound = () => (
  <div>
    <p>The page does not exist</p>
  </div>
);
const App = () => (
  <Router>
<<<<<<< HEAD
    <Container>
      <Row>
        <Head>
          <AuthButton />
        </Head>
      </Row>
      <Row>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/join" component={Join} />
          <PrivateRoute path="/chat" component={Chat} />
          <Redirect from="*" to="/" />
        </Switch>
      </Row>
    </Container>
=======
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
>>>>>>> a1a85b0189a791e8847a5caad7a08cccde5f4e36
  </Router>
);

export default App;
