import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from './navbar/navbar'
import PageNav from './pageNav/pageNav'
import CardPile from './cardPile/cardPile'

import './editor.scss'

const Editor = props => {
    const { width, height, pageCount, album } = props
    const { page } = useParams()
    const currentPage = parseInt(page)

    const createAlbumEditor = () => {
        let albumEditor = [];

        if (Number.isInteger(currentPage) && currentPage && currentPage <= pageCount){
            let i = currentPage - 1
            albumEditor.push(<h2 key={"h2-" + i}>{`Page ${(i + 1)}`}</h2>)
            albumEditor.push(<div className="grid" key={i}>{createGrid(i)}</div>)
        }
        else {
            for (let i = 0; i < pageCount; i++) {
                albumEditor.push(<h2 key={"h2-" + i}>{`Page ${(i + 1)}`}</h2>)
                albumEditor.push(<div className="grid" key={i}>{createGrid(i)}</div>)
            }
        }

        return albumEditor
    }

    const createGrid = selectedPage => {
        let grid = []

        // Outer loop to create rows
        for (let i = 0; i < height; i++) {
          let children = []
          //Inner loop to create columns
          for (let j = 0; j < width; j++) {
            let cardNo = ((selectedPage)* width * height) + ((i * width) + (j + 1))
            let gridIndex = (i * width) + j

            let cardInner = [`CARD ${cardNo}`]
            if (album[selectedPage][gridIndex] && album[selectedPage][gridIndex].img) {
                cardInner.push(<img key={"img-" + cardNo} className="cell-image" src={album[selectedPage][gridIndex].img} alt={album[gridIndex].name} />)
            }

            children.push(<div className="grid-cell" key={selectedPage+"-"+i+"-"+j} onClick={handleCellClick.bind(cardNo)}>{cardInner}</div>)
          }
          //Create the row and add the columns
          grid.push(<div className="grid-row" key={selectedPage+"-"+i}>{children}</div>)
        }
        return grid
    }

    const handleCellClick = () => {
    }

    return (
        <div className="Editor">
            <header className="editor-header">
                <Navbar />
            </header>
            <main>
                {createAlbumEditor()}
            </main>
            <footer className="editor-footer">
                <CardPile />
                <PageNav page={currentPage} />
            </footer>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        width: state.grid.x,
        height: state.grid.y,
        pageCount: state.grid.pages,
        album: state.album
    }
}
export default connect(mapStateToProps)(Editor)