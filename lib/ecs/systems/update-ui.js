
import {
    container,
    containerUI,
    getFPS
} from '/lib/graphics.js'
import {
    getPlayer,
    getGame,
    getGameState
} from '/lib/ecs/ecs.js'


const updateTexts = (delta) => {
    const {
        input 
    } = getGame()

    const mapPosition = container.getLocalPosition(input.mouseX, input.mouseY)

    containerUI.updateText('mousePosition', `${input.mouseX} - ${input.mouseY} (${mapPosition.x}/${mapPosition.y})`)

    const {
        x, y
    } = getPlayer().mapPosition
    
    containerUI.updateText('playerPosition', `${x} - ${y}`)
    containerUI.updateText('FPS', `${getFPS()} / ${delta.toFixed(2)}`)
    containerUI.updateText('State', `State: ${getGameState()}`)
}

const updatePointer = (delta) => {
    const {
        input 
    } = getGame()

    container.updatePointer(input.mouseX, input.mouseY)
}


/**
 * Update UI
 * @param {Number} delta 
 */
const updateUI = (delta) => {
    updateTexts(delta)
    updatePointer(delta)

}

export {
    updateUI
}