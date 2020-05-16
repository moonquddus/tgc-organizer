import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Menu from '../menu/menu';
import NewGame from '../newgame/newgame';
import Editor from '../editor/editor';

import './app.scss';

const App = () => (
  <Switch>
    <Route exact path="/" component={Menu} />
    <Route path="/new-game" component={NewGame} />
    <Route path="/editor/:page" component={Editor} />
    <Route path="/editor" component={Editor} />
  </Switch>
)

export default App