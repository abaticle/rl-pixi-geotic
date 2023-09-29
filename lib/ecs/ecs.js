import { Engine } from "geotic"
import { getRandomMap } from "/lib/utils/utils.js"
import {
  Action,
  Animation,
  Appearance,
  Brain,
  Camera,
  Game,
  Health,
  Input,
  Map,
  MapPosition,
  Move,
  Owned,
  Selected,
} from "/lib/ecs/components/_index.js"
import { GAME_STATE, TILESET, DEV } from "/config.js"

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

/**
 * Initialize ECS and world
 */
const createECS = () => {
  engine = new Engine()
  world = engine.createWorld()

  engine.registerComponent(Action)
  engine.registerComponent(Appearance)
  engine.registerComponent(Brain)
  engine.registerComponent(Camera)
  engine.registerComponent(Game)
  engine.registerComponent(Health)
  engine.registerComponent(Input)
  engine.registerComponent(MapPosition)
  engine.registerComponent(Map)
  engine.registerComponent(Move)
  engine.registerComponent(Owned)
  engine.registerComponent(Selected)
  engine.registerComponent(Animation)

  cameraQuery = world.createQuery({ all: [Camera] })
  drawablesQuery = world.createQuery({ all: [Appearance, MapPosition] })
  gameQuery = world.createQuery({ all: [Game] })
  mapQuery = world.createQuery({ all: [Map] })
  monstersQuery = world.createQuery({
    all: [Appearance, MapPosition, Brain],
    not: [Owned],
  })
  movableQuery = world.createQuery({ all: [Move] })
  ownedsQuery = world.createQuery({ all: [Owned] })
  playerQuery = world.createQuery({ all: [Appearance, MapPosition, Selected] })

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
    x: 0,
    y: 0,
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

  const position = getMap().map.getRandomPositionInRoom()
  const player = world.createEntity()

  player.add(Appearance, {
    tileIndex: TILESET.PLAYER,
  })

  player.add(MapPosition, {
    x: position.x,
    y: position.y,
  })

  player.add(Owned)

  player.add(Selected)

  player.add(Health, {
    max: 10,
    current: 10,
  })

  window.player = player
}

const createMonsters = (number) => {
  for (let i = 0; i < number; i++) {
    const monster = world.createEntity()

    const { x, y } = getMap().map.getRandomPositionInRoom(true)

    monster.add(Appearance, {
      tileIndex: TILESET.MONSTER,
    })

    monster.add(MapPosition, {
      x,
      y,
    })

    monster.add(Health, {
      max: 4,
      current: 4,
    })

    monster.add(Brain)
  }
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
 * @return {import('../typedefs').Entity.Monster} Monster entities
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
  getCamera,
  getDrawables,
  getGame,
  getMap,
  getMonsters,
  getMovables,
  getOwneds,
  getPlayer,
  setGameState,
  world,
}
