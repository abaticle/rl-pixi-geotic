import {
    Application,
    Container,
    Sprite
} from "pixi.js"
import {
    DEFAULT_ZOOM,
    TILE_SIZE,
    TILESET
} from "../../config.js"
import {
  getTile
} from "./utils.js"
import {
  getRectangle
} from  "../utils.js"

export class UIContainer extends Container {

    /** @type {Application} */
    pixi

    constructor(pixi) {
        super()
        
        this.scale.x = DEFAULT_ZOOM
        this.scale.y = DEFAULT_ZOOM
        this.buttonMode = true
        this.eventMode = "dynamic"
        this.interactiveChildren = true

        this.pixi = pixi
        this.pixi.stage.addChild(this)
    }

    drawRectangle(x, y, width, height) {
        const positions = getRectangle(x, y, width, height, true)
      
      
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
          if (tileIndex === 0) {
            tileIndex = TILESET.UI_PANEL_EMPTY
          }
      
          const sprite = new Sprite(getTile(tileIndex))
      
          sprite.x = xi * TILE_SIZE
          sprite.y = yi * TILE_SIZE
          sprite.roundPixels = true
          //sprite.tint = 0xff0000
      
          this.addChild(sprite)  
        })
    }
}