import { Component } from "geotic";
import { TILESET } from "../../config";

export default class Map extends Component {
    static properties = {
        tiles: [],
        rooms: []
    }

    getTileAt(x, y) {
        return this.tiles[y][x]
    }

    canMove(x, y) {
        const {tile} = this.getTileAt(x, y)

        if (tile === TILESET.WALL) {
            return false
        }

        return true
    }
}