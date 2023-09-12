import * as ROT from "rot-js"
import { 
    DEV, 
    ROT_SEED,
    TILESET
} from "../config"


if (DEV) {
    ROT.RNG.setSeed(ROT_SEED);
}


/**
 * @typedef MapTile
 */
const tileType = {
    x: 0,
    y: 0,
    tile: 0
}

/**
 * Generate random map
 * @param {number} width Number of tiles for width
 * @param {number} height Number of tiles for height
 */
export const getRandomMap = (width = 30, height = 30) => {

    const result = {
        tiles: [],
        rooms: []
    }

    const digger = new ROT.Map.Digger(width, height)

    digger.create((x, y, wall) => {

        if (result.tiles[y] === undefined) {
            result.tiles[y] = []
        }

        let tile = TILESET.FLOOR
        if (wall) { 
            tile = TILESET.WALL
        }

        result.tiles[y][x] = {
            x,
            y, 
            tile
        } //new Tile(type, x, y)
    })

    result.rooms = digger.getRooms()
    
    return result
}

/**
 * Get random integer using ROT
 * @param {number} min Minimum value 
 * @param {number} max Maximum value
 */
export const getRandomInt = (min = 0, max = 10) => {
    ROT.RNG.getUniformInt(0, max)
}