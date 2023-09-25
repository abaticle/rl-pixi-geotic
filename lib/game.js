import { container, containerUI, createPixiApp, pixi } from "./graphics.js"
import {
  createCamera,
  createGame,
  createMap,
  createMonsters,
  createPlayer,
  getGame,
  getMap,
} from "./ecs/ecs.js"
import { createInputs } from "./inputs/inputs.js"
import {
  animate,
  moveCamera,
  moveEntities,
  updateVisibility,
  updateUI,
  processInputs,
  processBrains,
} from "./ecs/systems/_index.js"
import { GAME_STATE } from "../config.js"

export default class Game {
    constructor() {}

    /**
     * Init game
     */
    async init() {
            await createPixiApp(800, 800)

            createGame()
            createMap(30, 10)
            createPlayer()
            createMonsters(1)
            createCamera(1)
            createInputs()

            containerUI.draw()
            container.draw()

            pixi.ticker.add((delta) => this.loop(delta))
    }

    /**
     * Game loop
     * @param {Number} delta
     */
    loop(delta) {
        const { game } = getGame()

        switch (game.state) {
            case GAME_STATE.START:
                updateVisibility()
                game.state = GAME_STATE.WAIT_FOR_INPUT
                break

            case GAME_STATE.WAIT_FOR_INPUT:
                processInputs()
                break

            case GAME_STATE.PROCESS_INPUT:
                moveEntities()
                game.state = GAME_STATE.PROCESS_AI
                break

            case GAME_STATE.PROCESS_AI:
                processBrains()
                moveEntities()
                game.state = GAME_STATE.ANIMATING
                break

            case GAME_STATE.ANIMATING:
                animate(delta)
                break
        }


        updateUI(delta)
        moveCamera(delta)
    }
}
