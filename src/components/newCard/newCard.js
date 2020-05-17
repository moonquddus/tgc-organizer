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

  const [loading, setLoading] = useState(false)
  const [searchSuccess, setSearchSuccess] = useState(false)
  const [searchError, setSearchError] = useState(false)

  const searchCards = (event) => {
    event.preventDefault()
    setLoading(true)
    setSearchSuccess(false)
    setSearchError(false)
    setResults([])

    const url = URL_SEARCH_CARDS + searchTerm
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
        if (Array.isArray(data.data)){
          setResults(data.data)
          if (data.data.length){
            setSearchSuccess(true)
          }
          else{
            setSearchError("No results found :(")
          }
        }
        else{
          setSearchError("Failure processing search results. Ask Moon to sort this mess out")
          console.error("ERROR", data)
        }
      })
      .catch(error => {
        console.error("oh noes :(", error)
        setSearchError("Failure loading search results. Ask Moon to sort this mess out")
        setLoading(false)
      })
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
  })

  const renderLoading = () => loading ? <p>Loading...</p> : false
  const renderSearchHeader = () => !loading && searchSuccess ? <h2>Search Results</h2> : false
  const renderSearchMessage = () => !loading && searchError ? <p>{searchError}</p> : false

  const render = () => (
    <Modal>
      <h2>Search for New Card</h2>
      <form onSubmit={searchCards}>
        <input id="cardSearch" name="cardSearch" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type='submit' disabled={!searchTerm}>SEARCH</button>
      </form>

      {renderLoading()}
      {renderSearchHeader()}
      <ul id='card-search-results'>
        {searchResuts}
      </ul>
      {renderSearchMessage()}
    </Modal>
  )

  return  open ? render() : ''
}

export default connect()(NewCard)