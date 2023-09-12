import {
    world,
    getCamera,
    getPlayer
} from "../ecs.js"
import {
    container
} from "../../lib/graphics.js"
import { TILE_SIZE } from "../../config.js"

const moveCamera = (delta) => {
    
    const {
        camera
    } = getCamera()

    const {
        mapPosition
    } = getPlayer()

    console.log(mapPosition)

    container.position.set(mapPosition.x * TILE_SIZE * -1, mapPosition.y * TILE_SIZE * -1)

}

export {
    moveCamera
}