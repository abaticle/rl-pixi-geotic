import { getMap, world } from '../ecs.js'
import { Appearance, Animation, Move, MapPosition, Action } from '/lib/ecs/components/_index.js'
import { MOVE_DURATION, TILESET, TILE_TYPE, TILE_SIZE, ANIMATION_TYPE } from '../../../config.js'
import { getTexture } from "../../graphics/utils.js"

const movableQuery = world.createQuery({
    all: [Move, MapPosition, Appearance]
}) 

const actionQuery = world.createQuery({
    all: [Action, MapPosition, Appearance]
}) 

/**
 * Move entities
 */
const handleMoves = () => {

    movableQuery.get().forEach(entity => {

        const {
            appearance,
            mapPosition,
            move
        } = entity

        mapPosition.moveRelative(move.x, move.y)

        entity.add(Animation, {
            type: ANIMATION_TYPE.MOVE,
            targetSprite: appearance.sprite,
            fromX: mapPosition.px * TILE_SIZE,
            fromY: mapPosition.py * TILE_SIZE,
            toX: mapPosition.x * TILE_SIZE,
            toY: mapPosition.y * TILE_SIZE,
            duration: MOVE_DURATION,
            elapsed: 0,
            started: Date.now()
        })

        move.destroy()
    })

}

/**
 * Handle actions
 */
const handleActions = () => {

    actionQuery.get().forEach(entity => {

        const { action } = entity
        const tile = getMap().map.getTileAt(action.targetX, action.targetY)

        // open door
        if (tile.tileType === TILE_TYPE.DOOR_CLOSED) {
            tile.tileType = TILE_TYPE.DOOR_OPEN
            tile.sprite.texture = getTexture(TILESET.DOOR_OPEN)
        }

        action.destroy()

    })

}

const moveEntities = () => {
    handleMoves()
    handleActions()
}

export {
    moveEntities
}