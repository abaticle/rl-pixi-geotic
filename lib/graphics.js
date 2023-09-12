import { 
  Application, 
  Assets, 
  Cache, 
  Container,
  Rectangle, 
  Texture,
  Sprite,
  settings
} from "pixi.js";
import { 
  TILE_SIZE,
  DEV
} from "../config.js"
import {
  getMap, getPlayer
} from "../ecs/ecs.js"

const colors = {
  defaultColor: "#ff0077",
  defaultBGColor: "#000",
  revealedColor: "#222"
};


/** @type {Application} */
let pixi 

/** @type {Container} */
let container

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
      background: "#000000",
      antialias: false
  })

  settings.SC

  document.body.appendChild(pixi.view)

  container = new Container()
  
  container.scale.x = 2
  container.scale.y = 2


  pixi.stage.addChild(container)

  // Whenever the window resizes, call the 'resize' function
  window.addEventListener('resize', resize);

  // Trigger the first resize
  resize();

  Assets.add("tileset", "assets/tileset/tileset.png")

  await Assets.load("tileset")  

  DEV ? console.log(`PIXI created`, pixi) : undefined
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

      const {
        tile
      } = map.getTileAt(x, y)

      const texture = getTile(tile)
      const sprite = new Sprite(texture)

      sprite.x = x * TILE_SIZE
      sprite.y = y * TILE_SIZE

      container.addChild(sprite)

    }
  }
}


const drawPlayer = () => {
  const {
    appearance,
    mapPosition
  } = getPlayer()

  appearance.sprite = new Sprite(getTile(appearance.tile))


  appearance.sprite.x = mapPosition.x * TILE_SIZE
  appearance.sprite.y = mapPosition.y * TILE_SIZE

  container.addChild(appearance.sprite)  
}


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
    //navigation.resize(width, height);
}

export {
  pixi,
  container,
  colors,
  createPixiApp,
  drawMap,
  drawPlayer,
  getTile
}