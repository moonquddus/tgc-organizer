import { ADD_CARD, UPDATE_GRID } from "./constants"

const initialState = {
    grid: {
        x: 3,
        y: 3,
        pages: 2
    },
    album: [],
    pile: []
}

function rootReducer(state = initialState, action) {

    switch(action.type){
        case UPDATE_GRID:
            return {
                ...state,
                grid: action.payload.grid
            }
        case ADD_CARD:
            return {
                ...state,
                pile: [...state.pile, action.payload]
            }
        default:
            return state
    }
}

export default rootReducer