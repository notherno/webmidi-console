import React from 'react'
import PropTypes from 'proptypes'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import MIDI from '../../midi'

class Main extends React.Component {
  constructor (props) {
    super(props)

    this.handleMidiInChange = this.handleMidiInChange.bind(this)
    this.handleMidiOutChange = this.handleMidiOutChange.bind(this)
    this.handleMidiMessage = this.handleMidiMessage.bind(this)
    this.handleChangeProgramSlider = this.handleChangeProgramSlider.bind(this)
    this.handleClickReset = this.handleClickReset.bind(this)

    this.state = {
      inputs: Array.from(this.props.midiAccess.inputs.values()),
      outputs: Array.from(this.props.midiAccess.outputs.values()),
      inputDevice: null,
      outputDevice: null,
      programNumber: 0
    }
  }

  handleMidiInChange (ev, key, value) {
    if (this.state.inputDevice) {
      this.state.inputDevice.onmidimessage = null
    }

    // Bind MIDI message event to MIDI device selected
    value.onmidimessage = this.handleMidiMessage

    this.setState({inputDevice: value})
  }

  handleMidiOutChange (ev, key, outputDevice) {
    // Send MIDI program change message to setup MIDI output device
    outputDevice.send([0xc0, this.state.programNumber])
    this.setState({ outputDevice })
  }

  handleMidiMessage (ev) {
    if (!this.state.inputDevice || !this.state.outputDevice) {
      return
    }

    this.state.outputDevice.send(ev.data)
  }

  handleClickReset () {
    if (!this.state.outputDevice) {
      return
    }
    MIDI.sendAllSoundOff(this.state.outputDevice)
  }

  handleChangeProgramSlider (ev, programNumber) {
    if (this.state.outputDevice) {
      // Send program change message
      this.state.outputDevice.send([0xc0, programNumber])
    }
    this.setState({ programNumbr })
  }

  render () {
    return (<div>
      <SelectField floatingLabelText='Input' value={this.state.inputDevice} onChange={this.handleMidiInChange}>
        {this.state.inputs.map((input, index) => <MenuItem key={input.id} value={input} primaryText={input.name}/>)}
      </SelectField>
      <SelectField floatingLabelText='Output' value={this.state.outputDevice} onChange={this.handleMidiOutChange}>
        {this.state.outputs.map((output, index) => <MenuItem key={output.id} value={output} primaryText={output.name}/>)}
      </SelectField>
      <RaisedButton label='Reset' onTouchTap={this.handleClickReset}/>
      <Slider value={this.state.programNumber} min={0} max={127} step={1} onChange={this.handleChangeProgramSlider}/>
      <output>{this.state.programNumber}</output>
    </div>)
  }
}

Main.propTypes = {
  midiAccess: PropTypes.object.isRequired
}

export default Main
