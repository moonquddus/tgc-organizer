import React, {useState} from 'react'
import { connect } from 'react-redux'
import './navbar.scss'

import file from '../../../assets/svg/file.svg'
import undo from '../../../assets/svg/undo.svg'
import redo from '../../../assets/svg/redo.svg'
import save from '../../../assets/svg/save.svg'

import NewCard from '../../newCard/newCard'

import {undoHistory, redoHistory} from '../../../actions'

const Navbar = props => {
  const { historyPosition, historyLength, dispatch } = props
  const [showNewCard, setShowNewCard] = useState(false)

  console.log("HISTORY POSITION", historyPosition)

  const isThereHistory = !!historyLength

  const canUndo = isThereHistory && historyPosition < (historyLength - 1)
  const canRedo = historyPosition

  const undoHandler = () => canUndo ? dispatch(undoHistory()) : console.log("NO UNDO FOR YOU")
  const redoHandler = () => canRedo ? dispatch(redoHistory()) : console.log("NO REDO FOR YOU")

  return (
    <div className='editor-navbar'>
      <NewCard open={showNewCard} setOpen={setShowNewCard} />
      <ul>
        <li onClick={() => setShowNewCard(!showNewCard)}><img src={file} alt='New Card' /></li>
        <li onClick={undoHandler}><img src={undo} alt='Undo' /></li>
        <li onClick={redoHandler}><img src={redo} alt='Redo' /></li>
        <li><img src={save} alt='Save' /></li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
      historyPosition: state.historyPosition,
      historyLength: state.history.length
  }
}
export default connect(mapStateToProps)(Navbar)