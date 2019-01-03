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
            album.push(<h2 key={"h2-" + i}>{`Page ${(i + 1)}`}</h2>);
            album.push(<div className="grid" key={i}>{this.createGrid(i + 1)}</div>)
        }
        return album;
    }

    createGrid(page) {
        let grid = []
        let state = store.getState();

        // Outer loop to create rows
        for (let i = 0; i < this.height; i++) {
          let children = []
          //Inner loop to create columns
          for (let j = 0; j < this.width; j++) {
            let cardNo = ((page-1)*state.grid.x*state.grid.y) + ((i * state.grid.x) + (j + 1));
            
            let cardInner = [`CARD ${cardNo}`];
            if (state.cards[cardNo - 1]) {
                cardInner.push(<img key={"img-" + cardNo} className="cell-image" src={state.cards[cardNo - 1].img} alt={state.cards[cardNo - 1].name} />);
            }

            children.push(<div className="grid-cell" key={page+"-"+i+"-"+j} onClick={this.handleCellClick.bind(cardNo)}>{cardInner}</div>)
          }
          //Create the row and add the columns
          grid.push(<div className="grid-row" key={page+"-"+i}>{children}</div>)
        }
        return grid
    }

    handleCellClick() {
        let state = store.getState();
        let cardNo = this;
        console.log("CARD:", state.cards[cardNo - 1]);
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