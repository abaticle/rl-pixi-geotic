import { engine } from '../ecs.js'
import { TILESET } from '../../../config.js'

const Being = {
    name: "Being",
    components: [{ 
        type: "Appearance"
    }, {
        type: "MapPosition"
    }, {
        type: "Description"
    }, {
        type: "Body"
    }]
}

const Monster = {
    name:  "Monster",
    inherit: ["Being"],
    components: [{
        type: "Appearance",
        properties: {
            tileIndex: TILESET.MONSTER
        }
    }, {
        type: "Body",
        properties: {
            currentHealth: 8,
            maxHealth: 8,
            attack: 2,
            defense: 0
        }
    }, {
        type: "Brain"
    }, {
        type: "Description",
        properties: {
            name: "Monster"
        }
    }]
}

const Player = {
    name:  "Player",
    inherit: ["Being"],
    components: [{
        type: "Appearance",
        properties: {
            tileIndex: TILESET.PLAYER
        }
    }, {
        type: "Owned"
    }, {
        type: "Body",
        properties: {
            currentHealth: 10,
            maxHealth: 10,
            attack: 1,
            defense: 1
        }
    }, {
        type: "Description",
        properties: {
            name: "Player"
        }
    }]
}


export {
    Being,
    Monster,
    Player
}