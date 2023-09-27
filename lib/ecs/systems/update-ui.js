
import {
    container,
    containerUI,
    getFPS
} from '../../graphics.js'
import {
    getPlayer,
    getGame
} from '../ecs.js'


const updateTexts = (delta) => {
    const {
        input 
    } = getGame()

    const mapPosition = container.getLocalPosition(input.mouseX, input.mouseY)

    containerUI.updateText('mousePosition', `${input.mouseX} - ${input.mouseY} (${mapPosition.x}/${mapPosition.y})`)

    const {
        x, y
    } = getPlayer().mapPosition
    
    containerUI.updateText('playerPosition', `${x} - ${y} (FPS: ${getFPS()})`)
    containerUI.updateText('State', `State: ${getGame().game.state}`)

    containerUI.updateLogs()
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