import { UPDATE_GRID } from "./constants";

export function updateGrid(payload) {
    return { type: UPDATE_GRID, payload }
};