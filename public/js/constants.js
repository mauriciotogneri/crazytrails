const DEBUG_ENABLED = false

const DIRECTION_OTHER    = -1
const DIRECTION_STRAIGHT = 0
const DIRECTION_LEFT     = 1
const DIRECTION_RIGHT    = 2

const MAP_SIZE  = 800
const HEAD_SIZE = 8

const FPS = 30

const DISTANCE_RATE = (60/FPS) * 120
const ROTATION_RATE = (60/FPS) * 160

const RESPAWN_TIME = 2000

const TYPE = {
    byte:   1,
    ubyte:  1,
    short:  2,
    ushort: 2,
    int:    4,
    uint:   4,
    float:  4,
    double: 8
}

const COLOR = {
    blue: '#00A1CA',
    red: '#E93844',
    green: '#1DE178',
    yello: '#CED943'
}