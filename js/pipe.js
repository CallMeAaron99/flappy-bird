import { randomNumberBetween } from "./util.js"


export default class Pipes {
    constructor(hole_height, width, interval, speed) {
        this.width = width
        this.hole_height = hole_height
        this.interval = interval
        this.speed = speed
        this.timeSinceLastPipe = 0
        this.passedPipeCount = 0
        this.pipes = []
    }

    reset() {
        this.pipes.forEach(pipe => pipe.remove()) // Clear pipes
        this.timeSinceLastPipe = this.interval // Spawn pipe immediately
        this.passedPipeCount = 0
    }

    update(delta) {
        this.timeSinceLastPipe += delta

        // Spawn pipe when time reaches interval
        if (this.timeSinceLastPipe > this.interval) {
            this.timeSinceLastPipe -= this.interval
            this.#createPipe()
        }

        // Update pipes position
        this.pipes.forEach(pipe => {
            // Remove pipes that are out of screen
            if (pipe.left + pipe.width < 0) {
                this.passedPipeCount++
                this.pipes = this.pipes.filter(p => p !== pipe)
                return pipe.remove()
            }
            pipe.left = pipe.left - delta * this.speed
        })
    }

    getPipeRects() {
        return this.pipes.flatMap(pipe => pipe.rects())
    }

    #createPipe() {
        const pipe = new Pipe(this.hole_height, this.width)
        pipe.left = window.innerWidth
        this.pipes.push(pipe)
    }
}


class Pipe {
    constructor(hole_height, width) {
        this.width = width
        this.hole_height = hole_height
        this.create()
    }

    create() {
        this.pipeElem = document.createElement("div")
        this.topElem = this.#createPipeSegment("top")
        this.bottomElem = this.#createPipeSegment("bottom")
        this.pipeElem.append(this.topElem)
        this.pipeElem.append(this.bottomElem)
        this.pipeElem.classList.add("pipe")
        this.pipeElem.style.setProperty("--pipe-width", this.width)
        this.pipeElem.style.setProperty("--hole-height", this.hole_height)
        this.pipeElem.style.setProperty(
            "--hole-top",
            randomNumberBetween(
                this.hole_height * 1.5,
                window.innerHeight - this.hole_height * 0.5
            )
        )
        document.body.append(this.pipeElem)
    }

    get left() {
        return parseFloat(getComputedStyle(this.pipeElem).getPropertyValue("--pipe-left"))
    }

    set left(value) {
        this.pipeElem.style.setProperty("--pipe-left", value)
    }

    remove() {
        this.pipeElem.remove()
    }

    rects() {
        return [
            this.topElem.getBoundingClientRect(),
            this.bottomElem.getBoundingClientRect(),
        ]
    }

    #createPipeSegment(position) {
        const segment = document.createElement("div")
        segment.classList.add("segment", position)
        return segment
    }
}
