import { Engine } from "geotic"
import Appearance from "../components/appearance.js"
import WorldPosition from "../components/world-position.js"
import Map from "../components/map.js"
import Camera from "../components/camera.js"
import { getRandomMap } from "../lib/utils.js"

let ecs


export const createECS = () => {
    ecs = new Engine();

    const world = ecs.createWorld()
    
    ecs.registerComponent(Appearance)
    ecs.registerComponent(WorldPosition)
    ecs.registerComponent(Camera)
    ecs.registerComponent(Map)
}


export const createCamera = () => {
    const camera = world.createEntity()

    camera.add(Camera, {
        x: 100,
        y: 100,
        zoom: 1
    })
}




export const createPlayer = (x = 0, y = 0) => {
    const player = world.createEntity()

    player.add(Appearance, {
        tile: 3
    })

    player.add(WorldPosition, {
        x,
        y
    })

    
}


export const createRandomMap = (width = 50, height = 50) => {
    const {
        tiles,
        rooms
    } = getRandomMap(width, height)

    const map = world.createEntity() 

    map.add(Map, {
        tiles,
        rooms
    })
    
    
}

export default world