import { Animation } from '/lib/ecs/components/_index.js'
import { ANIMATION_TYPE } from '/config.js'
import { getAnimations } from '/lib/ecs/ecs.js'
import { container } from '../../graphics.js'
import createScreenShake from 'screen-shake'

const animate = (delta) => {
    getAnimations().forEach((entity) => {
        const { animation } = entity

        switch (animation.type) {
            case ANIMATION_TYPE.MOVE:
                animateMove(animation, delta)
                break

            case ANIMATION_TYPE.COLOR:
                animateColor(animation, delta)
                break

            case ANIMATION_TYPE.SHAKE:
                animateShake(animation, delta)
                break

            default:
                throw new Error(`Unknown animation ${animation.type}`)
        }
    })
}

/**
 * Move a sprite
 * @param {Animation} animation
 */
const animateMove = (animation, delta) => {
    const { targetSprite } = animation

    const newPosition = animation.getNextPosition(delta)

    targetSprite.x = newPosition.x
    targetSprite.y = newPosition.y

    if (targetSprite.x === animation.toX && targetSprite.y === animation.toY) {
        animation.destroy()
    }
}

/**
 * Color change
 * @param {Animation} animation
 * @param {Number} delta
 */
const animateColor = (animation, delta) => {
    const { targetSprite } = animation

    const newTint = animation.getNextColor(delta)

    targetSprite.tint = newTint

    if (targetSprite.tint === animation.toColor) {
        animation.destroy()
    }
}

/**
 * Shake screen
 * @param {Animation} animation
 * @param {Number} delta
 */
const animateShake = (animation, delta) => {
    if (!animation.shake) {
        animation.shake = createScreenShake({
            maxOffsetX: 30,
            maxOffsetY: 30,
        })
        animation.shake.add(0.3)
        animation.fromX = container.x
        animation.fromY = container.y
    }

    const { offsetX, offsetY } = animation.shake.update(animation.elapsed)

    container.position.set(animation.fromX + offsetX, animation.fromY + offsetY)

    animation.elapsed += delta

    if (animation.elapsed > animation.duration) {
        animation.destroy()
    }
}

export { animate }
