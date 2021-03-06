import React from 'react';
// import { Toast } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  // Link,
  Route,
  Redirect,
  Switch,
  // withRouter,
} from 'react-router-dom';
import { NotificationContextProvider } from '../src/context/notification-context';
import {
  Home,
  Head,
  Login,
  Signup,
  AuthButton,
  Join,
  Chat,
  PrivateRoute,
} from './components';
import './index.scss';
// const NotFound = () => (
//   <div>
//     <p>The page does not exist</p>
//   </div>
// );
const App = () => (
  <Router>
    <NotificationContextProvider>
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
    </NotificationContextProvider>
  </Router>
);

export default App;
