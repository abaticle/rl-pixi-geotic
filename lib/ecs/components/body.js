import { TILESET } from '../../../config.js'
import { Component } from 'geotic'
import { getTexture } from '../../graphics/utils.js'
import { IsDead } from './_index.js'

export default class Body extends Component {

    static properties = {
        maxHealth: 10,
        currentHealth: 10,
        attack: 4,
        defense: 1
    }

    onTakeDamage(event) {
        this.currentHealth -= event.data.amount

        if (this.currentHealth <= 0) {
            this.entity.brain.active = false
            this.entity.appearance.sprite.texture = getTexture(TILESET.MONSTER_DEAD)
            this.entity.add(IsDead)
        }

        event.handle()
        console.log(event)
    }


}