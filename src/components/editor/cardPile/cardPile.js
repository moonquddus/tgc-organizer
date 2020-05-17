import React, {useState} from 'react'
import { connect, useSelector } from 'react-redux'
import './cardPile.scss'

const CardPile = props => {
  const { pageCount, pile } = props

  const generatePile = () => {
    let pileOutput = []
    pile.map((card, index) => pileOutput.push(
      <li key={`pile-${index}`}><img src={card.img} alt={card.name} /></li>
    ))
    return pileOutput
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
      pile: state.pile
  }
}
export default connect(mapStateToProps)(CardPile)