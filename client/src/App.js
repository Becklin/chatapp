import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { Login, Join, Chat, PrivateRoute } from "./components";
import fakeAuth from './util/fakeAuth';
import "./index.scss";

const Home = () => <h3>Welcome to EazyChat</h3>;
/**
 * withRouter will pass updated match, location, 
 * and history props to the wrapped component whenever it renders.
 */
const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated
    ? <p>
        Welcome! <button onClick={() => {
          fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
      </p>
    : <p>You are not logged in.</p>
))

const App = () => (
  <Router>
    <AuthButton />`
    <ul>
      <li>
        <Link to="/home">Home Page</Link>
      </li>
      <li>
        <Link to="/Sign up">Sign up</Link>
      </li>
      <li>
        <Link to="/protected">Login</Link>
      </li>
    </ul>
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path='/protected' component={Join} />
    <PrivateRoute path='/chat' component={Chat} />
    {/* <Route path="/" exact component={Join} />
    <Route path="/chat" component={Chat} /> */}
  </Router>
);

export default App;
