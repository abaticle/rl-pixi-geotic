import { container, containerUI, createPixiApp, pixi } from "/lib/graphics.js";
import {
  createCamera,
  createGame,
  createMap,
  createMonsters,
  createPlayer,
  getGame,
  getMap,
} from "/lib/ecs/ecs.js";
import { createInputs } from "/lib/inputs/inputs.js";
import {
  animate,
  moveCamera,
  moveEntities,
  updateVisibility,
  updateUI,
  processInputs,
  processBrains,
} from "/lib/ecs/systems/_index.js";
import { GAME_STATE } from "/config.js";
import { GameContainer } from "/lib/graphics/game-container.js";

export default class Game {
  constructor() {}

  /**
   * Init game
   */
  async init() {
    await createPixiApp(800, 800);

    createGame();
    createMap(30, 10);

    const position = getMap().map.getRandomPositionInRoom();

    createPlayer(position.x, position.y);
    createMonsters(1);
    createCamera(1);
    createInputs();

    containerUI.draw();
    container.draw();

    pixi.ticker.add((delta) => this.loop(delta));
  }

  /**
   * Game loop
   * @param {Number} delta
   */
  loop(delta) {
    const { game } = getGame();

    switch (game.state) {
      case GAME_STATE.START:
        updateVisibility();
        game.state = GAME_STATE.WAIT_FOR_INPUT;
        break;

      case GAME_STATE.WAIT_FOR_INPUT:
        processInputs();
        break;

      case GAME_STATE.PROCESS_INPUT:
        processBrains();
        moveEntities();
        break;

      case GAME_STATE.ANIMATING:
        animate(delta);
        break;
    }

    // Only first  time
    if (!game.started) {
      game.started = true;
    }

    updateUI(delta);
    moveCamera(delta);
  }
}
