import { Component } from 'geotic'

export default class Appearance extends Component {
    static properties = {
        tileIndex: 0,
        sprite: undefined,
    }

    show() {
        this.sprite.visible = true
    }

    hide() {
        this.sprite.visible = false
    }

    setTint(tint) {
        this.sprite.tint = tint
    }
}
