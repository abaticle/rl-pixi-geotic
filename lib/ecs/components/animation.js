import { Component } from 'geotic'
import { easeOutQuart } from 'js-easing-functions'

export default class Animation extends Component {

  static properties = {
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    duration: 0,
    elapsed: 0,
    started: 0,
    sprite: undefined
  }

  getNextPosition(delta) {

    this.elapsed += delta

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