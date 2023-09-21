import { Component } from "geotic"
import { TILESET } from "../../config"
import {
    FOV
} from "rot-js"
import { container } from "../../lib/graphics.js"
import {
    getRandomInt
} from "../../lib/utils.js"

export default class Map extends Component {
    static properties = {
        width: 0,
        height: 0,
        tiles: [],
        rooms: []
    }

    getContainerTiles() {
        
    }

    getAllTiles() {
        const tiles = []

        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                tiles.push(this.tiles[y][x])
            }   
        }

        return tiles
    }

    getTileAt(x, y) {
        try {
            return this.tiles[y][x]
        }
        catch (e) {
            console.log(e)
        }        
    }

    canMove(x, y) {
        const {tileIndex} = this.getTileAt(x, y)

        if (tileIndex === TILESET.WALL) {
            return false
        }

        return true
    }


    getRandomPositionInRoom() {
        const randomRoom = this.rooms[getRandomInt(0, this.rooms.length - 1)]

        const x = getRandomInt(randomRoom.getLeft(), randomRoom.getRight())
        const y = getRandomInt(randomRoom.getTop(), randomRoom.getBottom())

        return {
            x,
            y
        }
    }

    

    /**
     * Get visible tiles from a position
     * @param {Number} tileX 
     * @param {Number} tileY 
     * @param {Number} range 
     */
    getVisibleTiles(tileX, tileY, range = 10) {

        const tiles = []

        const fov = new FOV.PreciseShadowcasting((x, y) => {

            if (x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
                return false
            }

            const {
                tileIndex
             } = this.getTileAt(x, y)

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