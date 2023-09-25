import {
    getPlayer
} from '/lib/ecs/ecs.js'
import {
    container
} from '/lib/graphics.js'

const moveCamera = (delta) => {
    
    const {
        appearance
    } = getPlayer()

    container.centerOnSprite(appearance.sprite)

}

export {
    moveCamera
}