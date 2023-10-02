import { Engine } from 'geotic'
import { getRandomMap } from '/lib/utils/utils.js'
import {
    Action,
    Animation,
    Appearance,
    Body,
    Brain,
    Camera,
    IsDead,
    Game,
    Description,
    Input,
    Map,
    MapPosition,
    Move,
    Owned,
    Selected,
} from './components/_index.js'
import { GAME_STATE, TILESET, DEV } from '/config.js'
import { Being, Monster, Player } from './prefabs/prefabs.js'
import { getEntitiesAt } from './cache.js'

/** @type {Engine} */
let engine

let world

let cameraQuery
let drawablesQuery
let gameQuery
let mapQuery
let movableQuery
let monstersQuery
let ownedsQuery
let playerQuery
let animationsQuery

/**
 * Initialize ECS and world
 */
const createECS = () => {
    engine = new Engine()
    world = engine.createWorld()

    engine.registerComponent(Action)
    engine.registerComponent(Appearance)
    engine.registerComponent(Body)
    engine.registerComponent(Brain)
    engine.registerComponent(Camera)
    engine.registerComponent(Game)
    engine.registerComponent(Description)
    engine.registerComponent(Input)
    engine.registerComponent(MapPosition)
    engine.registerComponent(Map)
    engine.registerComponent(Move)
    engine.registerComponent(Owned)
    engine.registerComponent(Selected)
    engine.registerComponent(Animation)
    engine.registerComponent(IsDead)

    engine.registerPrefab(Being)
    engine.registerPrefab(Monster)
    engine.registerPrefab(Player)

    cameraQuery = world.createQuery({ all: [Camera] })
    drawablesQuery = world.createQuery({ all: [Appearance, MapPosition] })
    gameQuery = world.createQuery({ all: [Game] })
    mapQuery = world.createQuery({ all: [Map] })
    monstersQuery = world.createQuery({
        all: [Appearance, MapPosition, Body, Brain],
        not: [Owned],
    })
    movableQuery = world.createQuery({ all: [Move] })
    ownedsQuery = world.createQuery({ all: [Owned] })
    playerQuery = world.createQuery({
        all: [Appearance, Body, MapPosition, Selected],
    })
    animationsQuery = world.createQuery({
        all: [Animation],
    })

    window.engine = engine
    window.world = world
}

createECS()

/**
 *
 * @param {Number} zoom
 */
const createCamera = (zoom = 1) => {
    const camera = world.createEntity()

    camera.add(Camera, {
        zoom,
    })
}

/**
 * Create animation entity
 * @param {Object} animation
 */
const createAnimation = (animation) => {
    const entity = world.createEntity()

    entity.add(Animation, animation)
}

/**
 * Create game entity
 */
const createGame = () => {
    const game = world.createEntity()

    game.add(Game, {
        turn: 0,
        state: GAME_STATE.START,
    })

    game.add(Input)
}

/**
 * Create a random map
 * @param {Number} width
 * @param {Number} height
 */
const createMap = (width = 50, height = 50) => {
    const map = world.createEntity()

    const { tiles, rooms } = getRandomMap(width, height)

    map.add(Map, {
        tiles,
        rooms,
        width,
        height,
    })
}

/**
 * Create player
 */
const createPlayer = () => {
    const player = world.createPrefab('Player')
    player.add(Selected)

    const { x, y } = getMap().map.getRandomPositionInRoom()
    const { mapPosition } = player

    mapPosition.moveAbsolute(x, y)
}

const createMonsters = (number) => {
    for (let i = 0; i < number; i++) {
        const monster = world.createPrefab('Monster')

        const { x, y } = getMap().map.getRandomPositionInRoom(true)
        const { mapPosition } = monster

        mapPosition.moveAbsolute(x, y)
    }
}

const getEntityAt = (...args) => {
    const entities = getEntitiesAt(...args)
    if (entities.length > 0) {
        return world.getEntity(entities[0])
    }
    return undefined
}

/**
 * @return {import('../typedefs').Entity.Camera} Camera entity
 */
const getCamera = () => cameraQuery.get()[0]

/**
 * @return {import('../typedefs').Entity.Drawable[]} Camera entity
 */
const getDrawables = () => drawablesQuery.get()

/**
 * @return {import('../typedefs').Entity.Game} Camera entity
 */
const getGame = () => gameQuery.get()[0]

/**
 * @return {import('../typedefs').Entity.Map} Map entity
 */
const getMap = () => mapQuery.get()[0]

/**
 * @return {import('../typedefs').Entity.Monster[]} Monster entities
 */
const getMonsters = () => monstersQuery.get()

/**
 * @return {import('../typedefs').Entity.Movable} Movables entities
 */
const getMovables = () => movableQuery.get()

/**
 * @return {import('../typedefs').Entity.Owned} Owned entities
 */
const getOwneds = () => ownedsQuery.get()

/**
 * @return {import('../typedefs').Entity.Player} Player entity
 */
const getPlayer = () => playerQuery.get()[0]

/**
 * @return {import('../typedefs').Entity.Animation} Animation
 */
const getAnimations = () => animationsQuery.get()

const setGameState = (state) => {
    const { game } = getGame()

    game.state = state
}

export {
    createAnimation,
    createCamera,
    createGame,
    createMap,
    createMonsters,
    createPlayer,
    engine,
    getAnimations,
    getCamera,
    getDrawables,
    getEntityAt,
    getGame,
    getMap,
    getMonsters,
    getMovables,
    getOwneds,
    getPlayer,
    setGameState,
    world,
}
