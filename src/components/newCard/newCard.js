import React, {useState} from 'react'
import { connect } from 'react-redux'
import './newCard.scss'
import Modal from '../modal/modal'

import {addCard} from '../../actions'
import {URL_SEARCH_CARDS, URL_IMG_CDN_SMALL, URL_IMG_CDN_LARGE} from '../../constants'

const NewCard = props => {
  const {open, setOpen, dispatch} = props
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([])

  const searchCards = (event) => {
    const url = URL_SEARCH_CARDS + searchTerm
    fetch(url)
      .then(response => response.json())
      .then(data => setResults(Array.isArray(data.data) ? data.data : []))
      .catch(error => console.log("oh noes :(", error))
  }

  const addCardToGrid = (card) => {
    dispatch(addCard({
      name: card.name,
      img: URL_IMG_CDN_LARGE + card.id + '.jpg'
    }))
    setOpen(false)
  }

  const searchResuts = results.map((result, index) => {
    if (index < 10) return (
      <li key={result.id} onClick={() => addCardToGrid(result)}>
        <img src={`${URL_IMG_CDN_SMALL}${result.id}.jpg`} />
      </li>
    )
  }
  )

  const render = () => (
    <Modal>
      <h2>Search for New Card</h2>
      <input id="cardSearch" name="cardSearch" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button type='submit' onClick={searchCards} disabled={!searchTerm}>SEARCH</button>

      <ul>
        {searchResuts}
      </ul>
    </Modal>
  )

  return  open ? render() : ''
}

export default connect()(NewCard)