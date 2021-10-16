import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { NotificationContextProvider } from '../src/context/notification-context';
import { Head, AuthButton } from './components';
import './index.scss';
import { vars } from './variables';

const Home = lazy(() => import('./components/Home'));
const Join = lazy(() => import('./components/Join'));
const Chat = lazy(() => import('./components/Chat'));

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
            background: ${vars.bgGradient};
            color: ${vars.ChatFontColor};
            min-height: 100%;
            //prevent pull-down-to-refresh of mobile chrome
            overscroll-behavior-y: contain;
          }
        `}
      />
      <Head>
        <AuthButton />
      </Head>
      <Suspense fallback={() => <div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/Signup" component={Signup} />
          <Route path="/login" component={Login} /> */}
          {/* <PrivateRoute path="/join" component={Join} />
          <PrivateRoute path="/chat" component={Chat} /> */}
          <Route path="/join" component={Join} />
          <Route path="/chat" component={Chat} />
          <Redirect from="*" to="/" />
        </Switch>
      </Suspense>
    </NotificationContextProvider>
  </Router>
);

export default App;
