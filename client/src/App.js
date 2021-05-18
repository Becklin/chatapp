import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Global, css } from "@emotion/react";
import emotionNormalize from 'emotion-normalize';
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
import {colors}  from "./variables";
// main: "#3cb67f",
// BtnBgColor: "#2F80EB",
// BorderDecoColor: "#ECECEE",
// MainFontColor: "#2A3346",
// ChatFontColor: "#808187",
// ChatRoomBfColor: "#F2F3F7",
const App = () => (
  <Router>
    <NotificationContextProvider>
      <Global
        styles={css`
          ${emotionNormalize}
          html,
          body {
            padding: 0;
            margin: 0;
            background: ${colors.bgGradient};
            color: ${colors.ChatFontColor};
            min-height: 100%;
            //prevent pull-down-to-refresh of mobile chrome
            overscroll-behavior-y: contain;
          }
        `}
      />
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
