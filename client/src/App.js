import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
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
