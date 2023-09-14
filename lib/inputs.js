import Move from "../ecs/components/move.js"
import { getPlayer } from "../ecs/ecs.js"

const createInputs = () => {
    document.addEventListener("keydown", onKeydown)
}

/**
 * 
 * @param {KeyboardEvent} event 
 */
const onKeydown = (event) => {

    switch (event.key) {
        case "ArrowUp":
            getPlayer().add(Move, {
                x: 0,
                y: -1
            })

        case "ArrowDown":
            getPlayer().add(Move, {
                x: 0,
                y: 1
            })

        case "ArrowLeft":
            getPlayer().add(Move, {
                x: -1,
                y: 0
            })

        case "ArrowRight":
            getPlayer().add(Move, {
                x: 1,
                y: 0
            })
    }


    //event.preventDefault()
}


export {
    createInputs
}