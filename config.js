const DEV = true

const SEE_EVERYTHING = false

const DEFAULT_ZOOM = 2 

const ROT_SEED = 26

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
    UI_PANEL_BOTTOM_RIGHT: 15
}

const GAME_STATE = {
    CAN_PLAY: "Can play",
    WAIT: "Wait"
}

const TILE_SIZE = 16

const DIRECTIONS = {
    LEFT: "Left",
    RIGHT: "Right",
    TOP: "Top",
    BOTTOM: "Bottom"
}

export {
    DEV,
    DEFAULT_ZOOM,
    DIRECTIONS,
    ROT_SEED,
    SEE_EVERYTHING,
    TILESET,
    GAME_STATE,
    TILE_SIZE
}