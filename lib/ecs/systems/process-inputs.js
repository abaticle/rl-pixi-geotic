import {
    getGame,
    getMap,
    getPlayer,
    getEntityAt,
    setGameState,
} from '../ecs.js'
import { addCacheSet, readCacheSet } from '../cache.js'
import { Action, Move } from '/lib/ecs/components/_index.js'
import { ACTION_TYPE, GAME_STATE, TILE_TYPE } from '../../../config.js'
import { containerUI } from '../../graphics.js'
import { IsDead, Owned } from '../components/_index.js'
import { container } from '../../graphics.js'

/**
 * Add move
 * @param {Number} x
 * @param {Number} y
 */
const addMove = (x, y) => {
    let doNothing = false

    const { mapPosition } = getPlayer()
    const targetX = mapPosition.x + x
    const targetY = mapPosition.y + y
    const tile = getMap().map.getTileAt(targetX, targetY)

    const entity = getEntityAt(targetX, targetY)

    if (entity === undefined) {
        switch (tile.tileType) {
            case TILE_TYPE.DOOR_CLOSED:
                getPlayer().add(Action, {
                    type: ACTION_TYPE.OPEN_DOOR,
                    targetX: tile.x,
                    targetY: tile.y,
                })
                containerUI.addLog(`Open door at ${tile.x}/${tile.y}`)
                break

            case TILE_TYPE.WALL:
                containerUI.addLog("No way it's a wall dude")
                doNothing = true
                break

            case TILE_TYPE.FLOOR:
            case TILE_TYPE.DOOR_OPEN:
                getPlayer().add(Move, {
                    x,
                    y,
                })
                break
        }
    } else {
        if (entity.has(IsDead)) {
            getPlayer().add(Move, {
                x,
                y,
            })
        } else {
            if (!entity.has(Owned)) {
                getPlayer().add(Action, {
                    type: ACTION_TYPE.ATTACK_MELEE,
                    targetX: tile.x,
                    targetY: tile.y,
                })

                containerUI.addLog(`attack enemy at ${tile.x}/${tile.y}`)
            }
        }
    }

    if (!doNothing) {
        setGameState(GAME_STATE.PROCESS_INPUT)
    }
}

const handleWheel = (input) => {
    if (input.mouseWheel === 0) {
        return
    }

    if (input.mouseWheel > 0) {
        container.updateScale(-1)
    }

    if (input.mouseWheel < 0) {
        container.updateScale(1)
    }

    setGameState(GAME_STATE.PROCESS_INPUT)

    input.mouseWheel = 0
}

const processInputs = () => {
    const { input } = getGame()

    handleWheel(input)

    switch (input.keyPressed) {
        case ' ':
            setGameState(GAME_STATE.PROCESS_INPUT)
            break

        case 'ArrowUp':
            addMove(0, -1)
            break

        case 'ArrowDown':
            addMove(0, 1)
            break

        case 'ArrowLeft':
            addMove(-1, 0)
            break

        case 'ArrowRight':
            addMove(1, 0)
            break
    }

    input.keyPressed = ''
}

export { processInputs }
