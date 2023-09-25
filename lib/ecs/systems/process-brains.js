import { getDistancePoints } from '/lib/utils/utils.js'
import { Move } from '/lib/ecs/components/_index.js'
import { getMap, getMonsters, getOwneds } from '/lib/ecs/ecs.js'

const processBrains = () => {

    // Get active monsters
    const activeMonsters = getMonsters().filter(({ brain }) => brain.active)

    if (activeMonsters.length === 0) return

    const { map } = getMap()
    const owneds = getOwneds()

    activeMonsters.forEach((entity) => {

        const {
            mapPosition,
            brain
        } = entity


        let closest
        let distance = 100
        
        // Get closest target
        owneds.forEach(entity => {
            let d = getDistancePoints(mapPosition, entity.mapPosition)

            if (d < distance) {
                distance = d 
                closest = entity
            }
        })

        if (!closest) {
            return
        }

        // Get path 
        const tiles = map.getPathPoints(mapPosition, closest.mapPosition)   

        if (tiles.length === 0) {
            return
        }
        
        // And move entity
        entity.add(Move, {
            x: tiles[0].x - mapPosition.x,
            y: tiles[0].y - mapPosition.y
        })
    })
}

export {
    processBrains
}