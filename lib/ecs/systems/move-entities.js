import { getMap, world, getEntityAt } from "../ecs.js"
import {
    Appearance,
    Animation,
    Move,
    MapPosition,
    Action,
    Body,
} from "../components/_index.js"
import {
    ACTION_TYPE,
    MOVE_DURATION,
    TILESET,
    TILE_TYPE,
    TILE_SIZE,
    ANIMATION_TYPE,
} from "../../../config.js"
import { getTexture } from "../../graphics/utils.js"
import {
    Cache
  } from 'pixi.js'

const movableQuery = world.createQuery({
    all: [Move, MapPosition, Appearance],
})

const actionQuery = world.createQuery({
    all: [Action, MapPosition, Appearance],
})

/**
 * Move entities
 */
const handleMoves = () => {
    movableQuery.get().forEach((entity) => {
        const { appearance, mapPosition, move } = entity

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
            started: Date.now(),
        })

        move.destroy()
    })
}

const openDoor = (action) => {
    const tile = getMap().map.getTileAt(
        action.targetX,
        action.targetY
    )
    tile.tileType = TILE_TYPE.DOOR_OPEN
    tile.sprite.texture = getTexture(TILESET.DOOR_OPEN)
}

const attackMelee = (action) => {
    const target = getEntityAt(
        action.targetX,
        action.targetY
    )

    if (!target) {
        return
    }

    if (target.has(Body)) {

        const sound = Cache.get('attack_melee_1')

        sound.play()

        action.entity.add(Animation, {
            elapsed: 0,
            type: ANIMATION_TYPE.SHAKE,
            duration: 30
        })

        const damage = action.entity.body.attack
        target.fireEvent("take-damage", {
            amount: damage
        })
    }
}

/**
 * Handle actions
 */
const handleActions = (delta) => {
    actionQuery.get().forEach((entity) => {
        const { action } = entity

        switch (action.type) {
            case ACTION_TYPE.OPEN_DOOR:
                openDoor(action, delta)
                break

            case ACTION_TYPE.ATTACK_MELEE:
                attackMelee(action)
                break
        }

        action.destroy()
    })
}

const moveEntities = () => {
    handleMoves()
    handleActions()
}

export { moveEntities }
