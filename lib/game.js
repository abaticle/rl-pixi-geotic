import { 
    createPixiApp,
    drawMap,
    drawPlayer, 
    drawUI,
    pixi
} from "./graphics.js"
import {
    createCamera,
    createGame,
    createMap,
    createPlayer,
    getGame,
    getMap
} from "../ecs/ecs.js"
import {
    createInputs
} from "./inputs.js"
import {
    moveCamera,
    moveEntities,
    updateVisibility,
    processInputs 
} from "../ecs/systems/_index.js"
import { GAME_STATE } from "../config.js"
import {
    GameContainer
} from "./graphics/game-container.js"

export default class Game {


    constructor() {
    }

    /**
     * Init game
     */
    async init() {
        await createPixiApp(800, 400)
        
        createGame()
        createMap(40, 20)

        const position = getMap().map.getRandomPositionInRoom()

        createPlayer(position.x, position.y)
        createCamera(1)
        createInputs()

        drawUI()
        drawMap()
        drawPlayer()

        pixi.ticker.add(delta => this.loop(delta))
    }

    /**
     * Game loop
     * @param {Number} delta 
     */
    loop(delta) {

        const {
            game
         } = getGame()

        switch (game.state) {
            case GAME_STATE.CAN_PLAY:
                processInputs()
                break
            
            case GAME_STATE.WAIT:
                //processAI()
                moveEntities()
                updateVisibility()
                moveCamera()

                game.state = GAME_STATE.CAN_PLAY
                game.turn += 1
                break
        }
        
        if (!game.started) {
            updateVisibility()
            moveCamera()

            game.started = true
        }

    }

}