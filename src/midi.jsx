class MIDI {
  /**
   * Halt all sound playing on the device
   */
  static sendAllSoundOff (device) {
    for (let ch = 0; ch < 16; ch++) {
      device.send([0xb0 + ch, 120, 0], 10)
    }
  }

  static sendProgramChange (device, ch, pg) {
    device.send([0xc0 + ch, pg, 0])
  }
}

export default MIDI
