import { Animation, Appearance } from '/lib/ecs/components/_index.js'
import { GAME_STATE } from '/config.js'
import { setGameState, world } from '/lib/ecs/ecs.js'

const animableQuery = world.createQuery({
    all: [Animation, Appearance]
})

const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))

const animate = (delta) => {

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

    
    if (animableQuery.get().length === 0) {
        setGameState(GAME_STATE.START)
    }

}

export {
    animate
}