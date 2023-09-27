import {
    MapPosition,
    Selected
} from '/lib/ecs/components/_index.js' 
import {
    getMonsters,
    getMap,
    createAnimation
} from '../ecs.js'
import {
    ANIMATION_TYPE,
    DISPLAY_DURATION,
    TINTS,
    SEE_EVERYTHING
} from '../../../config.js'

const selectedQuery = world.createQuery({
    all: [Selected, MapPosition]
})

const pushAnimation = (sprite, newColor) => {
    if (newColor === sprite.tint) {
        return
    }

    createColorAnimation({
        type: ANIMATION_TYPE.COLOR,
        fromColor: sprite.tint,
        toColor: newColor,
        duration: DISPLAY_DURATION,
        started: Date.now(),
        targetSprite: sprite
    })
}


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
    
    // Hide all monsters
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
            
            if (!tile.visited) {
                tile.visited = true
                
                createAnimation({
                    type: ANIMATION_TYPE.COLOR,
                    fromColor: TINTS.HIDDEN,
                    toColor: TINTS.VISIBLE,
                    duration: DISPLAY_DURATION,
                    started: Date.now(),
                    targetSprite: tile.sprite,
                    delay: 0
                })                
            } else {                
            }

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