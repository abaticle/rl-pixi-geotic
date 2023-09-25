import {
    Application,
    Container,
    Sprite,
    Text,
    TextStyle
} from 'pixi.js'
import {
    ZOOM_UI,
    TILE_SIZE,
    TILESET
} from '/config.js'
import {
  getTile
} from '/lib/graphics/utils.js'
import {
  getRectangle
} from  '/lib/utils/utils.js'

export class UIContainer extends Container {

    /** @type {Application} */
    pixi

    /** @type {Map<String, Text>} */
    texts = new Map()


    constructor(pixi) {
        super()
        
        this.scale.x = ZOOM_UI
        this.scale.y = ZOOM_UI
        this.buttonMode = true
        this.eventMode = 'dynamic'
        this.interactiveChildren = true

        this.pixi = pixi
        this.pixi.stage.addChild(this)
    }

    draw() {
      this.drawRectangle(1, 1, 16, 10)
      this.createText('playerPosition', '', 2,2)
      this.createText('State', '', 2, 3.5)
      this.createText('mousePosition', '', 2, 5)      
      this.createText('FPS', '', 2, 6.5)
    }

    createText(id, label = '', x, y) {
      const text = this.texts.get(id)

      if (text) {
        throw new Error(`${id} already exists`)
      }

      const style = new TextStyle({
        fontSize: 16,
        fill: 0xffffff,
        fontFamily: 'Georgia'
      })

      const pixiText = new Text(label, style)

      pixiText.x = x * TILE_SIZE
      pixiText.y = y * TILE_SIZE

      this.texts.set(id, pixiText)

      this.addChild(pixiText)
    }

    updatePointer(x, y) {
      this.pointer.x = x
      this.pointer.y = y
    }

    updateText(id, label) {
      const text = this.texts.get(id)

      if (!text) {
        throw new Error(`${id} doesn't exists`)
      }

      text.text = label
    }

    drawPointer() {
      this.pointer = new Sprite(getTile(TILESET.MOUSE_POINTER))

      this.pointer.x = 5
      this.pointer.y = 5

      this.addChild(this.pointer)  
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width 
     * @param {Number} height 
     */
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