import { world } from '../ecs'
import { Animation, Appearance } from '../components/_index.js'
import { GAME_STATE } from '../../config.js'
import { setGameState } from '../ecs.js'

const animableQuery = world.createQuery({
    all: [Animation, Appearance]
})

const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))

const animate = (delta) => {

    if (animableQuery.get().length === 0) {
        setGameState(GAME_STATE.WAIT_FOR_INPUT)
    }

    animableQuery.get().forEach(entity => {
        const {
            animation,
            appearance
        } = entity 

        const {
            sprite 
        } = appearance

        const newPosition = animation.getNextPosition(delta * 100)

        sprite.x = newPosition.x
        sprite.y = newPosition.y

        if (sprite.x === animation.toX && sprite.y === animation.toY) {
            entity.animation.destroy()
        }

    })
}

export {
    animate
}