import { Component } from 'geotic'
import { easeOutQuart } from 'js-easing-functions'

const linear = t => t;
const easeOutQuad = t => t * (2-t);

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

window.easing = easeOutQuad
window.lerp = lerp

export default class Animation extends Component {

    static properties = {
      fromX: 0,
      fromY: 0,
      toX: 0,
      toY: 0,
      duration: 0,
      elapsed: 0,
      started: 0
    }

    getNextPosition(delta) {

        this.elapsed += delta

//        let newX = lerp(this.fromX, this.toX, 0.1)
//        let newY = lerp(this.fromY, this.toY, 0.1)


        let newX = easeOutQuart(this.elapsed, this.fromX, this.toX - this.fromX, this.duration)
        let newY = easeOutQuart(this.elapsed, this.fromY, this.toY - this.fromY, this.duration)

        
        if (this.elapsed > this.duration) {
          newX = this.toX
          newY = this.toY 
        }

        return {
            x: newX,
            y: newY
        }
    }

  }