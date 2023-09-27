import {
    Application,
    Container,
    Sprite
} from 'pixi.js'
import {
    ZOOM_GAME,
    TILE_SIZE,
    TILESET,
    TINTS
} from '/config.js'
import {
    getDrawables,
    getMap,
    getPlayer
} from '/lib/ecs/ecs.js'
import {
    onMouseDown,
    onMouseMove,
    onMouseUp
} from '/lib/inputs/inputs.js'
import {
    getTile
} from '/lib/graphics/utils.js' 


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
        this.buttonMode = true
        this.interactiveChildren = true

        this.pixi = pixi
        this.pixi.stage.addChild(this)

        window.gameContainer = this
        
    }

    getLocalPosition(x, y) {
        const position = this.toLocal({x, y})

        return {
            x: Math.floor(position.x / TILE_SIZE),
            y: Math.floor(position.y / TILE_SIZE)
        }
    }

    draw() {
        this.drawPointer()
        this.drawMap()
        this.drawEntities()
    }

    drawMap() {
        const {
            map
        } = getMap()

        map.getAllTiles().forEach(tile => {

            tile.sprite = new Sprite(getTile(tile.tileIndex))

            tile.sprite.x = tile.x * TILE_SIZE
            tile.sprite.y = tile.y * TILE_SIZE
            tile.sprite.tint = TINTS.HIDDEN

            this.addChild(tile.sprite)
        })
    }

    drawEntities() {
        let drawables = getDrawables()

        drawables.forEach(({appearance, mapPosition}) => {

            appearance.sprite = new Sprite(getTile(appearance.tileIndex))
            appearance.sprite.x = mapPosition.x * TILE_SIZE
            appearance.sprite.y = mapPosition.y * TILE_SIZE

            this.addChild(appearance.sprite)
        })

    }

    drawPointer() {
        this.pointer = new Sprite(getTile(TILESET.MOUSE_POINTER))
        this.addChild(this.pointer)          
    }

    drawPlayer() {
        const {
            appearance,
            mapPosition
        } = getPlayer()

        appearance.sprite = new Sprite(getTile(appearance.tileIndex))
        appearance.sprite.x = mapPosition.x * TILE_SIZE
        appearance.sprite.y = mapPosition.y * TILE_SIZE
        //appearance.sprite.roundPixels = true

        this.addChild(appearance.sprite)
    }

    centerOnSprite(sprite) {
        const x = sprite.position.x
        const y = sprite.position.y
        const width = window.innerWidth
        const height = window.innerHeight
        const scale = this.scale.x

        const targetX = (width / 2) - x * scale
        const targetY = (height / 2) - y * scale
    
        this.position.set(targetX, targetY)        
    }

    updatePointer(x, y) {
        const pos = this.getLocalPosition(x, y)
        this.pointer.x = pos.x * TILE_SIZE
        this.pointer.y = pos.y * TILE_SIZE
    }
}