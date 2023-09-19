import {
    getPlayer
} from "../ecs.js"
import {
    container,
    pixi
} from "../../lib/graphics.js"

const moveCamera = () => {
    
    const {
        appearance
    } = getPlayer()

    const x = appearance.sprite.position.x
    const y = appearance.sprite.position.y
    
    const width = window.innerWidth
    const height = window.innerHeight
    const scale = container.scale.x

    const targetX = (width / 2) - x * scale
    const targetY = (height / 2) - y * scale

    container.position.set(targetX, targetY)

}

export {
    moveCamera
}