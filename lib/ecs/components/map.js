import { Component } from "geotic"
import { TILESET } from "/config.js"
import { FOV, Path } from "rot-js"
import { getRandomInt } from "/lib/utils/utils.js"
import { getDrawables } from "/lib/ecs/ecs.js"

export default class Map extends Component {
  static properties = {
    width: 0,
    height: 0,
    tiles: [],
    rooms: [],
  }

  /**
   * Check if movement is allowed
   * @param {Number} x
   * @param {Number} y
   * @returns
   */
  isWalkable(x, y) {
    // Check wall
    const { tileIndex } = this.getTileAt(x, y)

    if (tileIndex === TILESET.WALL) {
      return false
    }

    // Check monster
    const entity = this.getEntityAt(x, y)

    if (entity) {
      return false
    }

    return true
  }

  /**
   * Get all map tiles
   * @returns
   */
  getAllTiles() {
    const tiles = []

    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles[y].length; x++) {
        tiles.push(this.tiles[y][x])
      }
    }

    return tiles
  }

  /**
   * Get entity at position
   * @param {Number} x
   * @param {Number} y
   * @returns Entity
   */
  getEntityAt(x, y) {
    return getDrawables().find(
      ({ mapPosition }) => mapPosition.x === x && mapPosition.y === y
    )
  }

  /**
   * Get a random position in room
   * @param {Boolean} empty If true tile must be empty
   * @returns
   */
  getRandomPositionInRoom(empty = false) {
    const randomRoom = this.rooms[getRandomInt(0, this.rooms.length - 1)]

    let x
    let y

    while (true) {
      x = getRandomInt(randomRoom.getLeft(), randomRoom.getRight())
      y = getRandomInt(randomRoom.getTop(), randomRoom.getBottom())

      if (this.getEntityAt(x, y) === undefined || empty === false) {
        break
      }
    }

    return {
      x,
      y,
    }
  }

  /**
   * Get tile at position specified
   * @param {Number} x
   * @param {Number} y
   * @returns
   */
  getTileAt(x, y) {
    return this.tiles[y][x]
  }

  /**
   * Check position is in bounds
   * @param {Number} x
   * @param {Number} y
   * @returns
   */
  isInBound(x, y) {
    if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
      return false
    }
    return true
  }

  /**
   * Get path using 2 positions or 4 coords
   * @param  {...any} args
   * @returns
   */
  getPath(...args) {
    switch (args.length) {
      case 2:
        return this._getPathFromPositions(args[0], args[1])

      case 4:
        return this._getPathFromCoords(args[0], args[1], args[2], args[3])

      default:
        throw new Error(`Bad number of arguments ${args.length}`)
    }
  }

  /**
   * Get path
   * @param {Number} xFrom Origin x
   * @param {Number} yFrom Origin y
   * @param {Number} xTo Target x
   * @param {Number} yTo Target y
   * @returns
   */
  _getPathFromCoords(xFrom, yFrom, xTo, yTo) {
    const tiles = []

    // Get passable tiles to target
    const pathfinder = new Path.Dijkstra(
      xTo,
      yTo,
      (x, y) => {
        const { tileIndex } = this.getTileAt(x, y)

        if (tileIndex === TILESET.WALL) {
          return false
        }

        return true
      },
      {
        topology: 4,
      }
    )

    pathfinder.compute(xFrom, yFrom, (x, y) => {
      if (x === xFrom && y === yFrom) {
        return
      }

      tiles.push(this.getTileAt(x, y))
    })

    return tiles
  }

  /**
   * Get path between points
   * @param {Object} from
   * @param {Object} to
   * @returns
   */
  _getPathFromPositions(from, to) {
    return this.getPath(from.x, from.y, to.x, to.y)
  }

  /**
   * Get visible tiles from a position within a given range
   * @param {Number} tileX
   * @param {Number} tileY
   * @param {Number} range
   */
  getVisibleTiles(tileX, tileY, range = 10) {
    const tiles = []

    const fov = new FOV.PreciseShadowcasting((x, y) => {
      /*if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
                return false
            }*/
      if (!this.isInBound(x, y)) {
        return false
      }

      const { tileIndex } = this.getTileAt(x, y)

      if (tileIndex === TILESET.WALL) {
        return false
      }
      return true
    })

    fov.compute(tileX, tileY, range, (x, y, r, visibility) => {
      //console.log(visibility)
      tiles.push(this.getTileAt(x, y))
    })

    return tiles
  }
}
