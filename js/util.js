export function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}