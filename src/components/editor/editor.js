import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from './navbar/navbar'
import PageNav from './pageNav/pageNav'
import CardPile from './cardPile/cardPile'

import { updateAlbum } from "../../actions";
import './editor.scss'

const Editor = props => {
    const { width, height, pageCount, album, pile, dispatch } = props
    const { page } = useParams()
    const currentPage = parseInt(page)

    const [srcSwap, setSrcSwap] = useState([])
    const [trgSwap, setTrgSwap] = useState([])

    const dragStartHandler = e => {
        const albumId = e.target.dataset.albumId
        const pileId = e.target.dataset.pileId
        let albumCoords, targetCard
        if (albumId){
            albumCoords = albumId.split('-')
            targetCard = [parseInt(albumCoords[0]), parseInt(albumCoords[1])]
            setSrcSwap(targetCard)
        }
        else if (pileId){
            
        }
    }

    const dragOverHandler = e => {
        e.preventDefault()
    }

    const dragEndHandler = e => {
        const albumId = e.target.dataset.albumId
        const pileId = e.target.dataset.pileId
        let albumCoords, targetCard
        if (albumId){
            albumCoords = albumId.split('-')
            targetCard = [parseInt(albumCoords[0]), parseInt(albumCoords[1])]
            setTrgSwap(targetCard)
        }
        else if (pileId){
            
        }
    }

    useEffect(() => {
        if (trgSwap.length === 2){
            gridToGridSwap()
        }
        else{
            gridToPileSwap()
        }
    }, [trgSwap])

    const gridToGridSwap = () => {
        let newAlbum = [...album]
        const cardA = album[srcSwap[0]][srcSwap[1]]
        const cardB = album[trgSwap[0]][trgSwap[1]]
        newAlbum[trgSwap[0]][trgSwap[1]] = cardA
        newAlbum[srcSwap[0]][srcSwap[1]] = cardB

        dispatch( updateAlbum({ 
            album: newAlbum, 
            pile: pile
        }) )
    }

    const gridToPileSwap = () => {

    }

    const pileToGridSwap = () => {
        
    }

    const createAlbumEditor = () => {
        let albumEditor = []

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
                cardInner.push(<img data-album-id={`${selectedPage}-${cardNo-1}`} key={"img-" + cardNo} className="cell-image" src={album[selectedPage][gridIndex].img} alt={album[selectedPage][gridIndex].name} />)
            }

            children.push(<div data-album-id={`${selectedPage}-${cardNo-1}`} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDrop={dragEndHandler} className="grid-cell" key={selectedPage+"-"+i+"-"+j} onClick={handleCellClick.bind(cardNo)}>{cardInner}</div>)
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
        album: state.album,
        pile: state.pile
    }
}
export default connect(mapStateToProps)(Editor)