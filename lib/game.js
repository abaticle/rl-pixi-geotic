import { Application } from "pixi.js"
import { world } from "../ecs/ecs.js"
import { initPixi } from "./graphics.js"
import { getRandomMap } from "./utils.js"
import { Map } from "../ecs/components/_index.js"


export default class Game {


    constructor() {
    }

    /**
     * Init game
     */
    async init() {
        await initPixi()

    }

}