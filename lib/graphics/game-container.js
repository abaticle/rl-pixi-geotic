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
    getMap
} from "../../ecs/ecs.js"
import {
    onMouseDown,
    onMouseMove,
    onMouseUp
} from "../inputs.js"
import {
    getTile
} from "./utils.js"


export class GameContainer extends Container {

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



    drawMap() {
        const {
            map
        } = getMap()

        map.getAllTiles().forEach(tile => {

            tile.sprite = new Sprite(getTile(tile.tileIndex))

            tile.sprite.x = tile.x * TILE_SIZE
            tile.sprite.y = tile.y * TILE_SIZE
            tile.sprite.eventMode = "static"
            tile.sprite.on("pointerdown", onMouseDown)
            tile.sprite.on("pointerup", onMouseUp)
            tile.sprite.on("pointermove", onMouseMove)

            this.container.addChild(tile.sprite)
        })
    }



    drawPlayer() {
        const {
            appearance,
            mapPosition
        } = getPlayer()

        appearance.sprite = new Sprite(getTile(appearance.tileIndex))
        appearance.sprite.x = mapPosition.x * TILE_SIZE
        appearance.sprite.y = mapPosition.y * TILE_SIZE

        this.container.addChild(appearance.sprite)
    }


}