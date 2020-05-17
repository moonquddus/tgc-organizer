import { ADD_CARD, UPDATE_GRID, INIT_ALBUM, UPDATE_ALBUM, GET_HISTORICAL_ALBUM, UNDO_HISTORY, REDO_HISTORY } from "./constants"

export function addCard(payload) {
    return { type: ADD_CARD, payload }
}

export function updateGrid(payload) {
    return { type: UPDATE_GRID, payload }
}

export function initAlbum(payload) {
    return { type: INIT_ALBUM, payload }
}

export function updateAlbum(payload) {
    return { type: UPDATE_ALBUM, payload }
}

export function getHistoricalAlbum(payload) {
    return { type: GET_HISTORICAL_ALBUM, payload }
}

export function undoHistory(payload) {
    return { type: UNDO_HISTORY }
}

export function redoHistory() {
    return { type: REDO_HISTORY }
}