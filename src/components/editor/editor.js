import React from 'react'
import { connect } from 'react-redux'

import Navbar from './navbar/navbar'

import './editor.scss'

const Editor = props => {
    const { width, height, pageCount, cards } = props

    const createAlbum = () => {
        let album = [];
        for (let i = 0; i < pageCount; i++) {
            album.push(<h2 key={"h2-" + i}>{`Page ${(i + 1)}`}</h2>);
            album.push(<div className="grid" key={i}>{createGrid(i + 1)}</div>)
        }
        return album
    }

    const createGrid = page => {
        let grid = []

        // Outer loop to create rows
        for (let i = 0; i < height; i++) {
          let children = []
          //Inner loop to create columns
          for (let j = 0; j < width; j++) {
            let cardNo = ((page-1)* width * height) + ((i * width) + (j + 1))

            let cardInner = [`CARD ${cardNo}`]
            if (cards[cardNo - 1]) {
                cardInner.push(<img key={"img-" + cardNo} className="cell-image" src={cards[cardNo - 1].img} alt={cards[cardNo - 1].name} />)
            }

            children.push(<div className="grid-cell" key={page+"-"+i+"-"+j} onClick={handleCellClick.bind(cardNo)}>{cardInner}</div>)
          }
          //Create the row and add the columns
          grid.push(<div className="grid-row" key={page+"-"+i}>{children}</div>)
        }
        return grid
    }

    const handleCellClick = () => {
    }

    return (
        <div className="Editor">
            <header className="Editor-header">
                <Navbar />
            </header>
            <main>
                {createAlbum()}
            </main>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        width: state.grid.x,
        height: state.grid.y,
        pageCount: state.grid.pages,
        cards: state.cards
    }
}
export default connect(mapStateToProps)(Editor)