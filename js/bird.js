
export default class Bird {
    constructor(speed, jump_duration) {
        this.birdElem = document.getElementById("bird")
        this.speed = speed
        this.jump_duration = jump_duration
        this.timeSinceLastFly = Number.POSITIVE_INFINITY
    }

    reset() {
        this.top = window.innerHeight / 2
        document.removeEventListener("keydown", this.handelFly)
        document.addEventListener("keydown", this.handelFly)
    }

    update(delta) {
        if (this.timeSinceLastFly < this.jump_duration) {
            this.top = this.top - this.speed * delta // Bird up
        } else {
            this.top = this.top + this.speed * delta // Bird down
        }
    
        this.timeSinceLastFly += delta
    }

    get top() {
        return parseFloat(getComputedStyle(this.birdElem).getPropertyValue("--bird-top"))
    }

    set top(value) {
        this.birdElem.style.setProperty("--bird-top", value)
    }

    handelFly = (e) => {
        if (e.code !== "Space") return

        this.timeSinceLastFly = 0
    }

    getRect() {
        return this.birdElem.getBoundingClientRect()
    }
}
