import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from './navbar/navbar'
import PageNav from './pageNav/pageNav'

import './editor.scss'

const Editor = props => {
    const { width, height, pageCount, album } = props
    const { page } = useParams()
    const currentPage = parseInt(page)

    const createAlbum = () => {
        let album = [];

        if (Number.isInteger(currentPage) && currentPage && currentPage <= pageCount){
            let i = currentPage - 1
            album.push(<h2 key={"h2-" + i}>{`Page ${(i + 1)}`}</h2>)
            album.push(<div className="grid" key={i}>{createGrid(i + 1)}</div>)
        }
        else {
            for (let i = 0; i < pageCount; i++) {
                album.push(<h2 key={"h2-" + i}>{`Page ${(i + 1)}`}</h2>)
                album.push(<div className="grid" key={i}>{createGrid(i + 1)}</div>)
            }
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
            let gridIndex = (i * width) + j

            let cardInner = [`GRID-${gridIndex + 1} CARD-${cardNo}`]
            if (album[page][gridIndex] && album[page][gridIndex].img) {
                cardInner.push(<img key={"img-" + cardNo} className="cell-image" src={album[page][gridIndex].img} alt={album[gridIndex].name} />)
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
            <header className="editor-header">
                <Navbar />
            </header>
            <main>
                {createAlbum()}
            </main>
            <footer className="editor-footer">
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