import { 
  Application, 
  Assets, 
  Cache, 
  Container,
  Rectangle, 
  Texture,
  Sprite,
  settings,
  SCALE_MODES
} from "pixi.js";
import { 
  DEV,
  DEFAULT_ZOOM,
  TILE_SIZE,
  TILESET
} from "../config.js"
import {
  getMap, getPlayer
} from "../ecs/ecs.js"
import {
  onMouseDown,
  onMouseMove,
  onMouseUp
} from "../lib/inputs.js"
import {
  getRectangle
} from "../lib/utils.js"
import {
  GameContainer
} from "./graphics/game-container.js"

const colors = {
  defaultColor: "#ff0077",
  defaultBGColor: "#000",
  revealedColor: "#222"
};


/** @type {Application} */
let pixi 

/** @type {Container} */
let container

/** @type {Container} */
let containerUI


/**
 * Initialize pixi and load assets
 * @param {Number} width 
 * @param {Number} height 
 */
const createPixiApp = async (width = 500, height = 400) => {

  pixi = new Application({
    resolution: Math.max(window.devicePixelRatio, 2),
      width,
      height,
      //background: "#000000",
      antialias: false
  })

  //settings.SCALE_MODES = SCALE_MODES.NEAREST

  document.body.appendChild(pixi.view)

  container = new GameContainer(pixi)

  /*
  // Game container
  container = new Container()
  
  container.scale.x = DEFAULT_ZOOM
  container.scale.y = DEFAULT_ZOOM
  container.buttonMode = true 
  container.eventMode = "dynamic"
  container.interactiveChildren = true
  */
  // UI container
  containerUI = new Container()

  containerUI.scale.x = DEFAULT_ZOOM
  containerUI.scale.y = DEFAULT_ZOOM
  containerUI.buttonMode = true 
  containerUI.eventMode = "dynamic"
  containerUI.interactiveChildren = true
  
  pixi.stage.addChild(container)
  pixi.stage.addChild(containerUI)

  // Whenever the window resizes, call the 'resize' function
  window.addEventListener('resize', resize);

  // Trigger the first resize
  resize();

  Assets.add("tileset", "assets/tileset/tileset.png")

  await Assets.load("tileset")  

  DEV ? console.log(`PIXI created`, pixi) : undefined

  
window.pixi = pixi 
window.container = container
}

/**
 * Get texture from a tileSet using index
 * @param {String} tilesetId 
 * @param {Number} tileIndex 
 * @returns 
 */
const getTile = (tileIndex = 0, tilesetId = "tileset") => {

  const tileset = Cache.get(tilesetId)

  if (tileset === undefined) throw new Error(`${tilesetId} doesn't exists`)

  const columns = Math.floor(tileset.width / TILE_SIZE)
  const x = (tileIndex % columns) * TILE_SIZE
  const y = Math.floor(tileIndex / columns) * TILE_SIZE;

  const texture = new Texture(tileset, new Rectangle(x, y, TILE_SIZE, TILE_SIZE))

  return texture

}

const drawMap = () => {
  const {
    map
  } = getMap()

  for (let y = 0; y < map.tiles.length; y++) {
    for (let x = 0; x < map.tiles[y].length; x++) {

      const tile = map.getTileAt(x, y)

      const texture = getTile(tile.tileIndex)

      tile.sprite = new Sprite(texture)

      tile.sprite.x = x * TILE_SIZE
      tile.sprite.y = y * TILE_SIZE

      tile.sprite.on("pointerdown", onMouseDown)
      tile.sprite.on("pointerup", onMouseUp)
      tile.sprite.on("pointermove", onMouseMove)

      tile.sprite.eventMode = "static"

      container.addChild(tile.sprite)

    }
  }
}

const drawUIRectangle = (x, y, width, height) => {
  const positions = getRectangle(x, y, width, height)


  positions.forEach(position => {

    const xi = position.x 
    const yi = position.y
    
    let tileIndex = 0

    if (xi === x && yi === y) {
      tileIndex = TILESET.UI_PANEL_TOP_LEFT
    }
    if (xi === x && yi === y + height - 1) {
      tileIndex = TILESET.UI_PANEL_BOTTOM_LEFT
    }
    if (xi === x + width - 1 && yi === y) {
      tileIndex = TILESET.UI_PANEL_TOP_RIGHT
    }
    if (xi === x + width - 1 && yi === y + height - 1) {
      tileIndex = TILESET.UI_PANEL_BOTTOM_RIGHT
    }
    if (xi === x && tileIndex === 0) {
      tileIndex = TILESET.UI_PANEL_LEFT
    }
    if (yi === y && tileIndex === 0) {
      tileIndex = TILESET.UI_PANEL_TOP
    }
    if (xi === x + width - 1 && tileIndex === 0) {
      tileIndex = TILESET.UI_PANEL_RIGHT
    }
    if (yi === y + height - 1 && tileIndex === 0) {
      tileIndex = TILESET.UI_PANEL_BOTTOM
    }

    const sprite = new Sprite(getTile(tileIndex))

    sprite.x = xi * TILE_SIZE
    sprite.y = yi * TILE_SIZE

    containerUI.addChild(sprite)  
  })
}

const drawUI = () => {

  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  drawUIRectangle(5, 1, 4, 4)


}


const drawPlayer = () => {
  const {
    appearance,
    mapPosition
  } = getPlayer()

  appearance.sprite = new Sprite(getTile(appearance.tileIndex))

  appearance.sprite.x = mapPosition.x * TILE_SIZE
  appearance.sprite.y = mapPosition.y * TILE_SIZE

  container.addChild(appearance.sprite)  
}


const resize = () => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const minWidth = 375
    const minHeight = 700

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1
    const scale = scaleX > scaleY ? scaleX : scaleY
    const width = windowWidth * scale
    const height = windowHeight * scale

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    pixi.renderer.view.style.width = `${windowWidth}px`
    pixi.renderer.view.style.height = `${windowHeight}px`
    window.scrollTo(0, 0)

    // Update renderer  and navigation screens dimensions
    pixi.renderer.resize(width, height)
}

export {
  pixi,
  container,
  colors,
  createPixiApp,
  drawMap,
  drawPlayer,
  drawUI,
  getTile
}