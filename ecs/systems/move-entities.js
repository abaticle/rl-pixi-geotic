import { world, getMap } from '../ecs'
import { Move, MapPosition, Appearance, Animation } from '../components/_index.js'
import { GAME_STATE, MOVE_DURATION, TILE_SIZE } from '../../config.js'
import { setGameState } from '../ecs.js'

const movableQuery = world.createQuery({
    all: [Move, MapPosition, Appearance]
})

const moveEntities = () => {

    if (movableQuery.get().length === 0) {
        setGameState(GAME_STATE.ANIMATING)
    }

    movableQuery.get().forEach(entity => {

        const {
            mapPosition,
            move,
            appearance
        } = entity

        const {
            map
        } = getMap()

        const newX = mapPosition.x + move.x
        const newY = mapPosition.y + move.y

        if (!map.canMove(newX, newY)) {
            entity.move.destroy()
            setGameState(GAME_STATE.WAIT_FOR_INPUT)
            return
        }

        mapPosition.px = mapPosition.x
        mapPosition.py = mapPosition.y
        mapPosition.x = newX
        mapPosition.y = newY
        
        entity.move.destroy()

        entity.add(Animation, {
            fromX: mapPosition.px * TILE_SIZE,
            fromY: mapPosition.py * TILE_SIZE,
            toX: mapPosition.x * TILE_SIZE,
            toY: mapPosition.y * TILE_SIZE,
            duration: MOVE_DURATION,
            elapsed: 0,
            started: Date.now()
        })

        setGameState(GAME_STATE.ANIMATING)
    })
}

export {
    moveEntities
}