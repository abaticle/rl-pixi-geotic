import { getGame, getMap, getPlayer, setGameState } from "../ecs.js"
import { Action, Move } from "/lib/ecs/components/_index.js"
import { ACTION_TYPE, GAME_STATE, TILE_TYPE } from "../../../config.js"
import { containerUI } from "../../graphics.js"

/**
 * Add move
 * @param {Number} x
 * @param {Number} y
 */
const addMove = (x, y) => {
    const { mapPosition } = getPlayer()
    const { map } = getMap()

    const tile = map.getTileAt(
        mapPosition.x + x,
        mapPosition.y + y
    )

    switch (tile.tileType) {
        case TILE_TYPE.DOOR_CLOSED:
            getPlayer().add(Action, {
                type: ACTION_TYPE.OPEN_DOOR,
                targetX: tile.x,
                targetY: tile.y,
            })
            setGameState(GAME_STATE.PROCESS_INPUT)
            containerUI.addLog(`Open door at ${tile.x}/${tile.y}`)
            break

        case TILE_TYPE.WALL:
            containerUI.addLog("No way it's a wall dude")
            break

        case TILE_TYPE.FLOOR:
        case TILE_TYPE.DOOR_OPEN:
            getPlayer().add(Move, {
                x,
                y,
            })
            setGameState(GAME_STATE.PROCESS_INPUT)
            break
    }
}

const processInputs = () => {
    const { input } = getGame()

    switch (input.keyPressed) {
        case " ":
            setGameState(GAME_STATE.PROCESS_INPUT)
            break

        case "ArrowUp":
            addMove(0, -1)
            break

        case "ArrowDown":
            addMove(0, 1)
            break

        case "ArrowLeft":
            addMove(-1, 0)
            break

        case "ArrowRight":
            addMove(1, 0)
            break
    }

    input.keyPressed = ""
}

export { processInputs }
