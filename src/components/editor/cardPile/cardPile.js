import React, {useState} from 'react'
import { connect } from 'react-redux'
import './cardPile.scss'

const CardPile = props => {
  const { pageCount, history, historyPosition, pile } = props

  const generatePile = () => {
    pile.map(card => (
      <li>{card.name}</li>
    ))
  }

  return (
    <div className={`editor-pile ${pageCount ? 'above-pagination' : 'no-pagination'}`}>
      <ul> 
        {generatePile()}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
      pageCount: state.grid.pages,
      history: state.history,
      historyPosition: state.historyPosition,
      pile: state.pile
  }
}
export default connect(mapStateToProps)(CardPile)