import { Sprite } from "pixi.js"
export { }


/** 
 * @namespace Structure
 */

/**
 * @typedef {Object} Structure.Position 
 * @property {Number} x Position X 
 * @property {Number} y Position Y 
 */

/**
 * @typedef {Object} Structure.Tile
 * @property {Number} x Position X 
 * @property {Number} y Position Y 
 * @property {Number} x Tile index in tileset
 * @property {Sprite} sprite Tile sprite
* @property {String} tileType Tile type
 * @property {boolean} visited Tile already visited ?
 */

/**
 * @typedef {Object} Structure.Room
 * @param {Number} _x1 Top left x
 * @param {Number} _y1 Top left y
 * @param {Number} _x2 Bottom right x
 * @param {Number} _y2 Bottom right y
 * @param {String[]} _doors Doors as 'x-y' string
 */


/** 
 * @namespace Component
 */

/** 
 * @typedef {Object} Component.Action
 * @property {String} type Action type
 * @property {Number} targetX Target x position
 * @property {Number} targetY Target y position
 */

/** 
 * @typedef {Object} Component.Appearance
 * @property {Number} tileIndex Tile index in tileset
 * @property {Sprite} sprite Sprite
 */

/** 
 * @typedef {Object} Component.Brain
 * @property {boolean} active Brain is active ?
 * @property {String} state Brain state
 */

/** 
 * @typedef {Object} Component.Camera
 * @property {Number} x Position X 
 * @property {Number} y Position Y 
 * @property {Number} zoom Camera zoom (used for container scale)
 */


/** 
 * @typedef {Object} Component.Game
 * @property {Number} turn Current turn number
 * @property {String} state Game state
 * @property {Number} speed Game speed
 */

/** 
 * @typedef {Object} Component.Health
 * @property {Number} max Maxium health
 * @property {Number} current Current health
 */

/** 
 * @typedef {Object} Component.Input
 * @property {String} keyPressed Maxium health
 * @property {Number} mouseX Mouse x
 * @property {Number} mouseY Mouse y
 * @property {boolean} mouseDown Mouse button is down
 * @property {boolean} mouseUp Mouse button is up
 */

/** 
 * @typedef {Object} Component.Owned
 */

/** 
 * @typedef {Object} Component.Selected
 */

/** 
 * @typedef {Object} Component.MapPosition
 * @property {Number} x Position X 
 * @property {Number} y Position Y
 * @property {Number} px Previous position X
 * @property {Number} py Previous position Y
 * @property {(direction:String) => void} moveDirection Move to target direction
 * @property {(x: number, y: number) => void} moveRelative Move to target relative direction
 * @property {(x: number, y: number) => void} moveAbsolute Move to target absolute direction
 */

/**
 * @typedef {Object} Component.Map
 * @property {Number} width Map width
 * @property {Number} height Map height
 * @property {Structure.Tile[]} tiles Map tiles
 * @property {Structure.Room[]} rooms Map rooms
 * @property {(x: number, y: number) => boolean} isWalkable Check tile is walkable
 * @property {() => Structure.Tile[]} getAllTiles Get all map tiles in a single array
 * @property {(empty: boolean?) => Structure.Position[]} getRandomPositionInRoom Get a random position in room
 * @property {(x: number, y: number) => Structure.Tile} getTileAt Get tile at position
 * @property {(x: number, y: number) => boolean} isInBound Check position is in map bounds
 * @property {(xFrom: number|Structure.Position, yFrom: number|Structure.Position, xTo?: number, yTo?: Number) => Structure.Tile[]} getPath Get path using 2 positions or 4 coords
 * @property {(tileX: number, tileY: number, range?: number) => Structure.Tile[]} getVisibleTiles Get visible tiles from a position within a given range
 */

/**
 * @typedef {Object} Component.Move
 * @property {Number} x Target X 
 * @property {Number} y Target Y
 */

/** 
 * @namespace Entity
 */

/** 
 * @typedef {Object} Entity.Player
 * @property {Component.MapPosition} mapPosition
 * @property {Component.Appearance} appearance
 * @property {Component.Owned} owned
 * @property {Component.Selected} selected
 * @property {Component.Health} health
 */

/** 
 * @typedef {Object} Entity.Monster
 * @property {Component.MapPosition} mapPosition
 * @property {Component.Appearance} appearance
 * @property {Component.Owned} owned
 * @property {Component.Selected} selected
 * @property {Component.Health} health
 */

/**
 * @typedef {Object} Entity.Movable
 * @property {Component.Move} move
 */

/** 
 * @typedef {Object} Entity.Map
 * @property {Component.Map} map Map component
 */

/** 
 * @typedef {Object} Entity.Owned
 * @property {Component.Owned} owened Owned component
 */

/** 
 * @typedef {Object} Entity.Camera
 * @property {Component.Camera} camera Camera component
 */

/** 
 * @typedef {Object} Entity.Drawable
 * Drawable entity
 * @property {Component.MapPosition} mapPosition
 * @property {Component.Appearance} appearance
 */


/** 
 * @typedef {Object} Entity.Game
 * @property {Component.Game} game Game component
 */