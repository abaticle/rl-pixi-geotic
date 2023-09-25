const DEV = true

const SEE_EVERYTHING = false

const ZOOM_GAME = 2
const ZOOM_UI = 1

const ROT_SEED = 13

const TILESET = {
    PLAYER: 0,
    MONSTER: 1,
    WALL: 3,
    FLOOR: 4,
    UI_PANEL_TOP_LEFT: 7,
    UI_PANEL_TOP: 8,
    UI_PANEL_TOP_RIGHT: 9,
    UI_PANEL_LEFT: 10,
    UI_PANEL_EMPTY: 11,
    UI_PANEL_RIGHT: 12,
    UI_PANEL_BOTTOM_LEFT: 13,
    UI_PANEL_BOTTOM: 14,
    UI_PANEL_BOTTOM_RIGHT: 15,
    MOUSE_POINTER: 16
}

const TINTS = {
    VISITED: 0x1c1c1c,
    VISIBLE: 0xffffff,
    HIDDEN:  0x000000,
    MONSTER: 0xf20707
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

const MOVE_DURATION = 500

export {
    DEV,
    DIRECTIONS,
    GAME_STATE,
    MONSTER_STATE,
    MOVE_DURATION,
    ROT_SEED,
    SEE_EVERYTHING,
    TILE_SIZE,
    TILESET,
    TINTS,
    ZOOM_GAME,
    ZOOM_UI
}