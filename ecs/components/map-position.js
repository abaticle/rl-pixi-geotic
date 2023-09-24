import { Component } from 'geotic';
import { DIRECTIONS } from '../../config';

export default class MapPosition extends Component {
    // px, py = previous x, previous y
    static properties = { 
        x: 0, 
        y: 0, 
        px: null, 
        py: null 
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

    moveTo(x, y) {
        this.px = this.x 
        this.py = this.y 
        this.x = x
        this.y = y
    }
}
