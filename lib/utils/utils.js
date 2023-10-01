import * as ROT from "rot-js"
import { ROT_SEED, TILE_TYPE, TILESET } from "../../config.js"

if (ROT_SEED !== 0) {
    ROT.RNG.setSeed(ROT_SEED)
}

/**
 * Get distance between 2 points or (x, y, toX, toY)
 * @param  {...any} args
 * @returns
 */
const getDistance = (...args) => {
    switch (args.length) {
        case 2:
            return Math.sqrt(
                Math.pow(args[0].x - args[1].x, 2) +
                    Math.pow(args[0].y - args[1].y, 2)
            )

        case 4:
            return Math.sqrt(
                Math.pow(args[0] - args[2], 2) + Math.pow(args[1] - args[3], 2)
            )

        default:
            throw new Error(`Bad number of arguments ${args.length}`)
    }
}

/**
 * Generate random map
 * @param {number} width Number of tiles for width
 * @param {number} height Number of tiles for height
 */
const getRandomMap = (width, height) => {
    const result = {
        tiles: [],
        rooms: [],
    }

    const digger = new ROT.Map.Digger(width, height, {
        roomWidth: [4, 10],
        roomHeight: [4, 10],
        corridorLength: [5, 40],
        dugPercentage: 0.2,
    })

    // Choose passable tiles
    digger.create((x, y, wall) => {
        // create empty array at first
        if (result.tiles[y] === undefined) {
            result.tiles[y] = []
        }

        result.tiles[y][x] = {
            x,
            y,
            tileIndex: wall ? TILESET.WALL : TILESET.FLOOR,
            tileType: wall ? TILE_TYPE.WALL : TILE_TYPE.FLOOR,
            sprite: undefined,
            visited: false,
        }
    })

    // Update doors
    digger.getRooms().forEach((room) => {
        room.getDoors((x, y) => {
            const tile = result.tiles[y][x]

            tile.tileType = TILE_TYPE.DOOR_CLOSED
            tile.tileIndex = TILESET.DOOR_CLOSED
        })
    })

    result.rooms = digger.getRooms()

    return result
}

/**
 * Get random integer using ROT
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 */
const getRandomInt = (min = 0, max = 10) => {
    return ROT.RNG.getUniformInt(min, max)
}

/**
 * Get rectangle starting from x/y with given size
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {boolean?} fill
 * @returns
 */
const getRectangle = (x, y, width, height, fill = false) => {
    const tiles = []

    const x1 = x
    const x2 = x + width - 1
    const y1 = y
    const y2 = y + height - 1

    for (let xi = x1; xi <= x2; xi++) {
        for (let yi = y1; yi <= y2; yi++) {
            if (xi > x1 && xi < x2 && yi > y1 && yi < y2) {
                if (fill) {
                    tiles.push({
                        x: xi,
                        y: yi,
                    })
                }
            } else {
                tiles.push({
                    x: xi,
                    y: yi,
                })
            }
        }
    }

    return tiles
}

/**
 * Convert hex to {r,g,b}
 * @param {String} hex
 * @returns
 */
const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
}

/**
 * Convert {r,g,b} to hex
 * @param {Object} rgb r,g & b
 * @returns
 */
const rgbToHex = (rgb) => {
    return (
        "#" +
        ((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16).slice(1)
    )
}

export {
    getDistance,
    getRandomInt,
    getRandomMap,
    getRectangle,
    hexToRgb,
    rgbToHex,
}
