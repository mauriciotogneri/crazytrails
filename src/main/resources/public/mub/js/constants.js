const DEBUG_ENABLED = false

const DIRECTION_OTHER = -1
const DIRECTION_NONE  = 0
const DIRECTION_LEFT  = 1
const DIRECTION_RIGHT = 2
const DIRECTION_UP    = 3
const DIRECTION_DOWN  = 4

const CHARACTER_SIZE = 25
const BULLET_SIZE    = 1

const BULLET_SPEED = 20

const FPS = 60

const DISTANCE_RATE = (60/FPS) * 0.2

const API_OPERATION = {
    newPosition: 1,
    newBullet: 2
}

const TEXTURE = {
    brick: 'resources/wall1.jpg',
    concrete: 'resources/floor1.jpg',
    ball: 'resources/ball.jpg'
}

const BINARY_TYPE = {
    bool: {
        code: 1,
        size: 1
    },
    byte: {
        code: 2,
        size: 1
    },
    ubyte: {
        code: 3,
        size: 1
    },
    short: {
        code: 4,
        size: 2
    },
    ushort: {
        code: 5,
        size: 2
    },
    int: {
        code: 6,
        size: 4
    },
    uint: {
        code: 7,
        size: 4
    },
    float: {
        code: 8,
        size: 4
    },
    double: {
        code: 9,
        size: 8
    }
}