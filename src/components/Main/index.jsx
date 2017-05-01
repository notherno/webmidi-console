import React from 'react'
import PropTypes from 'proptypes'

class Main extends React.Component {
  constructor (props) {
    super(props)

    this.handleMidiInChange = this.handleMidiInChange.bind(this)
    this.handleMidiOutChange = this.handleMidiOutChange.bind(this)
    this.handleMidiMessage = this.handleMidiMessage.bind(this)

    this.state = {
      inputs: Array.from(this.props.midiAccess.inputs.values()),
      outputs: Array.from(this.props.midiAccess.outputs.values()),
      inputDevice: null,
      outputDevice: null
    }
  }

  handleMidiInChange (ev) {
    const nextMidiInput = this.state.inputs[ev.target.value]

    if (this.state.inputDevice) {
      this.state.inputDevice.onmidimessage = null
    }

    nextMidiInput.onmidimessage = this.handleMidiMessage

    this.setState({inputDevice: nextMidiInput})
    console.log(nextMidiInput)
  }

  handleMidiOutChange (ev) {
    const nextMidiOutput = this.state.outputs[ev.target.value]

    this.setState({outputDevice: nextMidiOutput})
    console.log(nextMidiOutput)
  }

  handleMidiMessage (ev) {
    if (!this.state.inputDevice || !this.state.outputDevice) {
      return
    }

    this.state.outputDevice.send(event.data)
  }

  render () {
    return <div>
      <div>
        <label>Input</label>
        <select onChange={this.handleMidiInChange}>
          {this.state.inputs.map((input, index) => <option key={index} value={index}>{input.name}</option>)}
        </select>
      </div>
      <div>
        <label>Output</label>
        <select onChange={this.handleMidiOutChange}>
          {this.state.outputs.map((output, index) => <option key={index} value={index}>{output.name}</option>)}
        </select>
      </div>
    </div>
  }
}

Main.propTypes = {
  midiAccess: PropTypes.object.isRequired
}

export default Main
