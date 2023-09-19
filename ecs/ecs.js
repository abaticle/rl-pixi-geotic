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
    Input,
    Map,
    MapPosition,
    Move,
    Selected
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
let movableQuery
let gameQuery




/**
 * Initialize ECS and world
 */
const createECS = () => {


    engine = new Engine()
    world = engine.createWorld()
    
    engine.registerComponent(Appearance)
    engine.registerComponent(Camera)
    engine.registerComponent(Game)
    engine.registerComponent(Input)
    engine.registerComponent(MapPosition)
    engine.registerComponent(Map)
    engine.registerComponent(Selected)
    engine.registerComponent(Move)

    mapQuery = world.createQuery({
        all: [Map]
    })

    playerQuery = world.createQuery({
        all: [Appearance, MapPosition, Selected]
    })

    cameraQuery = world.createQuery({
        all: [Camera]
    })

    movableQuery = world.createQuery({
        all: [Move]
    })

    gameQuery = world.createQuery({
        all: [Game]
    })
        
    window.engine = engine
    window.world = world

    DEV ? console.log(`ECS created`, world) : undefined
}

createECS()

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

    game.add(Input)
    
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
        rooms,
        width,
        height
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
        tileIndex: TILESET.PLAYER
    })

    player.add(MapPosition, {
        x,
        y
    })    

    player.add(Selected, {})    

    DEV ? console.log(`Player created`, player) : undefined

    window.player = player
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

/**
 * Get game
 * @returns 
 */
const getGame = () => {
    return gameQuery.get()[0]
}

const getGameState = () => {
    const {
        game
    } = getGame()

    return game.state
}

const setGameState = (state) => {    
    const {
        game
    } = getGame()

    game.state = state
}

const getMovables = () => {
    return movableQuery.get()
}

export {
    createCamera,
    createGame,
    createMap,
    createPlayer,
    getCamera,
    getGame,
    getGameState,
    getMap,
    getMovables,
    getPlayer,
    setGameState,
    world   
}