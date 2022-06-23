input.onButtonPressed(Button.A, function () {
    basic.showNumber(heart * 20)
    basic.pause(2000)
    basic.clearScreen()
})
input.onGesture(Gesture.TiltLeft, function () {
    manual_T_control += -1
})
input.onButtonPressed(Button.AB, function () {
    Emergency = false
    radio.sendString("FALSE ALARM")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    Emergency = true
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(current_temperature)
    basic.pause(2000)
    basic.clearScreen()
})
input.onGesture(Gesture.Shake, function () {
    heart += 1
})
input.onGesture(Gesture.TiltRight, function () {
    manual_T_control += 1
})
let current_temperature = 0
let Emergency = false
let heart = 0
heart = 0
let start_temperature = input.temperature()
let manual_T_control = 0
basic.forever(function () {
    radio.setGroup(9)
    Emergency = false
})
basic.forever(function () {
    if (heart >= 12) {
        radio.sendString("HIGH BPM")
        basic.showString("HIGH BPM")
        Emergency = true
    }
})
basic.forever(function () {
    if (Emergency == true) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
basic.forever(function () {
    current_temperature = input.temperature() + manual_T_control
    if (start_temperature - current_temperature > 10 || current_temperature > 39.5) {
        while (start_temperature - current_temperature > 10 || current_temperature > 39.5) {
            radio.sendString("RAPID INCREASE IN TEMPERATURE")
            music.playTone(523, music.beat(BeatFraction.Breve))
            basic.showString("RAPID INCREASE IN TEMPERATURE")
            basic.pause(10000)
            Emergency = true
            radio.sendString("HEAT STROKE WARNING")
            basic.showString("HEAT STROKE WARNING")
            basic.pause(10000)
            radio.sendString("SEND HELP!")
            basic.showString("SEND HELP")
        }
    }
})
loops.everyInterval(5000, function () {
    heart = 0
})
