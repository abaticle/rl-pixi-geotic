import { getGame } from '/lib/ecs/ecs.js'

const createInputs = () => {
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('wheel', onMouseWheel)
}

/**
 *
 * @param {WheelEvent} event
 */
const onMouseWheel = (event) => {
    const { input } = getGame()

    input.mouseWheel = event.deltaY
}

/**
 *
 * @param {MouseEvent} event
 */
const onMouseUp = (event) => {
    const { input } = getGame()

    input.mouseDown = true
}
/**
 *
 * @param {MouseEvent} event
 */
const onMouseDown = (event) => {
    const { input } = getGame()

    input.mouseDown = true
}

/**
 *
 * @param {MouseEvent} event
 */
const onMouseMove = (event) => {
    const { input } = getGame()

    input.mouseX = event.clientX
    input.mouseY = event.clientY
}

/**
 *
 * @param {KeyboardEvent} event
 */
const onKeydown = (event) => {
    const { input } = getGame()

    input.keyPressed = event.key
}

export { createInputs, onMouseMove, onMouseDown, onMouseUp }
