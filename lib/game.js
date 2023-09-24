import { 
    container,
    containerUI,
    createPixiApp,
    pixi
} from './graphics.js'
import {
    createCamera,
    createGame,
    createMap,
    createMonsters,
    createPlayer,
    getGame,
    getMap
} from '../ecs/ecs.js'
import {
    createInputs
} from './inputs.js'
import {
    animate,
    moveCamera,
    moveEntities,
    updateVisibility,
    updateUI,
    processInputs 
} from '../ecs/systems/_index.js'
import { GAME_STATE } from '../config.js'
import {
    GameContainer
} from './graphics/game-container.js'

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
        createMonsters(5)
        createCamera(1)
        createInputs()

        containerUI.draw()
        container.draw()

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
            case GAME_STATE.WAIT_FOR_INPUT:
                updateVisibility()
                processInputs()
                break

            case GAME_STATE.PROCESS_INPUT:
                moveEntities()
                break

            case GAME_STATE.ANIMATING:
                animate(delta)
                break
            
        }

        // Only first  time
        if (!game.started) {
            game.started = true
        }

        updateUI(delta)
        moveCamera(delta)
        

    }

}