import React from 'react'
import PropTypes from 'proptypes'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

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

  handleMidiInChange (ev, key, value) {
    if (this.state.inputDevice) {
      this.state.inputDevice.onmidimessage = null
    }

    value.onmidimessage = this.handleMidiMessage

    this.setState({inputDevice: value})
  }

  handleMidiOutChange (ev, key, value) {
    this.setState({outputDevice: value})
  }

  handleMidiMessage (ev) {
    if (!this.state.inputDevice || !this.state.outputDevice) {
      return
    }

    this.state.outputDevice.send(event.data)
  }

  render () {
    return (<div>
      <h1>Select MIDI devices</h1>
      <SelectField floatingLabelText='Input' value={this.state.inputDevice} onChange={this.handleMidiInChange}>
        {this.state.inputs.map((input, index) => <MenuItem key={input.id} value={input} primaryText={input.name}/>)}
      </SelectField>
      <SelectField floatingLabelText='Output' value={this.state.outputDevice} onChange={this.handleMidiOutChange}>
        {this.state.outputs.map((output, index) => <MenuItem key={output.id} value={output} primaryText={output.name}/>)}
      </SelectField>
    </div>)
  }
}

Main.propTypes = {
  midiAccess: PropTypes.object.isRequired
}

export default Main
