import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Menu from '../menu/menu';
import NewGame from '../newgame/newgame';
import Editor from '../editor/editor';

import './app.scss';

const App = () => (
  <Switch>
    <Redirect from='/' to='/tgc-organizer' />
    <Route exact path="/tgc-organizer" component={Menu} />
    <Route path="/tgc-organizer/new-game" component={NewGame} />
    <Route path="/tgc-organizer/editor/:page" component={Editor} />
    <Route path="/tgc-organizer/editor" component={Editor} />
  </Switch>
)

const mapStateToProps = (state) => {
  return { 
      isLoggedIn: state.isLoggedIn
  }
}
export default connect(mapStateToProps)(App)