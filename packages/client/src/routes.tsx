import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, Entry } from 'pages';
import { MainLayout } from 'layouts';

const Routes: React.FC = () => (
  <MainLayout>
    <Switch>
      <Route path="/home" component={Home} />
      <Route exact path="/entry" component={Entry} />
      <Route path="/entry/:id" component={Entry} />
      <Redirect from="/" to="/home" />
    </Switch>
  </MainLayout>
);

export default Routes;
