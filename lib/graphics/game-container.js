import { Application, Container, Sprite } from "pixi.js"
import { ZOOM_GAME, TILE_SIZE, TILESET, TINTS } from "../../config.js"
import { getDrawables, getMap, getPlayer } from "../ecs/ecs.js"
import { createSpriteFromTileset } from "../graphics/utils.js"

/**
 * @class
 * Game container class
 */
export class GameContainer extends Container {
    /** @type {Application} */
    pixi

    /** @type {Sprite} */
    pointer

    constructor(pixi) {
        super()

        this.scale.x = ZOOM_GAME
        this.scale.y = ZOOM_GAME
        //this.buttonMode = true
        //this.interactiveChildren = true

        this.pixi = pixi
        this.pixi.stage.addChild(this)

        window.gameContainer = this
    }

    centerOnSprite(sprite) {
        const x = sprite.position.x
        const y = sprite.position.y
        const width = window.innerWidth
        const height = window.innerHeight
        const scale = this.scale.x

        const targetX = width / 2 - x * scale
        const targetY = height / 2 - y * scale

        this.position.set(targetX, targetY)
    }

    draw() {
        this.drawPointer()
        this.drawMap()
        this.drawDoors()
        this.drawEntities()
    }

    drawDoors() {
        const { map } = getMap()

        map.rooms.forEach((room) => {
            room.getDoors((x, y) => {
                const tile = map.getTileAt(x, y)

                this.removeChild(tile.sprite)

                tile.sprite = createSpriteFromTileset(TILESET.DOOR_CLOSED)

                tile.sprite.x = x * TILE_SIZE
                tile.sprite.y = y * TILE_SIZE

                this.addChild(tile.sprite)
            })
        })
    }

    drawEntities() {
        let drawables = getDrawables()

        drawables.forEach(({ appearance, mapPosition }) => {
            appearance.sprite = createSpriteFromTileset(appearance.tileIndex)

            appearance.sprite.x = mapPosition.x * TILE_SIZE
            appearance.sprite.y = mapPosition.y * TILE_SIZE

            this.addChild(appearance.sprite)
        })
    }

    drawMap() {
        const { map } = getMap()

        map.getAllTiles().forEach((tile) => {
            tile.sprite = createSpriteFromTileset(tile.tileIndex)

            tile.sprite.x = tile.x * TILE_SIZE
            tile.sprite.y = tile.y * TILE_SIZE

            this.addChild(tile.sprite)
        })
    }

    drawPointer() {
        this.pointer = createSpriteFromTileset(TILESET.MOUSE_POINTER)
        this.addChild(this.pointer)
    }

    drawPlayer() {
        const { appearance, mapPosition } = getPlayer()

        appearance.sprite = createSpriteFromTileset(appearance.tileIndex)
        appearance.sprite.x = mapPosition.x * TILE_SIZE
        appearance.sprite.y = mapPosition.y * TILE_SIZE
        //appearance.sprite.roundPixels = true

        this.addChild(appearance.sprite)
    }

    getLocalPosition(x, y) {
        const position = this.toLocal({ x, y })

        return {
            x: Math.floor(position.x / TILE_SIZE),
            y: Math.floor(position.y / TILE_SIZE),
        }
    }

    updatePointer(x, y) {
        const pos = this.getLocalPosition(x, y)
        this.pointer.x = pos.x * TILE_SIZE
        this.pointer.y = pos.y * TILE_SIZE
    }
}
