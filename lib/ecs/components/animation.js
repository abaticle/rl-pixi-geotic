import { Component } from "geotic"
import { easeOutQuart } from "js-easing-functions"
import { hexToRgb, rgbToHex } from "../../utils/utils.js"

export default class Animation extends Component {
  static properties = {
    type: "",
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    fromColor: 0,
    toColor: 0,
    duration: 0,
    elapsed: 0,
    started: 0,
    delay: 0,
    targetSprite: undefined,
  }

  getNextColor(delta) {
    this.elapsed += delta

    if (this.elapsed < this.delay) {
      return this.fromColor
    }

    if (this.elapsed > this.duration) {
      return this.toColor
    }

    const from = hexToRgb(this.fromColor)
    const to = hexToRgb(this.toColor)

    let newColor = {
      r: easeOutQuart(this.elapsed, from.r, to.r, this.duration),
      g: easeOutQuart(this.elapsed, from.g, to.g, this.duration),
      b: easeOutQuart(this.elapsed, from.b, to.b, this.duration),
    }

    return rgbToHex(newColor)
  }

  getNextPosition(delta) {
    this.elapsed += delta

    if (this.elapsed > this.duration) {
      return {
        x: this.toX,
        y: this.toY
      }
    }

    let newX = easeOutQuart(
      this.elapsed,
      this.fromX,
      this.toX - this.fromX,
      this.duration
    )
    let newY = easeOutQuart(
      this.elapsed,
      this.fromY,
      this.toY - this.fromY,
      this.duration
    )

    return {
      x: newX,
      y: newY,
    }
  }
}
