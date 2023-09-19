import { world, getMap } from "../ecs"
import { Move, MapPosition, Appearance } from "../components/_index.js"
import { TILE_SIZE } from "../../config.js"

const movableQuery = world.createQuery({
    all: [Move, MapPosition, Appearance]
})

const moveEntities = () => {

    movableQuery.get().forEach(entity => {

        const {
            mapPosition,
            move,
            appearance
        } = entity

        const {
            map
        } = getMap()

        const newX = mapPosition.x + move.x
        const newY = mapPosition.y + move.y

        if (map.canMove(newX, newY)) {

            mapPosition.x += move.x
            mapPosition.y += move.y
    
            appearance.sprite.x = mapPosition.x * TILE_SIZE
            appearance.sprite.y = mapPosition.y * TILE_SIZE

        }

        entity.move.destroy()

    })
}

export {
    moveEntities
}