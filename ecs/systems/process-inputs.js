import {
    getGame,
    getPlayer,
    getGameState,
    setGameState
} from '../ecs.js'
import {
    Move 
} from '../components/_index.js'
import {
    GAME_STATE
} from '../../config.js'

const processInputs = () => {

    const {
        input 
    } = getGame()

    const addMove = (x, y) => {
        getPlayer().add(Move, {
            x,
            y
        })        

        setGameState(GAME_STATE.PROCESS_INPUT)

        console.log(getGameState())
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