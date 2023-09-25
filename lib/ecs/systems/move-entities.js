import { world } from '/lib/ecs/ecs.js'
import { Appearance, Animation, Move, MapPosition, Owned } from '/lib/ecs/components/_index.js'
import { MOVE_DURATION, TILE_SIZE } from '/config.js'

const movableQuery = world.createQuery({
    all: [Move, MapPosition, Appearance]
})

const moveEntities = () => {

    movableQuery.get().forEach(entity => {

        const {
            mapPosition,
            move
        } = entity

        mapPosition.moveRelative(move.x, move.y)

        entity.add(Animation, {
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

export {
    moveEntities
}