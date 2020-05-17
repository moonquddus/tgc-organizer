import React, { useState } from 'react';
import { connect } from 'react-redux'
import './newgame.scss';
import { updateGrid, initAlbum } from "../../actions";

const NewGame = props => {
  const { grid, history, dispatch } = props

  const [formX, setFormX] = useState(grid.x)
  const [formY, setFormY] = useState(grid.y)
  const [formP, setFormP] = useState(grid.pages)

  const handleSubmit = e => {
    dispatch(updateGrid({
      grid:{
        x: formX,
        y: formY,
        pages: formP
      }
    }));

    // create a new empty album
    let album = []
    for (let i = 0; i < formP; i++){
      let page = []
      for (let j = 0; j < (formX * formY); j++){
        page.push({})
      }
      album.push(page)
    }
    dispatch( initAlbum({ 
      album: album, 
      pile: []
    }) )

    history.push('/editor/1');
  }

  return (
    <div className="newgame">
      <header className="newgame-header">
        <h2>Configure New Album</h2>
        <p>These settings can be changed later</p>
      </header>
      
      <main>
        <form onSubmit={handleSubmit.bind(this)}>
          <div className="form-control">
            <label htmlFor="grid_x">Width: <input type="number" name="grid_x" value={formX} onChange={(e) => setFormX(e.target.value)} /></label>
          </div>
          <div className="form-control">
            <label htmlFor="grid_y">Height: <input type="number" name="grid_y" value={formY} onChange={(e) => setFormY(e.target.value)} /></label>
          </div>
          <div className="form-control">
            <label htmlFor="grid_pages">Pages: <input type="number" name="grid_pages" value={formP} onChange={(e) => setFormP(e.target.value)} /></label>
          </div>
          <div className="form-control">
            <button type="submit">Create New Album</button>
          </div>
        </form>
      </main>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    grid: state.grid
  }
}
export default connect(mapStateToProps)(NewGame)