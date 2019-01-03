import React, { Component } from 'react';
import './newgame.scss';
import store from '../../store';
import { updateGrid } from "../../actions";

class NewGame extends Component {
  constructor(props) {
    super(props);

    this.formRef = {
      x: React.createRef(),
      y: React.createRef(),
      pages: React.createRef()
    };

    store.subscribe(() => console.log(store.getState()));
  }

  handleSubmit(e) {
    e.preventDefault();
    
    let grid = {
      x: this.formRef.x.current.value,
      y: this.formRef.y.current.value,
      pages: this.formRef.pages.current.value
    };

    store.dispatch( updateGrid( { grid: grid } ) );

    this.props.history.push('/editor');
  }
  
  render() {
    return (
      <div className="newgame">
        <header className="newgame-header">
          <h2>Configure New Album</h2>
          <p>These settings can be changed later</p>
        </header>
        
        <main>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-control">
              <label htmlFor="grid_x">Width: <input type="number" name="grid_x" ref={this.formRef.x} defaultValue="3" /></label>
            </div>
            <div className="form-control">
              <label htmlFor="grid_y">Height: <input type="number" name="grid_y" ref={this.formRef.y} defaultValue="3" /></label>
            </div>
            <div className="form-control">
              <label htmlFor="grid_pages">Pages: <input type="number" name="grid_pages" ref={this.formRef.pages} defaultValue="2" /></label>
            </div>
            <div className="form-control">
              <button type="submit">Create New Album</button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default NewGame;