import React, {useState} from 'react'
import { connect } from 'react-redux'
import './navbar.scss'

import NewCard from '../../newCard/newCard'

const Navbar = props => {
  const [showNewCard, setShowNewCard] = useState(false)

  return (
    <div className='editor-navbar'>
      <NewCard open={showNewCard} setOpen={setShowNewCard} />
      <p onClick={() => setShowNewCard(!showNewCard)}>New Card</p>
    </div>
  )
}

export default Navbar