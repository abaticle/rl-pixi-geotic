import { TILE_SIZE } from '../config.js'

/** @typedef TileType */
const TileTypes = {
    wall: 0,
    floor: 0,
    door: 0,
}


export default class Tile {

    /** @type {Number} */
    x
    /** @type {Number} */
    y
    /** @type {TileType} */
    type

    constructor(x, y, type) {
        this.x = x 
        this.y = y
        this.type = type
    }

    get worldX() {
        return this.x * TILE_SIZE
    }

    get worldY() {
        return this.y * TILE_SIZE
    }
}