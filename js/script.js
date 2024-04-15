import { setupBird, updateBird, getBirdRect } from "./bird.js"
import { getPassedPipeCount, getPipeRects, setupPipes, updatePipes } from "./pipe.js"

document.addEventListener("keypress", handelStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime = null

function updateLoop(time) {
    // Skip first loop
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime

    updateBird(delta)
    updatePipes(delta)
    if (checkLose()) return handelLose()

    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkLose() {
    const birdRect = getBirdRect()
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handelStart() {
    title.classList.add("hide")
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

function handelLose() {
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${getPassedPipeCount()} Pipes`
        document.addEventListener("keypress", handelStart, { once: true })
    }, 100)
}