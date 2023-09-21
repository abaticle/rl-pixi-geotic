import { 
    container,
    containerUI,
    createPixiApp,
    pixi
} from "./graphics.js"
import {
    createCamera,
    createGame,
    createMap,
    createMonsters,
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
        await createPixiApp(800, 800)
        
        createGame()
        createMap(40, 20)

        const position = getMap().map.getRandomPositionInRoom()

        createPlayer(position.x, position.y)
        createMonsters(10)
        createCamera(1)
        createInputs()

        containerUI.drawRectangle(5, 1, 4, 4)
        container.drawMap()
        //container.drawPlayer()
        //container.drawMonsters()
        container.drawEntities()

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