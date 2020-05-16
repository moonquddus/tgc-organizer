import { ADD_CARD, UPDATE_GRID } from "./constants"

export function addCard(payload) {
    return { type: ADD_CARD, payload }
}

export function updateGrid(payload) {
    return { type: UPDATE_GRID, payload }
}