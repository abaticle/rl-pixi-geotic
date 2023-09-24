import {
    getPlayer
} from '../ecs.js'
import {
    container,
    pixi
} from '../../lib/graphics.js'

const moveCamera = (delta) => {
    
    const {
        appearance
    } = getPlayer()

    container.centerOnSprite(appearance.sprite)

}

export {
    moveCamera
}