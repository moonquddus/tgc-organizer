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

    const [srcSwap, setSrcSwap] = useState(null)
    const [trgSwap, setTrgSwap] = useState(null)

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
            targetCard = parseInt(pileId)
            setSrcSwap(targetCard)
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
            targetCard = parseInt(pileId)
            setTrgSwap(targetCard)
        }
    }

    useEffect(() => {
        if (srcSwap !== null && trgSwap !== null){
            if (Array.isArray(srcSwap)){
                if (trgSwap.length === 2){
                    gridToGridSwap()
                }
                else{
                    gridToPileSwap()
                }
            }
            else if (!Array.isArray(srcSwap)){
                if (trgSwap.length === 2){
                    pileToGridSwap()
                }
            }
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
        resetDragTargets()
    }

    const gridToPileSwap = () => {
        let newAlbum = [...album]
        let newPile = [...pile]
        const cardA = album[srcSwap[0]][srcSwap[1]]
        newAlbum[srcSwap[0]][srcSwap[1]] = null
        newPile.push(cardA)

        dispatch( updateAlbum({ 
            album: newAlbum, 
            pile: newPile
        }) )
        resetDragTargets()
    }

    const pileToGridSwap = () => {
        let newAlbum = [...album]
        let newPile = [...pile]
        const cardA = pile[srcSwap]
        const cardB = album[trgSwap[0]][trgSwap[1]]
        newAlbum[trgSwap[0]][trgSwap[1]] = cardA
        newPile.splice(srcSwap, 1)
        // Are we swapping cards, or inserting into an empty grid slot?
        if (cardB !== null){
            newPile.push(cardB)
        }

        dispatch( updateAlbum({ 
            album: newAlbum, 
            pile: newPile
        }) )
        resetDragTargets()
    }

    const resetDragTargets = () => {
        setSrcSwap(null)
        setTrgSwap(null)
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
                cardInner.push(<img data-album-id={`${selectedPage}-${gridIndex}`} key={"img-" + cardNo} className="cell-image" src={album[selectedPage][gridIndex].img} alt={album[selectedPage][gridIndex].name} />)
            }

            children.push(<div data-album-id={`${selectedPage}-${gridIndex}`} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDrop={dragEndHandler} className="grid-cell" key={selectedPage+"-"+i+"-"+j} onClick={handleCellClick.bind(cardNo)}>{cardInner}</div>)
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
                <CardPile
                    dragStartHandler={dragStartHandler}
                    dragOverHandler={dragOverHandler}
                    dragEndHandler={dragEndHandler}
                />
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