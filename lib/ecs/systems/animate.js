import { Animation, Appearance } from "/lib/ecs/components/_index.js"
import { GAME_STATE, ANIMATION_TYPE } from "/config.js"
import { setGameState, world } from "/lib/ecs/ecs.js"

const animableQuery = world.createQuery({
  all: [Animation],
})

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
 */
const animateColor = (animation, delta) => {
  const { targetSprite } = animation

  const newTint = animation.getNextColor(delta)

  targetSprite.tint = newTint

  if (targetSprite.tint === animation.toColor) {
    animation.destroy()
  }
}

const animate = (delta) => {
  animableQuery.get().forEach((entity) => {
    const { animation } = entity

    switch (animation.type) {
      case ANIMATION_TYPE.MOVE:
        animateMove(animation, delta)
        break

      case ANIMATION_TYPE.COLOR:
        animateColor(animation, delta)
        break

      default:
        throw new Error(`Unknown animation ${animation.type}`)
    }
  })

  // No more things to animation, we can go to next state
 /* if (animableQuery.get().length === 0) {
    setGameState(GAME_STATE.START)
  }*/
}

export { animate }
