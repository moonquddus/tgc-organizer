import { UPDATE_GRID } from "./constants";

const initialState = {
    grid: {
        x: 3,
        y: 3,
        pages: 2
    }
};

function rootReducer(state = initialState, action) {
    if (action.type === UPDATE_GRID) {
        return Object.assign({}, state, {
            grid: action.payload.grid
        });
    }
    return state;
};

export default rootReducer;