import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Menu from '../menu/menu';
import NewGame from '../newgame/newgame';

import './app.css';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Menu} />
        <Route path="/new-game" component={NewGame} />
      </Switch>
    );
  }
}

export default App;
