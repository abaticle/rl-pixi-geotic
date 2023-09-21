import {
    MapPosition,
    Owned,
    Selected
} from "../components/_index.js" 
import {
    getMonsters,
    getMap
} from "../ecs.js"
import {
    SEE_EVERYTHING
} from "../../config.js"

const selectedQuery = world.createQuery({
    all: [Selected, MapPosition]
})

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
    
    const entities = getMonsters()

    entities.forEach((entity) => {
        entity.appearance.sprite.visible = false
    })

    selectedQuery.get().forEach(entity => {
        const {
            mapPosition
        } = entity

        const tiles = map.getVisibleTiles(mapPosition.x, mapPosition.y)

        tiles.forEach(tile => {
            tile.sprite.tint = 0xffffff
            tile.visited = true

            const monster = entities.find(entity => entity.mapPosition.x === tile.x && entity.mapPosition.y === tile.y)

            if (monster) {
                monster.appearance.sprite.visible = true
            }
        })
    })
}

export {
    updateVisibility
}