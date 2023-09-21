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
    Owned,
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
let monstersQuery
let drawablesQuery
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
    engine.registerComponent(Owned)

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

    drawablesQuery = world.createQuery({
        all: [Appearance, MapPosition]
    })

    monstersQuery = world.createQuery({
        all: [Appearance, MapPosition],
        not: [Owned]
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

    player.add(Owned)

    player.add(Selected)    

    DEV ? console.log(`Player created`, player) : undefined

    window.player = player
}

const createMonsters = (number) => {

    for (let i = 0; i < number; i++) {

        const monster = world.createEntity()

        const {
            x,
            y
        } = getMap().map.getRandomPositionInRoom()


        monster.add(Appearance, {
            tileIndex: TILESET.MONSTER
        })
    
        monster.add(MapPosition, {
            x,
            y
        })    
    }


}


const getCamera = () => cameraQuery.get()[0]
const getGame = () => gameQuery.get()[0]
const getGameState = () => getGame().game.state
const getDrawables = () => drawablesQuery.get()
const getMap = () => mapQuery.get()[0]
const getMonsters = () => monstersQuery.get()
const getMovables = () => movableQuery.get()
const getPlayer = () => playerQuery.get()[0]

const setGameState = (state) => getGame().state = state

export {
    createCamera,
    createGame,
    createMap,
    createMonsters,
    createPlayer,
    getCamera,
    getDrawables,
    getGame,
    getGameState,
    getMap,
    getMonsters,
    getMovables,
    getPlayer,
    setGameState,
    world   
}