import {
    MapPosition,
    Owned,
    Brain,
    Selected,
    IsDead,
} from '../components/_index.js'
import { getMonsters, getMap, world } from '../ecs.js'
import { TINTS, SEE_EVERYTHING } from '../../../config.js'
import { readCacheSet } from '../cache.js'

const selectedQuery = world.createQuery({
    all: [Selected, MapPosition],
})

/**
 * Reset all tiles
 */
const resetTiles = (map) => {
    map.getAllTiles().forEach((tile) => {
        if (tile.visited) {
            tile.sprite.tint = TINTS.VISITED
        } else {
            tile.sprite.tint = TINTS.HIDDEN
        }
    })
}

/**
 * Hide all monsters
 * @param {*} monsters
 */
const hideMonsters = (monsters = []) => {
    monsters.forEach((entity) => {
        entity.appearance.sprite.visible = false
    })
}

/**
 *
 * @param {import('../../typedefs.js').Component.Map}  map
 * @param {*} monsters
 */
const updateVisibleTiles = (map, monsters) => {
    selectedQuery.get().forEach((entity) => {
        const { mapPosition } = entity

        const tiles = map.getVisibleTiles(mapPosition.x, mapPosition.y)

        tiles.forEach((tile) => {
            tile.sprite.tint = TINTS.VISIBLE

            if (!tile.visited) {
                tile.visited = true
                /*
                createAnimation({
                    type: ANIMATION_TYPE.COLOR,
                    fromColor: TINTS.HIDDEN,
                    toColor: TINTS.VISIBLE,
                    duration: DISPLAY_DURATION,
                    targetSprite: tile.sprite,
                    delay: 0
                })        
                */
            } else {
            }

            const entities = readCacheSet(
                'entitiesAtLocation',
                `${tile.x},${tile.y}`,
            )

            if (entities) {
                for (const entityId of entities) {
                    const monster = world.getEntity(entityId)

                    if (!monster.has(Owned)) {
                        monster.appearance.sprite.visible = true
                        monster.appearance.sprite.tint = TINTS.MONSTER

                        if (monster.has(Brain) && !monster.has(IsDead)) {
                            monster.brain.active = true
                        }
                    }
                }
            }
        })
    })
}

const updateVisibility = () => {
    const { map } = getMap()

    const monsters = getMonsters()

    // For debugging purposes
    if (SEE_EVERYTHING) return

    resetTiles(map)
    hideMonsters(monsters)
    updateVisibleTiles(map, monsters)
}

function loggerDecorator(logger) {
    return function (message) {
        logger.call(this, message)
        console.log('message logged at:', new Date().toLocaleString())
    }
}

export { updateVisibility }
