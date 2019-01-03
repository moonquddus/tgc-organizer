import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../../assets/images/logo.svg';
import './menu.scss';

class Menu extends Component {
  
  render() {
    return (
      <div className="Menu">
        <header className="Menu-header">
          <img src={logo} className="Menu-logo" alt="logo" />
          <p>TCG Card Organizer</p>
          <p><Link to="/new-game/">New</Link></p>
          <p><button>Load</button></p>
        </header>
      </div>
    );
  }
}

export default Menu;