namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function _5wire () {
    for (let value of WireList) {
        if (value == 2) {
            bluecount += 1
        } else if (value == 0) {
            redcount += 1
        } else if (value == 3) {
            yellowCount += 1
        } else if (value == 4) {
            blackcount += 1
        }
    }
    if (WireList[4] == 4 && SerialNumber % 2 == 1) {
        game.splash("cut the fourth wire")
    } else if (redcount == 1 && yellowCount == 1) {
        game.splash("cut the first wire")
    } else if (blackcount == 0) {
        game.splash("cut the second wire")
    } else {
        game.splash("cut the first wire")
    }
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        _3wire()
    } else if (wireCount == 4) {
        _4wire()
    } else if (wireCount == 5) {
        _5wire()
    } else if (wireCount == 6) {
        _6wires()
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function _6wires () {
    for (let value of WireList) {
        if (value == 2) {
            bluecount += 1
        } else if (value == 0) {
            redcount += 1
        } else if (value == 3) {
            yellowCount += 1
        } else if (value == 4) {
            blackcount += 1
        } else if (value == 1) {
            whitecount += 1
        }
    }
    if (yellowCount == 0 && SerialNumber % 2 == 1) {
        game.splash("cut the third wire")
    } else if (yellowCount == 1 && whitecount > 1) {
        game.splash("cut the fourth wire")
    } else if (redcount == 0) {
        game.splash("cut the last wire")
    } else {
        game.splash("cut the fourth wire")
    }
}
function _4wire () {
    for (let value of WireList) {
        if (value == 2) {
            bluecount += 1
        } else if (value == 0) {
            redcount += 1
        } else if (value == 3) {
            yellowCount += 1
        }
    }
    if (redcount == 1 && SerialNumber % 2 == 1) {
        game.splash("cut the last red wire")
    } else if (WireList[3] == 3 && redcount == 0) {
        game.splash("cut the first wire")
    } else if (bluecount == 1) {
        game.splash("cut the first wire")
    } else if (yellowCount > 1) {
        game.splash("cut the last wire")
    } else {
        game.splash("cut the second wire")
    }
}
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function _3wire () {
    bluecount = 0
    redcount = 0
    for (let value of WireList) {
        if (value == 2) {
            bluecount += 1
        } else if (value == 0) {
            redcount += 1
        }
    }
    if (redcount == 0) {
        game.splash("Cut the second wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut the last wire")
    } else if (bluecount > 1) {
        game.splash("cut the last blue wire")
    } else {
        game.splash("cut the last wire")
    }
}
let whitecount = 0
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let SerialNumber = 0
let blackcount = 0
let yellowCount = 0
let redcount = 0
let bluecount = 0
let WireList: number[] = []
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
