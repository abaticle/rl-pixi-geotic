import { Component } from 'geotic'

export default class Input extends Component {
    static properties = { 
        keyPressed: '',
        mouseX: 0,
        mouseY: 0,
        mouseDown: false,
        mouseUp: false
    }
}