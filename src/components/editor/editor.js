import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './editor.scss';
import store from '../../store';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.width = this.state.grid.x;
        this.height = this.state.grid.y;
        this.pageCount = this.state.grid.pages;
    } 

    createAlbum() {
        let album = [];
        for (let i = 0; i < this.pageCount; i++) {
            album.push(<h2>{`Page ${(i + 1)}`}</h2>);
            album.push(<div className="grid" key={i}>{this.createGrid()}</div>)
        }
        console.log("ALBUM", album);
        return album;
    }

    createGrid = () => {
        let grid = []
    
        // Outer loop to create rows
        for (let i = 0; i < this.height; i++) {
          let children = []
          //Inner loop to create columns
          for (let j = 0; j < this.width; j++) {
            children.push(<div className="grid-column" key={j}>{`Card ${(i * 3) + (j + 1)}`}</div>)
          }
          //Create the row and add the columns
          grid.push(<div className="grid-row" key={i}>{children}</div>)
        }
        return grid
    }


    render() {
        return (
            <div className="Editor">
                <header className="Editor-header">
                    <h1>My Album</h1>
                </header>
                <main>
                    {this.createAlbum()}
                </main>
            </div>
        );
    }
}

export default Editor;