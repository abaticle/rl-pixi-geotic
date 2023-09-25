import {
    getGame,
    getMap,
    getPlayer,
    setGameState
} from '/lib/ecs/ecs.js'
import {
    Move 
} from '/lib/ecs/components/_index.js'
import {
    GAME_STATE
} from '/config.js'

const processInputs = () => {

    const {
        input 
    } = getGame()

    const addMove = (x, y) => {
        const {
            mapPosition
        } = getPlayer()

        const {
            map
        } = getMap()

        if (map.isWalkable(mapPosition.x + x, mapPosition.y + y)) {

            getPlayer().add(Move, {
                x,
                y
            })        

            setGameState(GAME_STATE.PROCESS_INPUT)
            
        }
    }

    switch (input.keyPressed) {
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

export {
    processInputs
}