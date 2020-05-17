import React, {useState, createRef} from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import './navbar.scss'

import table from '../../../assets/svg/table.svg'
import file from '../../../assets/svg/file.svg'
import undo from '../../../assets/svg/undo.svg'
import redo from '../../../assets/svg/redo.svg'
import folder from '../../../assets/svg/folder.svg'
import save from '../../../assets/svg/save.svg'

import NewCard from '../../newCard/newCard'

import {updateGrid, initAlbum, undoHistory, redoHistory} from '../../../actions'
import {encodeSaveData, decodeSaveData, saveToFile} from '../../../util/fileManager'

const Navbar = props => {
  const { grid, album, pile, historyPosition, historyLength, dispatch } = props
  const [showNewCard, setShowNewCard] = useState(false)
  const isThereHistory = !!historyLength
  const viewHistory = useHistory()

  const canUndo = isThereHistory && historyPosition < (historyLength - 1)
  const canRedo = historyPosition

  const undoHandler = () => canUndo ? dispatch(undoHistory()) : console.log("NO UNDO FOR YOU")
  const redoHandler = () => canRedo ? dispatch(redoHistory()) : console.log("NO REDO FOR YOU")

  const saveHandler = () => {
    const saveState = encodeSaveData({grid, album, pile})
    saveToFile('savedalbum.json', saveState)
  }

  const newGameHandler = () => {
    if (window.confirm("Warning: you will lose any unsaved changes.")){
      viewHistory.push('/new-game')
    }
  }

  const fileInputRef = createRef()
  const loadHandler = () => {
    if (window.confirm("Warning: you will lose any unsaved changes.")){
      fileInputRef.current.click()
    }
  }

  const fileHandler = e => {
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
    });
    reader.readAsText(theFile)
    viewHistory.push('/editor/1')
  }

  return (
    <div className='editor-navbar'>
      <NewCard open={showNewCard} setOpen={setShowNewCard} />
      <ul>
        <li onClick={newGameHandler}><img src={table} alt='New Album' /></li>
        <li onClick={loadHandler}><img src={folder} alt='Open' /></li>
        <li onClick={saveHandler}><img src={save} alt='Save' /></li>
        <li class="divider"></li>
        <li onClick={() => setShowNewCard(!showNewCard)}><img src={file} alt='New Card' /></li>
        <li onClick={undoHandler}><img src={undo} alt='Undo' /></li>
        <li onClick={redoHandler}><img src={redo} alt='Redo' /></li>
      </ul>
      <input type="file" id="load-file" name="load-file" ref={fileInputRef} onChange={fileHandler} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
      grid: state.grid,
      album: state.album,
      pile: state.pile,
      historyPosition: state.historyPosition,
      historyLength: state.history.length
  }
}
export default connect(mapStateToProps)(Navbar)