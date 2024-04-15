const birdElem = document.querySelector("[data-bird]")
const BIRD_SPEED = .5
const JUMP_DURATION = 125

let timeSinceLastFly = Number.POSITIVE_INFINITY

export function setupBird() {
    setTop(window.innerHeight / 2)
    document.removeEventListener("keydown", handelFly)
    document.addEventListener("keydown", handelFly)
}

export function updateBird(delta) {
    if (timeSinceLastFly < JUMP_DURATION) {
        setTop(getTop() - BIRD_SPEED * delta) // Bird up
    } else {
        setTop(getTop() + BIRD_SPEED * delta) // Bird down
    }
    
    timeSinceLastFly += delta
}

export function getBirdRect() {
    return birdElem.getBoundingClientRect()
}

function setTop(top) {
    birdElem.style.setProperty("--bird-top", top)
}

function getTop() {
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
}

function handelFly(e) {
    if (e.code !== "Space") return

    timeSinceLastFly = 0
}