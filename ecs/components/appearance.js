import { Component } from "geotic"
import { colors } from "../../lib/graphics.js"

export default class Appearance extends Component {

    static properties = {
      background: colors.defaultBGColor,
      color: colors.defaultColor,
      tile: 0
    }

  }