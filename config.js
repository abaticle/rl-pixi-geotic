const DEV = true

const SEE_EVERYTHING = false

const ZOOM_GAME = 3
const ZOOM_UI = 1

let ROT_SEED = 13

const ANIMATION_TYPE = {
    COLOR: "Color",
    MOVE: "Move"
}

const ACTION_TYPE = {
    OPEN_DOOR: "open_door",
    ATTACK_MELEE: "attack_melee"
}

const TILESET = {
    PLAYER: 0,
    MONSTER: 1,
    WALL: 3,
    FLOOR: 4,
    DOOR_CLOSED: 5,
    DOOR_OPEN: 6,
    UI_PANEL_TOP_LEFT: 7,
    UI_PANEL_TOP: 8,
    UI_PANEL_TOP_RIGHT: 9,
    UI_PANEL_LEFT: 10,
    UI_PANEL_EMPTY: 11,
    UI_PANEL_RIGHT: 12,
    UI_PANEL_BOTTOM_LEFT: 13,
    UI_PANEL_BOTTOM: 14,
    UI_PANEL_BOTTOM_RIGHT: 15,
    MOUSE_POINTER: 16,
    MONSTER_DEAD: 17
}

const TILE_TYPE = {
    DOOR_CLOSED: "door_closed",
    DOOR_OPEN: "door_open",
    WALL: "wall",
    FLOOR: "floor"
}

const TINTS = {
    VISITED: "#1c1c1c",
    VISIBLE: "#ffffff",
    HIDDEN:  "#000000",
    MONSTER: "#f20707"
}

const GAME_STATE = {
    START: 'Start',
    WAIT_FOR_INPUT: 'Wait for player input',
    PROCESS_INPUT: 'Process input', 
    PROCESS_AI: 'Process AI',
    ANIMATING: 'Animating sprites'
}

const MONSTER_STATE = {
    WANDERING: "Wandering",
    SEEKING: "Seeking",
    ESCAPING: "Escaping"
}

const TILE_SIZE = 16

const DIRECTIONS = {
    LEFT: 'Left',
    RIGHT: 'Right',
    TOP: 'Top',
    BOTTOM: 'Bottom'
}

const MOVE_DURATION = 10
const DISPLAY_DURATION = 40

export { 
    ACTION_TYPE,
    ANIMATION_TYPE,
    DEV,
    DIRECTIONS,
    DISPLAY_DURATION,
    GAME_STATE,
    MONSTER_STATE,
    MOVE_DURATION,
    ROT_SEED,
    SEE_EVERYTHING,
    TILE_SIZE,
    TILE_TYPE,
    TILESET,
    TINTS,
    ZOOM_GAME,
    ZOOM_UI
}