import * as ROT from "rot-js"
import { ROT_SEED, TILESET } from "../../config"

if (ROT_SEED !== 0) {
  ROT.RNG.setSeed(ROT_SEED)
}

/**
 * @typedef MapTile
 */
const tileType = {
  x: 0,
  y: 0,
  tile: 0,
  sprite: undefined,
  visited: false,
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
        Math.pow(args[0].x - args[1].x, 2) + Math.pow(args[0].y - args[1].y, 2)
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
const getRandomMap = (width = 30, height = 30) => {
  const result = {
    tiles: [],
    rooms: [],
  }

  const digger = new ROT.Map.Digger(width, height)

  digger.create((x, y, wall) => {
    if (result.tiles[y] === undefined) {
      result.tiles[y] = []
    }

    let tileIndex = TILESET.FLOOR
    if (wall) {
      tileIndex = TILESET.WALL
    }

    result.tiles[y][x] = {
      x,
      y,
      tileIndex,
      sprite: undefined,
      visited: false,
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
const getRandomInt = (min = 0, max = 10) => {
  return ROT.RNG.getUniformInt(min, max)
}

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

export {
  getDistance,
  getDistancePoints,
  getRandomInt,
  getRandomMap,
  getRectangle,
  once,
}
