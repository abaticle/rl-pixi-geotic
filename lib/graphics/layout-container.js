import { Container, Sprite, Texture } from 'pixi.js'
import { getRectangle } from '../utils/utils.js'
import { createSpriteFromTileset } from '../graphics/utils.js'
import { TILE_SIZE, TILESET } from '../../config.js'

class SpriteBorder extends Sprite {
    /**
     *
     * @param {Texture} texture
     * @param {String} borderType
     */
    constructor(texture, borderType) {
        super(texture)
    }
}

export default class LayoutContainer extends Container {
    content

    borders

    /**
     *
     * @param {Object} options
     */
    constructor({ scale = 1, x = 0, y = 0, width = 1, height = 1 }) {
        super()

        this.scale.x = scale
        this.scale.y = scale

        this.content = new Container()
        this.borders = new Container()

        this.drawRectangle(x, y, width, height)
    }

    update() {}

    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     */
    drawRectangle(x, y, width, height) {
        const positions = getRectangle(x, y, width, height, true)

        positions.forEach((position) => {
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

            const sprite = createSpriteFromTileset(tileIndex)

            sprite.x = xi * TILE_SIZE
            sprite.y = yi * TILE_SIZE
            sprite.roundPixels = true
            //sprite.tint = 0xff0000

            this.borders.addChild(sprite)
        })
    }
}
