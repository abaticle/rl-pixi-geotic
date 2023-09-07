import { Application, Assets, Cache, Rectangle, Texture } from "pixi.js";
import { TILE_SIZE } from "../config.js"

export const colors = {
  defaultColor: "#ff0077",
  defaultBGColor: "#000",
  revealedColor: "#222"
};

export const chars = {
  defaultChar: "?",
  wall: "#",
  floor: "•"
};

let pixi 

/**
 * Initialize pixi and load assets
 * @param {Number} width 
 * @param {Number} height 
 */
export const initPixi = async (width = 500, height = 400) => {
  pixi = new Application({
      width,
      height,
      background: "#000000"
  })

  document.body.appendChild(pixi.view)

  Assets.add("tileset", "assets/tileset/tileset.png")

  await Assets.load("tileset")  
}

/**
 * Get texture from a tileSet using index
 * @param {String} tilesetId 
 * @param {Number} tileIndex 
 * @returns 
 */
export const getTile = (tilesetId = "tileset", tileIndex = 0) => {

  const tileset = Cache.get(tilesetId)

  if (tileset === undefined) throw new Error(`${tilesetId} doesn't exists`)

  const columns = Math.floor(tileset.width / TILE_SIZE)
  const x = (tileIndex % columns) * TILE_SIZE
  const y = Math.floor(tileIndex / columns) * TILE_SIZE;

  const texture = new Texture(tileset, new Rectangle(x, y, TILE_SIZE, TILE_SIZE))

  return texture

}