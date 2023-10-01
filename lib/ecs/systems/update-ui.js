import { container, containerUI, getFPS } from '../../graphics.js'
import Body from '../components/body.js'
import Description from '../components/description.js'
import { getPlayer, getGame, getEntityAt } from '../ecs.js'

const updateTexts = (delta) => {
    const { input } = getGame()

    const mapPosition = container.getLocalPosition(input.mouseX, input.mouseY)

    containerUI.updateText('mousePosition', `${mapPosition.x}/${mapPosition.y}`)

    const { x, y } = getPlayer().mapPosition

    containerUI.updateText('playerPosition', `${x} - ${y} (FPS: ${getFPS()})`)
    containerUI.updateText('State', `State: ${getGame().game.state}`)

    containerUI.updateLogs()
}

const updateTarget = () => {
    const { input } = getGame()

    const mapPosition = container.getLocalPosition(input.mouseX, input.mouseY)
    const entity = getEntityAt(mapPosition)

    containerUI.updateText('targetDescription', '')
    containerUI.updateText('targetHealth', '')

    if (entity) {
        if (entity.has(Description)) {
            containerUI.updateText('targetDescription', entity.description.name)
        }
        if (entity.has(Body)) {
            const {
                maxHealth,
                currentHealth
            } = entity.body
            containerUI.updateText('targetHealth', `Health: ${currentHealth}/${maxHealth}`)
        }
    }

}

const updatePointer = (delta) => {
    const { input } = getGame()

    container.updatePointer(input.mouseX, input.mouseY)
}

/**
 * Update UI
 * @param {Number} delta
 */
const updateUI = (delta) => {
    updateTexts(delta)
    updatePointer(delta)
    updateTarget()
}

export { updateUI }
