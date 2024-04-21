import Bird from "./bird.js"
import Pipes from "./pipe.js"
import { isCollision } from "./util.js"

document.addEventListener("keypress", handelStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

const HOLE_HEIGHT = 200
const PIPE_WIDTH = 120
const PIPE_INTERVAL = 1500 // Milliseconds
const PIPE_SPEED = 0.75
const BIRD_SPEED = 0.5
const JUMP_DURATION = 125

const pipes = new Pipes(HOLE_HEIGHT, PIPE_WIDTH, PIPE_INTERVAL, PIPE_SPEED)
const bird = new Bird(BIRD_SPEED, JUMP_DURATION)

let lastTime = null

function updateLoop(time) {
    // Skip first loop
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime

    bird.update(delta)
    pipes.update(delta)
    if (isLose()) return handelLose()

    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function isLose() {
    const birdRect = bird.getRect()
    const insidePipe = pipes.getPipeRects().some(rect => isCollision(birdRect, rect))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function handelStart() {
    title.classList.add("hide")
    bird.reset()
    pipes.reset()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

function handelLose() {
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${pipes.passedPipeCount} Pipes`
        document.addEventListener("keypress", handelStart, { once: true })
    }, 100)
}