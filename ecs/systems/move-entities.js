import { world, getMap } from "../ecs"
import { Move, MapPosition } from "../components/_index.js"

const movableQuery = world.createQuery({
    all: [Move, MapPosition]
})

const moveEntities = (delta) => {
    movableQuery.get(({move, mapPosition}) => {
        
    })
}

export {
    moveEntities
}