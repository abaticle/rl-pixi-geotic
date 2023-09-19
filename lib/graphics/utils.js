import {
  Cache,
  Rectangle,
  Texture
} from "pixi.js"
import {
  TILESET, 
  TILE_SIZE
} from "../../config.js"

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

  if (tileIndex === TILESET.UI_PANEL_TOP_LEFT) {
    console.log(x, y)
  }

  return texture

}

/**
 * Resize current window
 */
const resize = (pixi) => {
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
  getTile,
  resize
}