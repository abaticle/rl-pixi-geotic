import { getDistance } from "/lib/utils/utils.js"
import { Move } from "/lib/ecs/components/_index.js"
import { getMap, getMonsters, getOwneds } from "../ecs.js"

/**
 * Get closest entity
 * @param {Object} entity
 * @param {Object[]} targets
 */
const getClosest = (entity, targets) => {
  const { mapPosition } = entity

  let closest
  let distance = 100

  // Get closest target
  targets.forEach((entity) => {
    let d = getDistance(mapPosition, entity.mapPosition)

    if (d < distance) {
      distance = d
      closest = entity
    }
  })

  return closest
}

const processBrains = () => {
  // Get active monsters
  const activeMonsters = getMonsters().filter(({ brain }) => brain.active)

  activeMonsters.forEach((entity) => {
    const closest = getClosest(entity, getOwneds())

    if (!closest) {
      return
    }

    // Get path
    const { map } = getMap()
    const tiles = map.getPath(entity.mapPosition, closest.mapPosition)

    // And move entity
    if (tiles.length > 0) {

      const newX = tiles[0].x - entity.mapPosition.x
      const newY = tiles[0].y - entity.mapPosition.y

      //TODO: Handle attack ?
      if (map.getEntityAt(newX, newY)) {

      }
      else {
        entity.add(Move, {
          x: newX,
          y: newY,
        })
      }

    }
  })
}

export { processBrains }
