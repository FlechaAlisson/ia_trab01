let generator = null
let done = false
const interval = 500
let intervalCode = null
let endHandlers = []

export function setGenerator(arg) {
    generator = arg
    done = false
    endHandlers.length = 0
}

function handleEnd() {
    done = true
    while (endHandlers.length) {
        const handler = endHandlers.splice(0, 1)[0]
        handler()
    }
    stop()
}

export function next() {
    let res = generator.next()
    if (res.done && !done) {
        handleEnd()
    }
}

export function play() {
    intervalCode = setInterval(function() {
        next()
        if (done) {
            stop()
        }
    }, interval)
}

export function stop() {
    if (intervalCode != null) {
        clearInterval(intervalCode)
        intervalCode = null
    }
}

export function end() {
    return done
}

export function finish() {
    if (!done) {
        let res = [...generator]
        handleEnd()
    }
}

export function addEndHandler(handler) {
    endHandlers.push(handler)
}