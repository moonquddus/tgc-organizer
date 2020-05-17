import { ADD_CARD, UPDATE_GRID, INIT_ALBUM, UPDATE_ALBUM, GET_HISTORICAL_ALBUM, UNDO_HISTORY, REDO_HISTORY } from "./constants"

const initialState = {
    grid: {
        x: 3,
        y: 3,
        pages: 2
    },
    album: [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
    ],
    pile: [],
    history: [{
        album: [
            [null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null]
        ],
        pile: []
    }],
    historyPosition: 0
}

function rootReducer(state = initialState, action) {
    let oldHistory, newHistory, historicalAlbum, newPosition
    switch(action.type){
        case UPDATE_GRID:
            return {
                ...state,
                grid: action.payload.grid
            }
        case INIT_ALBUM:
            return {
                ...state,
                album: action.payload.album,
                pile: action.payload.pile,
                history: [{
                    album: action.payload.album,
                    pile: action.payload.pile
                }],
                historyPosition: 0
            }
        case UPDATE_ALBUM:
            oldHistory = state.historyPosition ? state.history.slice(state.historyPosition) : state.history
            newHistory = {album: action.payload.album, pile: action.payload.pile}
            return {
                ...state,
                history: [newHistory, ...oldHistory],
                historyPosition: 0,
                album: action.payload.album,
                pile: action.payload.pile
            }
        case GET_HISTORICAL_ALBUM:
            historicalAlbum = state.history[action.payload.historyPosition]
            return {
                ...state,
                historyPosition: action.payload.historyPosition,
                album: historicalAlbum.album,
                pile: historicalAlbum.pile
            }
        case ADD_CARD:
            oldHistory = state.historyPosition ? state.history.slice(state.historyPosition) : state.history
            newHistory = {album: state.album, pile: [...state.pile, action.payload]}
            return {
                ...state,
                history: [newHistory, ...oldHistory],
                historyPosition: 0,
                pile: [...state.pile, action.payload]
            }
        case UNDO_HISTORY:
            newPosition = state.historyPosition + 1
            historicalAlbum = state.history[newPosition]
            return {
                ...state,
                historyPosition: newPosition,
                album: historicalAlbum.album,
                pile: historicalAlbum.pile
            }
        case REDO_HISTORY:
            newPosition = state.historyPosition - 1
            historicalAlbum = state.history[newPosition]
            return {
                ...state,
                historyPosition: newPosition,
                album: historicalAlbum.album,
                pile: historicalAlbum.pile
            }
        default:
            return state
    }
}

export default rootReducer