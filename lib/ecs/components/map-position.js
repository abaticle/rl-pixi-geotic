import { Component } from 'geotic'
import { DIRECTIONS } from '/config.js'
import { addCacheSet, deleteCacheSet } from '../cache.js'

export default class MapPosition extends Component {
    // px, py = previous x, previous y
    static properties = {
        x: 0,
        y: 0,
        px: null,
        py: null,
    }

    onAttached() {
        //addCacheSet("entitiesAtLocation", `${this.x},${this.y}`, this.entity.id)
    }

    onDettached() {
        deleteCacheSet(
            'entitiesAtLocation',
            `${this.px},${this.py}`,
            this.entity.id,
        )
    }

    updateCache() {
        deleteCacheSet(
            'entitiesAtLocation',
            `${this.px},${this.py}`,
            this.entity.id,
        )
        addCacheSet('entitiesAtLocation', `${this.x},${this.y}`, this.entity.id)
    }

    /**
     *
     * @param {DIRECTIONS} direction
     */
    moveDirection(direction) {
        this.py = this.y
        this.px = this.x

        switch (direction) {
            case DIRECTIONS.BOTTOM:
                this.y += 1
                break

            case DIRECTIONS.TOP:
                this.y -= 1
                break

            case DIRECTIONS.RIGHT:
                this.x += 1
                break

            case DIRECTIONS.LEFT:
                this.x -= 1
                break
        }
    }

    moveRelative(x, y) {
        this.px = this.x
        this.py = this.y
        this.x = this.x + x
        this.y = this.y + y
        this.updateCache()
    }

    moveAbsolute(x, y) {
        this.px = this.x
        this.py = this.y
        this.x = x
        this.y = y
        this.updateCache()
    }
}
