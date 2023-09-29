import { Application, Container, Text, TextStyle } from "pixi.js"
import { ZOOM_UI, TILE_SIZE, TILESET } from "/config.js"
import { createSpriteFromTileset } from "/lib/graphics/utils.js"
import { getRectangle } from "/lib/utils/utils.js"

/**
 * @class
 * Game UI container class
 */
export class UIContainer extends Container {
    /** @type {Application} */
    pixi

    /** @type {Map<String, Text>} */
    texts = new Map()

    /** @type {Text[]} */
    logs = []

    constructor(pixi) {
        super()

        this.scale.x = ZOOM_UI
        this.scale.y = ZOOM_UI
        this.buttonMode = true
        this.interactiveChildren = true

        this.pixi = pixi
        this.pixi.stage.addChild(this)
    }

    get tileWidth() {
        return Math.floor(this.pixi.renderer.width / TILE_SIZE)
    }

    get tileHeight() {
        return Math.floor(this.pixi.renderer.height / TILE_SIZE)
    }

    draw() {
        // info (debug)
        this.drawRectangle(1, 1, 15, 6)
        this.createText("playerPosition", "", 2, 2)
        this.createText("State", "", 2, 3.5)
        this.createText("mousePosition", "", 2, 5)

        // logs
        this.drawRectangle(1, 7, 15, 7)
    }

    addLog(label) {
        const style = new TextStyle({
            fontSize: 16,
            fill: 0xffffff,
            fontFamily: "Georgia",
        })

        const pixiText = new Text(label, style)

        pixiText.visible = false

        this.addChild(pixiText)
        this.logs = [pixiText, ...this.logs]
    }

    updateLogs() {
        let index = 8

        for (let i = 0; i < 5; i++) {
            if (!this.logs[i]) {
                break
            }
            const log = this.logs[i]

            log.x = 2 * TILE_SIZE
            log.y = index * TILE_SIZE - 4
            log.visible = true

            index += 1.5

            if (i === 4) {
                log.visible = false
            }
        }
    }

    createText(id, label = "", x, y) {
        const text = this.texts.get(id)

        if (text) {
            throw new Error(`${id} already exists`)
        }

        const style = new TextStyle({
            fontSize: 14,
            fill: 0xffffff,
            fontFamily: "Georgia",
        })

        const pixiText = new Text(label, style)

        pixiText.x = x * TILE_SIZE
        pixiText.y = y * TILE_SIZE - 4

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
        this.pointer = createSpriteFromTileset(TILESET.MOUSE_POINTER)

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

            this.addChild(sprite)
        })
    }
}
