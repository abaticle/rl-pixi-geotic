import { Application } from "pixi.js"
import { world } from "../ecs/ecs.js"
import { initAssets } from "./graphics.js"
import { getRandomMap } from "./utils.js"
import { Map } from "../ecs/components/_index.js"


export default class Game {

    /** @type {Application} */
    pixi


    constructor() {
        this.pixi = new Application({
            width: 500,
            height: 400,
            background: "#000000"
        })

        this.pixi.ticker.add(delta => this.gameLoop(delta))

        this.createMap()
    }

    gameLoop(delta) {

    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    createMap(width = 50, height = 50) {
        
        const {
            tiles,
            rooms
        } = getRandomMap(width, height)
    
        const map = world.createEntity() 
    
        map.add(Map, {
            tiles,
            rooms
        })
        
        
    }

    /**
     * Init game
     */
    async init() {
        await initAssets()

    }

}