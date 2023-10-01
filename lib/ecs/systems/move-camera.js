import { getPlayer, getCamera, world } from "../ecs.js"
import { Animation } from '../components/_index.js'
import { container } from "../../graphics.js"
import { ANIMATION_TYPE } from "../../../config.js"

const animableQuery = world.createQuery({
    all: [Animation],
})

const moveCamera = (delta) => {
    const shakeAnimation = animableQuery
        .get()
        .find(({ animation }) => animation.type === ANIMATION_TYPE.SHAKE)

    if (!shakeAnimation) {
        const { appearance } = getPlayer()

        container.centerOnSprite(appearance.sprite)
    }
}

export { moveCamera }
