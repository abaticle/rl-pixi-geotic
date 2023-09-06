import { Engine  } from "geotic"
import {
    Appearance,
    Camera,
    Map,
    WorldPosition
} from "./components/_index.js"

let engine 
let world 

const init = () => {

    console.log("create ECS")

    engine = new Engine()
    world = engine.createWorld()
    
    engine.registerComponent(Appearance)
    engine.registerComponent(WorldPosition)
    engine.registerComponent(Camera)
    engine.registerComponent(Map)
    
}



export {
    world   
}


/*
export default class ECS {
    #engine

    #world

    constructor() {
        this.#engine = new Engine()
        this.#world = this.#engine.createWorld()

        this.#engine.registerComponent(Appearance)
        this.#engine.registerComponent(WorldPosition)
        this.#engine.registerComponent(Camera)
        this.#engine.registerComponent(Map)
    }
}

*/