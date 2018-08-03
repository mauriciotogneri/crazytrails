const DEBUG_ENABLED = false

const DIRECTION_OTHER    = -1
const DIRECTION_STRAIGHT = 0
const DIRECTION_LEFT     = 1
const DIRECTION_RIGHT    = 2

const MAP_SIZE  = 800
const HEAD_SIZE = 8

const CORRECTION_SIZE = 60

const FPS = 30

const DISTANCE_RATE = (60/FPS) * 120
const ROTATION_RATE = (60/FPS) * 160

const RESPAWN_TIME = 2000

const TYPE = {
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

const COLOR = {
    blue: '#00A1CA',
    red: '#E93844',
    green: '#1DE178',
    yello: '#CED943'
}