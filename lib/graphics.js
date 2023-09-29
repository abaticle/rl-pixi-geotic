import { Application, Assets, settings } from "pixi.js";
import { GameContainer } from "/lib/graphics/game-container.js";
import { UIContainer } from "./graphics/ui-container.js";

/** @type {Application} */
let pixi;

/** @type {GameContainer} */
let container;

/** @type {UIContainer} */
let containerUI;

/**
 * Initialize pixi and load assets
 * @param {Number} width
 * @param {Number} height
 */
const createPixiApp = async (width = 500, height = 800) => {

  settings.SCALE_MODE = 0

  pixi = new Application({
    width,
    height,
  });

  settings.RENDER_OPTIONS.antialias = false;

  document.body.appendChild(pixi.view);

  container = new GameContainer(pixi);
  containerUI = new UIContainer(pixi);

  window.addEventListener("resize", resize);
  resize();

  Assets.add("tileset", "assets/tileset/tileset.png");

  await Assets.load("tileset");

  window.pixi = pixi;
  window.container = container;
  window.containerUI = container;
};

const resize = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const minWidth = 375;
  const minHeight = 700;

  // Calculate renderer and canvas sizes based on current dimensions
  const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
  const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
  const scale = scaleX > scaleY ? scaleX : scaleY;
  const width = windowWidth * scale;
  const height = windowHeight * scale;

  // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
  pixi.renderer.view.style.width = `${windowWidth}px`;
  pixi.renderer.view.style.height = `${windowHeight}px`;
  window.scrollTo(0, 0);

  // Update renderer  and navigation screens dimensions
  pixi.renderer.resize(width, height);
};

const getFPS = () => {
  return pixi.ticker.FPS.toFixed(2);
};

export { pixi, container, containerUI, createPixiApp, getFPS };
