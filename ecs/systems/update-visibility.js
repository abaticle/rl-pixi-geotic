import {
    MapPosition,
    Selected
} from "../components/_index.js" 
import {
    getMap
} from "../ecs.js"
import {
    SEE_EVERYTHING
} from "../../config.js"

const selectedQuery = world.createQuery({
    all: [Selected, MapPosition]
})

let first = true

const updateVisibility = () => {
    const {
        map
    } = getMap()
    
    // For debugging purposes
    if (SEE_EVERYTHING) return

    // Set tint on all tiles
    map.getAllTiles().forEach(tile => {
        if (tile.visited) {
            tile.sprite.tint = 0x1c1c1c
        } else {
            tile.sprite.tint = 0x000000
        }
    })

    selectedQuery.get().forEach(entity => {
        const {
            mapPosition
        } = entity

        const tiles = map.getVisibleTiles(mapPosition.x, mapPosition.y)

        tiles.forEach(tile => {
            tile.sprite.tint = 0xffffff
            tile.visited = true
        })
    })
}

export {
    updateVisibility
}