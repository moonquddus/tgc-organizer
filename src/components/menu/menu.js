import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import logo from '../../assets/images/logo.svg'
import './menu.scss'

import { decodeSaveData } from '../../util/fileManager'
import { updateGrid, initAlbum } from '../../actions'

const Menu = props => {
  const {history, dispatch} = props

  const fileHandler = (e) => {
    const theFile = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      const saveData = decodeSaveData(event.target.result)
      dispatch(updateGrid({
        grid: saveData.grid
      }))
      dispatch(initAlbum({
        album: saveData.album,
        pile: saveData.pile
      }))
      history.push('/tgc-organizer/editor/1')
    });
    reader.readAsText(theFile)
  }
  
  return (
    <div className="Menu">
      <header className="Menu-header">
        <img src={logo} className="Menu-logo" alt="logo" />
        <p>TCG Card Organizer</p>
        <p><Link to="/tgc-organizer/new-game/">New</Link></p>
        <p><label htmlFor='load-file'>Load Saved File<input type="file" id="load-file" name="load-file" onChange={fileHandler} /></label></p>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
      </header>
    </div>
  )
}
export default connect()(Menu)