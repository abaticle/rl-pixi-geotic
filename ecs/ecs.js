import { 
    Engine  
} from "geotic"
import {
    getRandomMap
} from "../lib/utils.js"
import {
    Appearance,
    Camera,
    Game,
    Owned,
    Map,
    MapPosition
} from "./components/_index.js"
import { 
    GAME_STATE, 
    TILESET,
    DEV
} from "../config.js"

let engine 
let world 
let mapQuery 
let playerQuery
let cameraQuery




/**
 * Initialize ECS and world
 */
const createECS = () => {


    engine = new Engine()
    world = engine.createWorld()
    
    engine.registerComponent(Appearance)
    engine.registerComponent(MapPosition)
    engine.registerComponent(Camera)
    engine.registerComponent(Map)
    engine.registerComponent(Owned)

    mapQuery = world.createQuery({
        all: [Map]
    })

    playerQuery = world.createQuery({
        all: [Appearance, MapPosition, Owned]
    })

    cameraQuery = world.createQuery({
        all: [Camera]
    })
        
    window.engine = engine
    window.world = world

    DEV ? console.log(`ECS created`, world) : undefined
}

/**
 * 
 * @param {Number} zoom 
 */
const createCamera = (zoom = 1) => {

    const camera = world.createEntity()

    camera.add(Camera, {
        x: 0,
        y: 0,
        zoom
    })

    DEV ? console.log(`Camera created`, camera) : undefined
}

/**
 * Create game 
 */
const createGame = () => {
    const game = world.createEntity()

    game.add(Game, {
        turn: 0,
        state: GAME_STATE.CAN_PLAY
    })
    
    DEV ? console.log(`Game created`, game) : undefined
}   

/**
 * Create a random map
 * @param {Number} width 
 * @param {Number} height 
 */
const createMap = (width = 50, height = 50) => {
    const {
        tiles,
        rooms
    } = getRandomMap(width, height)

    const map = world.createEntity() 

    map.add(Map, {
        tiles,
        rooms
    })

    
    DEV ? console.log(`Map created`, map) : undefined
}

/**
 * Create player
 * @param {Number} x 
 * @param {Number} y  
 */
const createPlayer = (x = 0, y = 0) => {
    const player = world.createEntity()

    player.add(Appearance, {
        tile: TILESET.PLAYER
    })

    player.add(MapPosition, {
        x,
        y
    })    

    player.add(Owned, {})    

    DEV ? console.log(`Player created ${player}`) : undefined
}



/**
 * Get map
 */
const getMap = () => {
    return mapQuery.get()[0]
}

/**
 * Get player
 * @returns 
 */
const getPlayer = () => {
    return playerQuery.get()[0]
}

/**
 * Get camera
 * @returns 
 */
const getCamera = () => {
    return cameraQuery.get()[0]
}

export {
    createCamera,
    createECS,
    createGame,
    createMap,
    createPlayer,
    getCamera,
    getMap,
    getPlayer,
    world   
}