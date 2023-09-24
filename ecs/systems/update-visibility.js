import {
    MapPosition,
    Selected
} from '../components/_index.js' 
import {
    getMonsters,
    getMap
} from '../ecs.js'
import {
    TINTS,
    SEE_EVERYTHING
} from '../../config.js'

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
            tile.sprite.tint = TINTS.VISITED
        } else {
            tile.sprite.tint = TINTS.HIDDEN
        }
    })
    
    const monsters = getMonsters()

    monsters.forEach((entity) => {
        entity.appearance.sprite.visible = false
    })

    selectedQuery.get().forEach(entity => {
        const {
            mapPosition
        } = entity

        const tiles = map.getVisibleTiles(mapPosition.x, mapPosition.y)

        tiles.forEach(tile => {
            tile.sprite.tint = TINTS.VISIBLE
            tile.visited = true

            const monster = monsters.find(entity => entity.mapPosition.x === tile.x && entity.mapPosition.y === tile.y)

            if (monster) {
                monster.appearance.sprite.visible = true
                monster.appearance.sprite.tint = TINTS.MONSTER
                monster.brain.active = true
            }
        })
    })
}

export {
    updateVisibility
}