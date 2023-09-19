import {
    getGame,
    getPlayer
} from "../ecs.js"
import {
    Move 
} from "../components/_index.js"
import {
    GAME_STATE
} from "../../config.js"

const processInputs = () => {

    const {
        game,
        input 
    } = getGame()

    if (game.state === GAME_STATE.WAIT) {
        return
    }

    //console.log(input.mouseX)

    

    const addMove = (x, y) => {
        getPlayer().add(Move, {
            x,
            y
        })
        
        game.state = GAME_STATE.WAIT

        input.keyPressed = ""
    }

    switch (input.keyPressed) {
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
}

export {
    processInputs
}