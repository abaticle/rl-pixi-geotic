import { 
    createPixiApp,
    drawMap,
    drawPlayer, 
    pixi
} from "./graphics.js"
import {
    createCamera,
    createECS,
    createMap,
    createPlayer
} from "../ecs/ecs.js"
import {
    createInputs
} from "./inputs.js"
import {
    moveCamera,
    moveEntities
} from "../ecs/systems/_index.js"

export default class Game {

    constructor() {
    }

    /**
     * Init game
     */
    async init() {
        await createPixiApp(800, 400)
        //createECS()
        
        createMap(80, 40)
        createPlayer(19, 15)
        createCamera(1)
        createInputs()

        drawMap()
        drawPlayer()

        pixi.ticker.add(delta => this.loop(delta))
    }

    /**
     * Game loop
     * @param {Number} delta 
     */
    loop(delta) {
        
        moveCamera(delta)
        moveEntities(delta)
    }

}