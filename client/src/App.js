import React from 'react';
// import { Toast } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  // Link,
  Route,
  Redirect,
  Switch
  // withRouter,
} from 'react-router-dom';
import { StatusContextProvider } from '../src/context/status-context';
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
// const NotFound = () => (
//   <div>
//     <p>The page does not exist</p>
//   </div>
// );
const App = () => (
  <Router>
    <StatusContextProvider>
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
    </StatusContextProvider>
  </Router>
);

export default App;
