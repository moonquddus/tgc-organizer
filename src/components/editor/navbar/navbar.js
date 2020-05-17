import React, {useState} from 'react'
import { connect } from 'react-redux'
import './navbar.scss'

import file from '../../../assets/svg/file.svg'
import undo from '../../../assets/svg/undo.svg'
import redo from '../../../assets/svg/redo.svg'

import NewCard from '../../newCard/newCard'

const Navbar = props => {
  const { historyPosition } = props
  const [showNewCard, setShowNewCard] = useState(false)

  return (
    <div className='editor-navbar'>
      <NewCard open={showNewCard} setOpen={setShowNewCard} />
      <ul>
        <li onClick={() => setShowNewCard(!showNewCard)}><img src={file} alt='New Card' /></li>
        <li><img src={undo} alt='Undo' /></li>
        <li><img src={redo} alt='Redo' /></li>
        <li>{historyPosition}</li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
      historyPosition: state.historyPosition
  }
}
export default connect(mapStateToProps)(Navbar)